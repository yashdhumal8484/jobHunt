import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import useRouter from "./routes/user.route.js"
import companyRouter from "./routes/company.route.js"
import jobRouter from "./routes/job.route.js"
import applicationRouter from "./routes/application.route.js"
dotenv.config({})
const app=express();
app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
    "http://localhost:5173",
    "https://job-hunt-theta-nine.vercel.app",
   "https://job-hunt-yashs-projects-85987c7a.vercel.app",
    "https://job-hunt-git-main-yashs-projects-85987c7a.vercel.app",
    "https://job-hunt-he77joonw-yashs-projects-85987c7a.vercel.app"
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};
app.use(cors(corsOptions));



const PORT=process.env.PORT || 3000
app.use("/api/v1/user",useRouter)
app.use("/api/v1/company",companyRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at ${PORT}`)
})
