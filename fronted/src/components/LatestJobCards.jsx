
import React from "react";
import CustomBadge from "./CustomBage";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({job}) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=> navigate(`/description/${job._id}`)} className=" p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-400">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <CustomBadge className="text-blue-700 border-blue-700">
          {job?.position} Positions
        </CustomBadge>
        <CustomBadge className="text-[#F83002] border-[#F83002]">
          {job?.jobType}
        </CustomBadge>
        <CustomBadge className="text-[#7209b7] border-[#7209b7]">
          {job?.salary}LPA
        </CustomBadge>
      </div>
    </div>
  );
};

export default LatestJobCards;
