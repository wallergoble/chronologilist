import { useState } from 'react'

export function useForceUpdate() {
  let [value, set] = useState(true)
  return () => set(!value)
}
