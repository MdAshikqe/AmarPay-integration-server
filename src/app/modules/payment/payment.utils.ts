import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

export const initiatePayment =async(paymentData:any)=>{
try {
  const response= await axios.post(process.env.PAYMENT_URL!,{
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    tran_id: paymentData.transactionId,
    success_url:`http://localhost:3000/api/v1/payment/confirmaton?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `http://localhost:3000/api/v1/payment/confirmaton?status=failed`,
    cancel_url: "http://localhost:5173",
    amount: paymentData.totalPrice,
    currency: "BDT",
    desc: paymentData.customerName,
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "N/A",
    cus_phone: paymentData.customerPhone,
    type: "json"
          })
      return response.data
} catch (error) {
  throw new Error("Payment initiation failed")
}
}


export const paymentVerify=async(tnxID:any)=>{
 try {
  const response= await axios.get(process.env.PAYMENT_VERYFIED_URL!,{
    params:{
      store_id: process.env.STORE_ID,
     signature_key: process.env.SIGNATURE_KEY,
     type: "json",
     request_id:tnxID
    }

  }
)
return response.data;
 } catch (error) {
  throw new Error("Payment verify failed")
 }
}