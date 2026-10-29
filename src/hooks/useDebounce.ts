// ---- Debounce hook ----

import { useCallback, useRef } from 'react'

export function useDebounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedFn = useCallback(
    (...args: unknown[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        fn(...args)
      }, delay)
    },
    [delay, fn]
  )

  useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return debouncedFn as T
}
