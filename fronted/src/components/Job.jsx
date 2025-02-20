import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import CustomBadge from './CustomBage'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate=useNavigate()
  //const jobId="kjfgdklja"
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentTime=new Date();
    const timeDifference=currentTime-createdAt;
    return Math.floor(timeDifference/(1000*24*60*60))
  }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-100'>
        <div className='flex items-center justify-between'>
      <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)===0 ? "Today":`${daysAgoFunction(job?.createdAt)} days ago `}</p>
      <Button variant="outline" className="rounded-full" size="icon"> <Bookmark/></Button>
      </div>
      <div className='flex items-center gap-2'>
      <Button className="bg-white hover:bg-white">
        <div className="cursor-pointer h-8 w-8 rounded-full overflow-hidden border-none bg-white flex items-center justify-center">
  <img
    src={job?.company?.logo}
    alt="@shadcn"
    className="object-contain w-6 h-6"
  />
</div>
      </Button>
      <div>
        <h1 className='font-medium text-lg '>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.decription}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <CustomBadge className="text-blue-700 border-blue-700">
          {job?.position} Positions
        </CustomBadge>
        <CustomBadge className="text-[#F83002] border-[#F83002]">
          {job?.jobType}
        </CustomBadge>
        <CustomBadge className="text-[#7209b7] border-[#7209b7]">
          {job?.salary} LPA
        </CustomBadge>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job

