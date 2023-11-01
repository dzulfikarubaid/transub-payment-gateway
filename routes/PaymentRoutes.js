import express from 'express';
import midtransClient from "midtrans-client"


const router = express.Router();

router.post('/process-transaction', (req, res) => {
    try{
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: "SB-Mid-server-VwwsTftArA2w6UPxLZcC8rbf",
            clientKey: "SB-Mid-client-Qkw3jqs283jROxRW"
        })
        const parameter = {
            transaction_details: {
                order_id: req.body.order_id,
                gross_amount: req.body.total
            },
            customer_details: {
                email: req.body.email
            },
            finish_redirect_url: redirectUrl,
           
        }
        snap.createTransaction(parameter)
        .then((transaction)=>{
            const dataPayment = {
                response: JSON.stringify(transaction),
            }
            const token = transaction.token
            res.status(200).json({
                message: "Success", dataPayment, token: token
            })
          
        })

    

    }
    catch (error){
        res.status(500).json({
            message: error.message
        })
    }
})


export default router