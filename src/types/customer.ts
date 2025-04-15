export interface Customer {
  customerid: number
  custfirstname: string
  custlastname: string
  custaddress: string
  custcity: string
  custprov: string
  custpostal: string
  custcountry?: string
  custhomephone?: string
  custbusphone: string
  custemail: string
  agentId?: number
  points: number
  tier: string
  balance?: number
  photo_path?: string
  photoUrl?: string
  customer_tier_id?: number
}
