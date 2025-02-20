import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, LucideMoreHorizontal, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobTable = () => {
  const {allAdminJobs}=useSelector(store=>store.job)
  const { companies,searchCompanyByText } = useSelector((store) => store.company);
  const [filterJobs,setFilterJobs]=useState(allAdminJobs);
  const naviagate=useNavigate();
  useEffect(()=>{
    const filteredJobs=allAdminJobs.length>=0 && allAdminJobs.filter((job)=>{
      if(!searchCompanyByText){
        return true;
      }
      return job?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    })
    setFilterJobs(filteredJobs)

  },[companies,searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr>
             
              <TableCell>{job?.company.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.company?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <LucideMoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={()=> naviagate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div onClick={()=> naviagate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                      <Eye/>
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
          <TableBody />
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobTable;
