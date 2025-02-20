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
const corsOption={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOption));
const PORT=process.env.PORT || 3000
app.use("/api/v1/user",useRouter)
app.use("/api/v1/company",companyRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)
app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at ${PORT}`)
})