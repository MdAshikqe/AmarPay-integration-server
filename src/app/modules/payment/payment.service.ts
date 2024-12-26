import orderModel from "../order/order.model"
import { paymentVerify } from "./payment.utils";

const confirmationServices= async(transactionId:string,status:string)=>{
    const veryfyResponse= await paymentVerify(transactionId)
 
    let result;
    if(veryfyResponse && veryfyResponse.pay_status === "Successful"){
        result= await orderModel.findOneAndUpdate({transactionId},{
            status:'Paid',
            paymentStatus:'Paid'
        })
    }


    return `
     <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      <title>Payment ${status === "success" ? "Success" : "Failed"} </title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          background: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
        }
        h1 {
          color: #4caf50;
        }
        p {
          color: #333;
        }
        .details {
          margin: 10px 0;
          text-align: left;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #4caf50;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
        .button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Payment ${status}</h1>
        <p> ${
            status === "success"
              ? "Thank you for your payment!"
              : "Your payment failed. Please try again."
          }</p>
          ${
            status === "success"
            ?` <div class="details">
          <p><strong>Customer Name:</strong>${veryfyResponse?.cus_name}</p>
          <p><strong>Customer Number:</strong>${veryfyResponse?.cus_phone}</p>
          <p><strong>Customer Address:</strong>${veryfyResponse?.cus_add1}</p>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
          <p><strong>Amount Paid:</strong>${veryfyResponse?.amount_currency}</p>
        </div>
            `:""
          }
        <a href="http://localhost:5173" class="button">Go Back to Home</a>
      </div>
    </body>
    </html>
    `;



}


export const paymentServices={
    confirmationServices,
}