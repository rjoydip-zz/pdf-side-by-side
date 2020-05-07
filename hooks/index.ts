import { useEffect } from 'react'

export const useEffectWrapper = (fn: any) => useEffect(fn(), [])