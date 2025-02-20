import { Job } from "../models/job.model.js";
export const postJob=async(req,res)=>{
    try{
        const{title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        const userId=req.id;
        if(!title ||!description ||!requirements ||!salary||!location||!jobType||!experience||!position||!companyId){
            return res.status(400).json({
                message:"something is missing"
            })
        }
        const job=await Job.create({
            title,
            description,
            requirements,
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId
        });
        return res.status(200).json({
            message:"new job created successfully",
            success:true,
            job
        })

    }catch(err){
        console.log(err)
    }
}
export const getAllJobs=async(req,res)=>{
    try{
        const keyword=req.query.keyword ||"";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        };
        const jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(400).json({
                message:"job not found"
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    }catch(err){
        console.log(err);
    }
}
export const getJobById=async(req,res)=>{
    const jobId=req.params.id;
    const job=await Job.findById(jobId).populate({
        path:"application"
    });
    if(!job){
        return res.status(400).json({
            message:"Jobs not found"
        })
    }
    return res.status(200).json({
        job,
        success:true
    })
}
export const getAdminJobs=async(req,res)=>{
    try{
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId}).populate({
            path:'company'
        });
        if(!jobs){
            return res.status(400).json({
                message:"Jobs not found"
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })

    }catch(err){

    }
}
