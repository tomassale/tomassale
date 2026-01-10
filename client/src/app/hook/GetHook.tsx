import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

export default function GetHook (url: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if(!url) return

      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(url)
        console.log(response)
        if(response){
          setData(response.data)
        } else {
          return null
        }
      } catch (err) {
        if(axios.isAxiosError(err)) {
          setError(err)
        } else {
          setError(err as AxiosError)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, loading, error }
}