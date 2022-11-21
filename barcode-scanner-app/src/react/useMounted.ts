import { useEffect, useRef, RefObject } from 'react'

// based on https://github.com/fabiospampinato/react-use-mounted/blob/master/src/index.ts
export const useMounted = (): RefObject<boolean> => {
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return mounted
}
