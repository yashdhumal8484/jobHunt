import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, Table, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
const shortlistingStatus=["Accepted","Rejected"]
const ApplicantsTable = () => {
  const {applicants}=useSelector(store=>store.application)
  const statusHandler=async(status,id)=>{
    try{
      axios.defaults.withCredentials=true
      const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status})
      if(res.data.success){
        toast.success(res.data.message)
      }
    }catch(error){
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>FullName</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
              {
                applicants && applicants.application?.map((item)=>(
                  <tr key={item._id}>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell className="text-blue-600 cursor-pointer">
                    {
                      item.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} target='_blank'>{item?.applicant?.profile?.resumeOriginalName}</a> :<span>NA</span>
                    }
                  </TableCell>
                  <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="float-right cursor-pointer">
                      <Popover>
                          <PopoverTrigger>
                              <MoreHorizontal/>
                          </PopoverTrigger>
                          <PopoverContent className='w-32'>
                          {
                       shortlistingStatus.map((status,index)=>{
                          return (
                              <div onClick={()=>statusHandler(status,item?._id)} key={index}>
                                  <span>{status}</span>
                              </div>
                          )
                       })
                     }
                       </PopoverContent>
                      </Popover> 
                  </TableCell>
              </tr>
                ))
              }
                
            </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
