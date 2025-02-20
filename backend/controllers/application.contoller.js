import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob=async(req,res)=>{
    try{
        const userId=req.id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job id is required"
            })
        }
        const existingApplication=await Application.findOne({
            job:jobId,
            applicant:userId
        })
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this jobs",
                success:false
            })
        }
        const job=await Job.findById(jobId);
       if(!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        })
       }
       const newApplication=await Application.create({
        job:jobId,
        applicant:userId
       })
       job.application.push(newApplication._id);
       await job.save();
       return res.status(200).json({
        message:"Job applied successfully",
        success:true
       })
    }catch(err){
        console.log(err)
    }   
}
export const getAppliedJobs=async(req,res)=>{
    try{
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}}
            }
        })
        if(!application){
            return res.status(404).json({
                message:"No application"
            })
        }
        return res.status(200).json({
            application,
            success:true
        })

    }catch(err){
        console.log(err);
    }
}
export const getApplicants=async(req,res)=>{
    try{
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"application",
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:"job not found"
            })
        }
        return res.status(200).json({
            job,
            success:true
        })

    }catch(err){
        console.log(err)
    }
}
export const updateStatus=async(req,res)=>{
    try{
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).json({
                message:"status is required"
            })
        }
        const application=await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json({
                message:"Application not found"
            })
        }
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        })
    }catch(err){
        console.log(err)
    }
}