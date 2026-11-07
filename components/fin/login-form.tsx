
'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'

import { useAppDispatch } from '@/lib/store/hooks'

import { useCustomerLoginMutation } from '@/features/auth/authApi'
import { setCredentials } from '@/features/auth/authSlice'

import { saveSession } from '@/lib/auth/sessionStorage'

// ---------------------------------------------
// Login Error Handler
// ---------------------------------------------

function getLoginErrorMessage(error: unknown): string {
  if (typeof error !== 'object' || error === null) {
    return 'Something went wrong. Please try again.'
  }

  if ('data' in error) {
    const data = error.data

    if (typeof data === 'object' && data !== null) {
      if (
        'message' in data &&
        typeof data.message === 'string' &&
        data.message.trim()
      ) {
        return data.message
      }

      if (
        'error' in data &&
        typeof data.error === 'string' &&
        data.error.trim()
      ) {
        return data.error
      }
    }

    if (
      'status' in error &&
      typeof error.status === 'number'
    ) {
      if (error.status === 401 || error.status === 403) {
        return 'Invalid username or password. Please try again.'
      }

      if (error.status === 429) {
        return 'Too many login attempts. Please try again later.'
      }

      if (error.status >= 500) {
        return 'The server is temporarily unavailable. Please try again.'
      }
    }
  }

  if ('status' in error) {
    if (error.status === 'FETCH_ERROR') {
      return 'Unable to connect to the server. Check your internet connection.'
    }

    if (error.status === 'TIMEOUT_ERROR') {
      return 'The request timed out. Please try again.'
    }

    if (error.status === 'PARSING_ERROR') {
      return 'The server returned an invalid response. Please try again.'
    }
  }

  return 'Unable to log in. Please try again.'
}

// ---------------------------------------------
// Login Form
// ---------------------------------------------

export function LoginForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const [login, { isLoading }] = useCustomerLoginMutation()

  // ---------------------------------------------
  // Handle Login
  // ---------------------------------------------

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (isLoading) return

    const normalizedUsername = username.trim()

    if (!normalizedUsername || !password) {
      setFormError('Please enter your username and password.')
      return
    }

    setFormError('')

    try {
      // STEP 1: Authenticate customer.

      const response = await login({
        username: normalizedUsername,
        password,
      }).unwrap()

      const accessToken = response.session?.access_token
      const expiresAt = response.session?.expires_at
      const expiresIn = response.session?.expires_in

      // STEP 2: Validate login response.

      if (
        response.success !== true ||
        typeof accessToken !== 'string' ||
        !accessToken.trim() ||
        !response.profile ||
        !response.customer
      ) {
        setFormError(
          'The server returned an incomplete login response. Please try again.',
        )
        return
      }

      // STEP 3: Calculate access token expiry.

      const now = Math.floor(Date.now() / 1000)

      const validExpiresAt =
        typeof expiresAt === 'number' &&
        Number.isFinite(expiresAt)
          ? expiresAt
          : typeof expiresIn === 'number' &&
              Number.isFinite(expiresIn) &&
              expiresIn > 0
            ? now + expiresIn
            : null

      if (
        validExpiresAt === null ||
        validExpiresAt <= now
      ) {
        setFormError(
          'The login session is invalid or expired. Please try again.',
        )
        return
      }

      // STEP 4: Prepare session data.

      const session = {
        accessToken,
        expiresAt: validExpiresAt,
        profile: response.profile,
        customer: response.customer,
      }

      // STEP 5: Persist session for browser refresh.

      saveSession(session)

      // STEP 6: Update Redux authentication state.

      dispatch(setCredentials(response))

      console.info('[Auth] Customer login successful')

      // STEP 7: Navigate to dashboard.

      router.replace('/home')

    } catch (error: unknown) {
      console.error('[Auth] Login failed:', error)

      setFormError(getLoginErrorMessage(error))
    }
  }

  // ---------------------------------------------
  // UI
  // ---------------------------------------------

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={handleSubmit}
    >
      <div className="mt-8 space-y-3">

        {/* Username */}

        <div
          className={[
            'flex h-[52px] items-center rounded-[14px] border',
            'bg-[var(--hs-surface)] px-4 transition',
            'focus-within:ring-2 focus-within:ring-[var(--hs-primary-light)]',
            formError
              ? 'border-[var(--hs-primary)]'
              : 'border-[var(--hs-border-light)] focus-within:border-[var(--hs-primary)]',
          ].join(' ')}
        >
          <label htmlFor="username" className="sr-only">
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Enter username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)

              if (formError) setFormError('')
            }}
            required
            disabled={isLoading}
            aria-invalid={Boolean(formError)}
            aria-describedby={
              formError ? 'login-error' : undefined
            }
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--hs-text)] outline-none placeholder:text-[var(--hs-text-muted)] disabled:opacity-60"
          />
        </div>

        {/* Password */}

        <div
          className={[
            'flex h-[52px] items-center rounded-[14px] border',
            'bg-[var(--hs-surface)] px-4 transition',
            'focus-within:ring-2 focus-within:ring-[var(--hs-primary-light)]',
            'focus-within:border-[var(--hs-primary)]',
            formError
              ? 'border-[var(--hs-primary)]'
              : 'border-[var(--hs-border-light)]',
          ].join(' ')}
        >
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)

              if (formError) setFormError('')
            }}
            required
            disabled={isLoading}
            aria-invalid={Boolean(formError)}
            aria-describedby={
              formError ? 'login-error' : undefined
            }
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--hs-text)] outline-none placeholder:text-[var(--hs-text-muted)] disabled:opacity-60"
          />

          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            disabled={isLoading}
            aria-label={
              showPassword ? 'Hide password' : 'Show password'
            }
            aria-pressed={showPassword}
            className="ml-2 flex size-9 shrink-0 items-center justify-center text-[var(--hs-primary)] disabled:opacity-50"
          >
            {showPassword ? (
              <Eye className="size-[18px]" aria-hidden="true" />
            ) : (
              <EyeOff className="size-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}

      {formError && (
        <p
          id="login-error"
          role="alert"
          aria-live="polite"
          className="mt-3 rounded-lg bg-[var(--hs-primary-light)] px-3 py-2 text-xs leading-5 text-[var(--hs-primary-dark)]"
        >
          {formError}
        </p>
      )}

      <p className="mt-5 text-[11px] leading-[1.7] text-[var(--hs-text-secondary)]">
        Log in securely to view your accounts, check recorded
        collections, and track your payment history anytime.
      </p>

      {/* Submit */}

      <div className="mt-auto pt-10">
        <button
          type="submit"
          disabled={
            isLoading ||
            !username.trim() ||
            !password
          }
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[var(--hs-primary)] text-sm font-medium text-[var(--hs-white)] transition-colors hover:bg-[var(--hs-primary-dark)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
              Logging in...
            </>
          ) : (
            'Login Account'
          )}
        </button>
      </div>
    </form>
  )
}
