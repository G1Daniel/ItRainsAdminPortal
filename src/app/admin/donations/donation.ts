export interface Donation{
  id: string,
  donationTypeId: string,
  description: string,
  isInKg: Boolean,
  quantity: number,
  condition: string,
  deliveryTypeId: string,
  availableDate: Date,
  address: string,
  remark: string,
  status: number,
  isAvailable: Boolean,
  postedOn: Date,
  userId: string,
  donationNo: string
}
