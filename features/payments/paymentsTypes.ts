
export type PaymentStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'REVERSED'

export type CustomerBasic = {
  id: string
  customer_code: string
  full_name: string
  phone?: string
  status?: string
}

export type CustomerAccount = {
  id: string
  customer_id: string
  account_number: string
  scheme: string
  account_name: string | null
  collection_amount: number
  frequency: string
  start_date: string
  maturity_date: string | null
  previous_paid: number
  status: string
  created_at: string
  updated_at: string
}

export type AccountListResponse = {
  success: boolean
  customer: Pick<
    CustomerBasic,
    'id' | 'customer_code' | 'full_name'
  >
  accounts: CustomerAccount[]
}

export type AccountDetailsResponse = {
  success: boolean
  customer: CustomerBasic
  account: CustomerAccount
  summary: {
    previous_paid: number
    approved_collection: number
    pending_collection: number
    total_collection: number
  }
}

export type CustomerPayment = {
  id: string
  account_id: string
  amount: number
  payment_date: string
  reference_number: string | null
  status: PaymentStatus
  receipt_number: string | null
  notes: string | null
  submitted_at: string | null
  approved_at: string | null
  rejected_at: string | null
  reversed_at: string | null
  rejection_reason: string | null
  reversal_reason: string | null
  created_at: string
  updated_at: string
}

export type AccountPaymentsResponse = {
  success: boolean
  account: Pick<
    CustomerAccount,
    'id' | 'account_number' | 'scheme' | 'account_name'
  >
  count: number
  payments: CustomerPayment[]
}

export type PaymentAccountDetails = Pick<
  CustomerAccount,
  | 'id'
  | 'account_number'
  | 'scheme'
  | 'account_name'
  | 'collection_amount'
  | 'frequency'
  | 'start_date'
  | 'maturity_date'
  | 'status'
>

export type PaymentDetailsResponse = {
  success: boolean
  customer: CustomerBasic
  account: PaymentAccountDetails
  payment: Omit<CustomerPayment, 'account_id'>
}

export type CustomerDashboardResponse = {
  success: boolean
  customer: CustomerBasic & {
    alternate_phone: string | null
    created_at: string
  }
  summary: {
    total_accounts: number
    approved_collection: number
    pending_collection: number
    rejected_collection: number
    reversed_collection: number
    total_collection: number
  }
  accounts: Array<
    Omit<
      CustomerAccount,
      'customer_id' | 'created_at' | 'updated_at'
    > & {
      summary: {
        approved_collection: number
        pending_collection: number
        rejected_collection: number
        reversed_collection: number
        total_collection: number
      }
    }
  >
}
