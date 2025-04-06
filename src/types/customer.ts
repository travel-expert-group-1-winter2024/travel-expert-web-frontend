export interface Customer {
  customerId: number
  custFirstName: string
  custLastName: string
  custAddress: string
  custCity: string
  custProv: string
  custPostal: string
  custCountry?: string
  custHomePhone?: string
  custBusPhone: string
  custEmail: string
  points?: number
  balance?: number
  custProfilePic?: string
}
