import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-14 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <ul className="flex font-medium items-center gap-4">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth buttons / User menu */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5323a5]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-8 w-8 rounded-full overflow-hidden">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                  <AvatarFallback>
                    <img
                      src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                      alt="default"
                      className="object-cover w-full h-full"
                    />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={8}
                className="w-64 rounded-lg shadow-lg p-3 bg-white"
              >
                {/* User info */}
                <div className="flex gap-2 items-center">
                  <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="avatar" />
                    <AvatarFallback>
                      <img
                        src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                        alt="default"
                        className="object-cover w-full h-full"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{user?.fullname}</h4>
                    <p className="text-xs text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {/* Menu */}
                <div className="flex flex-col mt-3 text-gray-600 space-y-2">
                  {user?.role === "student" && (
                    <Link to="/profile" className="flex items-center gap-2">
                      <User2 className="w-4 h-4" /> View Profile
                    </Link>
                  )}

                  {user?.role === "recruiter" && (
                    <Link to="/admin/jobs" className="flex items-center gap-2">
                      <User2 className="w-4 h-4" /> Dashboard
                    </Link>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-left"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
