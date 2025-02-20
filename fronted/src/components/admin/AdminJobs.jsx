import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { searchCompaniesByText } from "@/redux/CompanySlice";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
const AdminJobs = () => {
    useGetAllAdminJobs()
  const dispatch=useDispatch();
  const [input,setInput]=useState("");
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(searchCompaniesByText(input));
  },[input])
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto my-10">
       <div className="flex items-center justify-between my-5">
        <Input onChange={(e)=>setInput(e.target.value)} className="w-fit" placeholder="Filter by name role" />
        <Button onClick={()=>navigate("/admin/jobs/create")} className>New Jobs</Button>
        </div>
        <AdminJobTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
