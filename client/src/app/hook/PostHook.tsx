import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

export default function PostHook <T,>(url: string, postData: T | null) {
  const [data, setData] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    const sendData = async () => {
      if (!postData) return
      
      setLoading(true)
      setError(null)
      try {
        const response = await axios.post(url, postData)
        console.log(response)
        if (response) {
          setData(response.data)
        } else {
          return null
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err)
        } else {
          setError(err as AxiosError)
        }
      } finally {
        setLoading(false)
      }
    }

    sendData()
  }, [url, postData])

  return { data, loading, error }
}