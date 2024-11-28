import UserModel from "../model/UserModel.js";
import { TokenEncode } from "../utilities/TokenUtility.js";
import  SendEmail  from "../utilities/EmailUtility.js";

export const Registration=async(req,res)=>{
    let reqBody=req.body;
    await UserModel.create(reqBody).then(()=>{
        res.json({status: "success", "Message": " User Registration Successful "});
    }).catch((err)=>{
        res.json({status: "fail", "Message": " User Registration Failed  " + err.toString()});
    })
}

export const Login=async(req,res)=>{
    let reqBody=req.body;
    await UserModel.findOne(reqBody).then((data)=>{
        let token=TokenEncode(data['email'],data['_id'])
        res.json({status: "success", "Message": " User Login Successful ", Token: token});
    }).catch((err)=>{
        res.json({status: "fail", "Message": " User not Registered " + err.toString()});
    })
}

export const ProfileDetails=async(req,res)=>{
    let email=req.headers.email;
    await UserModel.findOne({email:email}).then((data)=>{
        
        res.json({status: "success", "Message": " User Profile Details Read Successful ", data: data});
    }).catch((err)=>{
        res.json({status: "fail", "Message": " User not Registered " + err.toString()});
    })
}

export const ProfileUpdate=async(req,res)=>{
    let reqBody=req.body;
        await UserModel.updateOne({email:req.headers.email},reqBody).then((data)=>{
        
        res.json({status: "success", "Message": " User Profile Updated Successfully ", data: data});
    }).catch((err)=>{
        res.json({status: "fail", "Message": " Failed to update " + err.toString()});
    })
}

export const EmailVerify=async(req,res)=>{
    try {
        let email=req.params.email;
        let data=await UserModel.findOne({email: email})
        if(data==null){
            return res.json({status:"fail","Message":"User email does not exist"})
        }
        else {
            let code=Math.floor(100000+Math.random()*900000)
            let EmailTo= data['email'];
            let EmailText= "Your Code is "+ code;
            let EmailSubject= "Task Manager Verification Code"
            await SendEmail(EmailTo, EmailText, EmailSubject)
 
            await UserModel.updateOne({email: email},{otp:code})
            return res.json({status:"success",Message:"Verification successfully,check email"})
        }
    }catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
 
 }

 export const CodeVerify=async(req,res)=>{
    try {
        let email=req.params.email;
        let code=req.params.otp;
        let data=await UserModel.findOne({email: email, otp:code})
        if(data==null){
            return res.json({status:"fail","Message":"User email does not exist"})
        }
        else {
            return res.json({status:"success",Message:"Verification successfully"})
        }
    }catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
 
 }

 export const ResetPassword=async(req,res)=>{
    try {
        let email=req.headers.email;
        let reqBody= req.body;
        let data=await UserModel.updateOne({email: email},reqBody)
        if(data==null){
            return res.json({status:"fail","Message":"User email does not exist"})
        }
        else {
            return res.json({status:"success",Message:"Password Updated"})
        }
    }catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }
 
 }


