import { useState, useEffect } from "react"

const useFetch = (url = "", options = null) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    fetch(url, options)
      .then(result => result.json())
      .then(data => {
        if (isMounted) {
          setData(data)
          setError(null)
        }
      })
      .catch(error => {
        if (isMounted) {
          setError(error)
          setData(null)
        }
      })
      .finally(() => isMounted && setIsLoading(false))
    return () => (isMounted = false)

  }, [url, options])

  return { isLoading, error, data }
}

export default useFetch
