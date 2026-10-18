import { describe, expect, it } from 'vitest'
import { buildPageMetadata, buildStructuredData, serializeJsonLd } from './seo'
import { OG_IMAGE, SITE_LOCALE, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from './site'
import robots from '../app/robots'
import sitemap from '../app/sitemap'

describe('buildPageMetadata', () => {
  const metadata = buildPageMetadata({ path: '/terminos', title: 'T', description: 'D' })

  it('declara el canonical de la página', () => {
    expect(metadata.alternates?.canonical).toBe('/terminos')
  })

  // Next reemplaza el openGraph del layout entero: si faltan acá, se pierden.
  it('repite las claves compartidas de Open Graph', () => {
    expect(metadata.openGraph).toMatchObject({
      url: '/terminos',
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title: 'T',
      description: 'D',
    })
  })

  it('pide la tarjeta grande en X', () => {
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' })
  })

  // La imagen del archivo opengraph-image no se hereda en los segmentos.
  it('lleva la imagen para compartir', () => {
    expect(metadata.openGraph?.images).toEqual([OG_IMAGE])
    expect(metadata.twitter?.images).toEqual([OG_IMAGE])
  })
})

describe('buildStructuredData', () => {
  const graph = buildStructuredData()['@graph']

  it('incluye el WebSite con el nombre que Google muestra sobre el resultado', () => {
    const website = graph.find((node) => node['@type'] === 'WebSite')
    expect(website).toMatchObject({ name: SITE_NAME, url: `${SITE_URL}/` })
  })

  it('no deja referencias @id colgadas', () => {
    const ids = new Set(graph.map((node) => node['@id']))
    const references = graph.flatMap((node) =>
      Object.values(node).filter(
        (value): value is { '@id': string } =>
          typeof value === 'object' && value !== null && '@id' in value
      )
    )
    expect(references.length).toBeGreaterThan(0)
    for (const reference of references) expect(ids).toContain(reference['@id'])
  })

  it('enlaza solo perfiles https ya codificados', () => {
    expect(SOCIAL_PROFILES.length).toBeGreaterThan(0)
    for (const profile of SOCIAL_PROFILES) {
      expect(profile).toMatch(/^https:\/\/[\x21-\x7e]+$/)
    }
  })
})

describe('serializeJsonLd', () => {
  it('no permite cerrar el <script> desde adentro del JSON', () => {
    const json = serializeJsonLd({ name: '</script><script>alert(1)</script>' })
    expect(json).not.toContain('<')
    expect(JSON.parse(json).name).toBe('</script><script>alert(1)</script>')
  })
})

describe('robots', () => {
  const { rules, sitemap: sitemapUrl } = robots()
  const disallowed = [rules].flat().flatMap((rule) => [rule.disallow ?? []].flat())

  it('apunta al sitemap del dominio canónico', () => {
    expect(sitemapUrl).toBe(`${SITE_URL}/sitemap.xml`)
  })

  // Bloquear CSS, JS o imágenes deja a Google viendo una página rota.
  it('no bloquea los recursos que la página necesita para renderizarse', () => {
    for (const path of disallowed) {
      expect(['/', '/_next/', '/img/']).not.toContain(path)
    }
  })
})

describe('sitemap', () => {
  it('lista solo URLs absolutas del dominio canónico, empezando por la portada', () => {
    const urls = sitemap().map((entry) => entry.url)
    expect(urls[0]).toBe(`${SITE_URL}/`)
    for (const url of urls) expect(url.startsWith(SITE_URL)).toBe(true)
  })
})
