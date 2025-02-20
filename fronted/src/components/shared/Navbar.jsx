import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";

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
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-14 px-4">
        <div>
          <h1 className="text-xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <ul className="flex font-medium items-center gap-4">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  {" "}
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  {" "}
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
                <Avatar className="cursor-pointer h-8 w-8 rounded-full overflow-hidden border-none">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="object-cover w-full h-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                className="w-64"
                style={{
                  border: "none",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                  outline: "none",
                }}
              >
                <div className="flex gap-2 space-y-1">
                  <Avatar className="h-8 w-8 rounded-full overflow-hidden cursor-pointer border-none">
                    <AvatarImage
                      src={user?.profile?.profilePhoto ??"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"}
                      alt="@shadcn"
                      className="object-cover w-full h-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{user?.fullname}</h4>
                    <p className="text-xs text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600 ">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button // Remove focus outline
                        variant="link"
                        style={{ boxShadow: "none", border: "none" }}
                      >
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button
                      variant="link"
                      style={{ boxShadow: "none", border: "none" }}
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </div>
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
