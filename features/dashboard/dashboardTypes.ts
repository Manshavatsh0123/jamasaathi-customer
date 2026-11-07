
export type CustomerDashboardCustomer = {
  id: string
  customer_code: string
  full_name: string
  phone: string
  alternate_phone: string | null
  status: string
  created_at: string
}

export type CustomerAccountSummary = {
  id: string
  account_number: string
  scheme: string
  account_name: string | null
  collection_amount: number
  frequency: string
  start_date: string
  maturity_date: string | null
  previous_paid: number
  status: string
  summary: {
    approved_collection: number
    pending_collection: number
    rejected_collection: number
    reversed_collection: number
    total_collection: number
  }
}

export type CustomerDashboardSummary = {
  total_accounts: number
  approved_collection: number
  pending_collection: number
  rejected_collection: number
  reversed_collection: number
  total_collection: number
}

export type CustomerDashboardResponse = {
  success: boolean
  customer: CustomerDashboardCustomer
  summary: CustomerDashboardSummary
  accounts: CustomerAccountSummary[]
}
