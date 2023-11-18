export interface PaymentReport{
  id:string,
  accountNo:string,
  amount:number,
  email:string,
  fullName:string,
  phone:string,
  reportedOn:Date,
  selectedBank:string,
  userId:string
}
