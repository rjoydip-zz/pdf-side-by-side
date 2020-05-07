import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useEffectWrapper = (fn: any) => useEffect(fn(), [])
export const useDispatchWrapper = (fn: any, keys: any[] = []) =>
  useEffect(useDispatch()(fn), keys)

export * from './useDarkMode'
