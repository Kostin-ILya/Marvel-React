import { useState, useCallback } from 'react'

const useHTTP = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const request = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-Type': 'application/json' }
    ) => {
      setIsLoading(true)
      setIsError(false)

      try {
        const response = await fetch(url, { method, body, headers })
        if (!response.ok) {
          throw new Error(`?Could not fetch ${url}, status: ${response.status}`)
        }

        const result = await response.json()
        return result
      } catch (error) {
        setIsError(true)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  )

  return { isLoading, isError, request }
}

export default useHTTP
