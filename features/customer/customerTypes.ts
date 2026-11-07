
export type CustomerDetails = {
  id: string
  user_id: string
  customer_code: string
  full_name: string
  phone: string
  alternate_phone: string | null
  aadhaar: string | null
  pan: string | null
  nominee_name: string | null
  status: string
  created_at: string
  updated_at: string | null
}

export type CustomerMeResponse = {
  success: boolean
  message?: string
  customer: CustomerDetails
}
