export type CustomerLoginRequest = {
  username: string
  password: string
}

export type CustomerProfile = {
  id: string
  username: string
  full_name: string
  phone: string
  role: string
  status: string
}

export type CustomerRecord = {
  id: string
  user_id: string
  customer_code: string
  full_name: string
  phone: string
  alternate_phone?: string | null
  status: string
  created_at: string
}

export type CustomerSession = {
  access_token: string
  token_type: string
  expires_in: number
  expires_at: number
}

export type CustomerLoginResponse = {
  success: boolean
  message: string
  user: {
    id: string
    email: string
  }
  profile: CustomerProfile
  customer: CustomerRecord
  session: CustomerSession
}

export type CustomerMeResponse = {
  success: boolean
  message?: string
  profile: CustomerProfile
  customer: CustomerRecord
}