import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js"
export const registerCompany=async(req,res)=>{
    try{
    const {companyName}=req.body;
    if(!companyName){
        return res.status(400).json({
            message:"company name required"
        })
    }
    let company=await Company.findOne({
        name:companyName
    })
    if(company){
        return res.status(400).json({
            message:"You can't register same company"
        })
    }
    company=await Company.create({
        name:companyName,
        userId:req.id
    })
    return res.status(200).json({
        message:"company register successfully",
        company,
        success:true
    })
}catch(err){
        console.log(err)  
}
}
export const getCompany=async(req,res)=>{
    try{
        const userId=req.id;
        const companies=await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                message:"Companies not found"
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })

    }catch(err){
      console.log(err)
    }
}
export const getCompanyById=async(req,res)=>{
    try{
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found"
            })
        }
        return res.status(200).json({
            company,
            success:true
        })

    }catch(err){
        console.log(err)
    }
}
export const updateCompany=async(req,res)=>{
    try{
        const {name,description,website,location}=req.body;
        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
        const logo=cloudResponse.secure_url;
        const updatedata={name,description,website,location,logo}
        const company=await Company.findByIdAndUpdate(req.params.id,updatedata);
        if(!company){
            return res.status(404).json({
                message:"Company not found"
            })
        }
        return res.status(200).json({
            message:"Company information updated",
            success:true
        })

    }catch(err){
        console.log(err)
    }
}