import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js"
export const register=async(req,res)=>{
    try{
        const{fullname,role,email,phoneNumber,password}=req.body
        if(!fullname ||!email ||!phoneNumber ||!role ||!password){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        }
        let cloudResponse=null;
        if(req.file){
            const file=req.file;
        const fileUri=getDataUri(file);
         cloudResponse=await cloudinary.uploader.upload(fileUri.content,{
            resource_type:"raw"
        });
        }
        const user=await User.findOne({
            email
        })
        if(user){
            return res.status(400).json({
                message:'user already exist',
                success:false
            })
        }
        const hashedPassword=await bcrypt.hash(password,10)
        await User.create({
            fullname,
            password:hashedPassword,
            role,
            email,
            phoneNumber,
            
        })
        if (cloudResponse && cloudResponse.secure_url) {
            userData.profile = {
              profilePhoto: cloudResponse.secure_url,
            };
          }
        return res.status(200).json({
            message:"account created successfully",
            success:true
        })
    }
    catch(err){
        console.log(err)
    }
}
export const login=async(req,res)=>{
    try{
        const{email,password,role}=req.body;
        if(!email ||!password||!role){
            return res.status(400).json({
                message:"Something is wrong",
                success:false
            })
        }
        let user= await User.findOne({
            email
        })
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        const isPasswordmatch=await bcrypt.compare(password,user.password)
        if(!isPasswordmatch){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        if(role!=user.role){
            return res.status(400).json({
                message:"Account doesn't exist with current role",
                success:false
            })
        }
        const tokenData={
            userId:user._id
        }
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY)
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
            message:`welcome back ${user.fullname}`,
            user,
            success:true
        })

    }
    catch(err){
        console.log(err)

    }
}
export const logout=async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logout successfully",
            success:true
        })
    }
    catch(err){
        console.log(err)
    }
}
export const updateProfile=async(req,res)=>{
    try{
        const{fullname,email,phoneNumber,bio,skills}=req.body
        const file=req.file
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
        let skillsArray;
        if(skills){
             skillsArray=skills.split(",");
        }
        const userId=req.id;
        let user=await User.findById(userId)
        if(!user){
            return res.status(400).json({
                message:"user not found"
            })
        }
        if(fullname) user.fullname=fullname
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(email) user.email=email
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillsArray
        if(cloudResponse){
            user.profile.resume=cloudResponse.secure_url
            user.profile.resumeOriginalName=file.originalname
        }
       await user.save();
       user={
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }
    return res.status(200).json({
        message:"profile updated successfully",
        success:true,
        user
    })
    }
    catch(err){
      console.log(err)
    }
}
