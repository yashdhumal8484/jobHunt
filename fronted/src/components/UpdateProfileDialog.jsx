import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const[loading, setLoading]=useState(false)
  const {user}=useSelector(store=>store.auth)
  const[input,setInput]=useState({
    fullname:user?.fullname,
    email:user?.email,
    phoneNumber:user?.phoneNumber,
    bio:user?.bio,
    skills:user?.profile?.skills?.map(skill=>skill),
    file:user?.profile?.resume
  })
  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:[e.target.value]})
  }
  const dispatch=useDispatch()
  const submitHandler=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("fullname",input.fullname)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("bio",input.bio),
    formData.append("skills",input.skills)
    if(input.file){
        formData.append("file",input.file)
    }
    try{
        setLoading(true)
        const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            withCredentials:true
        })
        if(res.data.success){
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
        }
    }catch(error){
        console.log(err);
        toast.error(error.response.data.message)
    }finally{
         setLoading(false)
    }
    setOpen(false);
    console.log(input);
  }
  const fileChangeHandler=(e)=>{
    const file=e.target.files?.[0];
    setInput({...input,file})
  }
  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=> setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={input.fullname} onChange={changeEventHandler} name="name"  className="col-span-3"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" name="email" onChange={changeEventHandler} className="col-span-3" value={input.email}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                Number
              </Label>
              <Input id="number" name="number" onChange={changeEventHandler} className="col-span-3" value={input.phoneNumber}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input id="bio" name="bio" onChange={changeEventHandler} className="col-span-3" value={input.bio}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input id="skills" name="skills" className="col-span-3" onChange={changeEventHandler} value={input.skills}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input id="file" name="file" type="file" onChange={fileChangeHandler} accept="application/pdf" className="col-span-3"/>
                </div>
            </div>
            <DialogFooter>
                {
                    loading? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please wait</Button>:<Button type="submit" className="w-full my-4">Update</Button>
                }

            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
