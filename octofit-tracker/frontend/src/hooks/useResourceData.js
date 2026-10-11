import { useEffect, useState } from 'react'
import { buildApiUrl, getRecords } from '../api.js'

export default function useResourceData(endpoint, fetcher) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')

      try {
        const response = await fetcher(buildApiUrl(endpoint), {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`The API request failed with status ${response.status}.`)
        }

        const payload = await response.json()
        setRecords(getRecords(payload))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Unable to load this resource.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint, fetcher])

  return { records, loading, error }
}
