const catchAsyncErrors = require("../utils/catchAsyncErrors");
const nodemailer = require("nodemailer");
const User = require("../Models/user")
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "pkr",
        metadata:{
            company: "Tourism"
        }
    });

    res.status(200).json({
        success:true,
        client_secret: myPayment.client_secret
    });

});

exports.sendStripeApiKey = catchAsyncErrors(async(req,res,next)=>{
   
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });

});

exports.sendBookingMail = async(req, res) => {
    // console.log(req.body);
    const {email} = req.body.contactInfo 
        const mailOptions = {
          from: "mzk112000@gmail.com",
          to: email,
          subject: "Booking Successfull",
          text: `
          Hi ${req.body.contactInfo.firstName},
          This is the confirmation mail of the reservation of the ${req.body.name} in ${req.body.city}.
          Your booking is confirmed!!. I want to make clear that if you want any kind of change in the reservation then please inform within 24 hours of this confirmation letter after which any request won’t be entertained. Rest we assure you that you won’t face any problems with the proposed trip.`
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(401).json({ status: 401, message: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res
              .status(201)
              .json({ status: 201, message: "Email sent Succsfully" });
          }
        });
  };