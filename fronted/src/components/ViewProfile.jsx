import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Badge, Contact, Mail, Pen } from 'lucide-react'
import CustomBadge from './CustomBage'
import { Label } from '@radix-ui/react-label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAllAppliedJobs from '@/hooks/useGetAllAppliedJobs'

const ViewProfile = () => {
  useGetAllAppliedJobs();
  const[open,setOpen]=useState(false)
  const {user}=useSelector(store=>store.auth)
  const isResume=true;
  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className="flex justify-between">
        <div className='flex items-center'>
        <Button className="bg-white hover:bg-white w-24 h-24">
                <div className="cursor-pointer h-16 w-16 rounded-full overflow-hidden border-none bg-white flex items-center justify-center">
          <img 
            src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
            alt="@shadcn"
            className="object-contain"
          />
          </div>
          </Button>
          <div className='ml-5'>
          <h1 className='font-md text-xl'>{user?.fullname}</h1>
          <p>{user?.profile?.bio}</p>
          </div>
        </div>
        <Button onClick={()=> setOpen(true)} className="text-right ml-3 "><Pen/></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
          <Mail/>
          <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
          <Contact/> 
          <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
          {
           user?.profile?.skills.length!=0 ? user?.profile?.skills.map((item,index)=> <CustomBadge className="text-blue-700 border-blue-700" key={index}>
           {item}
         </CustomBadge>): <span>NA</span>
          } 
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
             <Label className="text-md font-bold">Resume</Label>
             {
              isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
             }
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
           <h1 className='text-bold text-lg my-5'>Applied Jobs</h1>
           <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default ViewProfile
