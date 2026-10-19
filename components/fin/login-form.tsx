'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(e) => {
        e.preventDefault()
        router.push('/home')
      }}
    >
      <div className="mt-8 space-y-3">
        <div className="flex h-[52px] items-center rounded-[14px] bg-white px-4">
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="Enter Username"
            className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-[#c4c4c4]"
          />
        </div>

        <div className="flex h-[52px] items-center rounded-[14px] bg-white px-4">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter Password"
            className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-[#c4c4c4]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="text-[#1fb655]"
          >
            {showPassword ? (
              <Eye className="size-[18px]" />
            ) : (
              <EyeOff className="size-[18px]" />
            )}
          </button>
        </div>
      </div>

      <p className="mt-5 text-[10px] leading-[1.6] text-sub">
        Log in securely to view your accounts, check recorded
        collections, and track your payment history anytime.
      </p>

      <div className="mt-auto pt-10">
        <button
          type="submit"
          className="flex h-[52px] w-full items-center justify-center rounded-[14px] bg-brand text-[12px] font-medium text-ink transition-transform active:scale-[0.98]"
        >
          Login Account
        </button>
      </div>
    </form>
  )
}