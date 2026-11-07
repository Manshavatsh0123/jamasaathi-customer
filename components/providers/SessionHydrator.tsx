
'use client'

import { useEffect } from 'react'

import { useAppDispatch } from '@/lib/store/hooks'

import {
  hydrateSession,
} from '@/features/auth/authSlice'

import {
  getStoredSession,
} from '@/lib/auth/sessionStorage'

export default function SessionHydrator() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const session = getStoredSession()

    dispatch(hydrateSession(session))
  }, [dispatch])

  return null
}
