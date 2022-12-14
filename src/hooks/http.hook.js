import { useState, useCallback } from 'react'

const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/json' }
    ) => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url, { method, body, headers })

        if (!response.ok) {
          throw new Error(`?Could not fetch ${url}, status: ${response.status}`)
        }

        const result = await response.json()

        setLoading(false)
        return result
      } catch (e) {
        setLoading(false)
        setError(e.message)

        throw e
      }
    },
    []
  )

  return { request, loading, error }
}

export default useHttp
