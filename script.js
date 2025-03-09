import express from 'express'
import nodemailer from "nodemailer";
import { urlencoded } from 'express';
import cors from "cors"
import dotenv from 'dotenv';
const server=express();

dotenv.config()
server.use(cors());
server.use(urlencoded({extended:true}));
server.use(express.json());

server.post('/sendMessage',async(req,res)=>{
    const {name,email,message}=req.body;
    console.log("req body is=>",name,email,message);
    try {
        await initiateMail(name,email,message);
        res.status(200).send({success:true, message:"Thanks for your message!!!"})

    } catch (error) {
        res.status(501).json({success:false, message:"Something went wrong."})
    }    
});


const initiateMail=async(name,mail,message)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.USER_ID,
            pass:process.env.PASSKEY
        }
    })

    const mailInfo={
        from:'mrdevrm@gmail.com',
        to:'rm90087@gmail.com',
        subject:`Hello Rohit You Have Message From, ${name}`,
        text:`Message is- ${message},
        Sender Mail ID is- ${mail}`,
    }

    try {
        const info=await transporter.sendMail(mailInfo)
        console.log(info);
        
    } catch (error) {
        console.log(error);
    }
}

server.listen(3000,()=>{
    console.log("Server is up on port 3000");
})
