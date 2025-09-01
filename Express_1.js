import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Food, Signup } from "./Express_2.js";
dotenv.config();
const mysecretkey="19112003"
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/foodcart", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));


const verifytoken=(req,res,next)=>{
    const token=req.headers["authorization"]
    try 
    {
        if (token) 
        {
            //console.log(token);
            const decoded = jwt.verify(token, mysecretkey);
            //console.log(decoded)
            req.email=decoded.email
            next()
            
        }
    } 
    catch (error) 
    {
        res.json({message:error.message})
        //console.log(error.message);
        
    }
}


app.get("/", (req, res) => {
  res.send("Hello, Node.js with import syntax!");
});

app.post("/signup", async(req, res) => {
    const{
        name,
        email,
        password,
        confirmpassword}=req.body
    try 
    {
        if (password === confirmpassword)
        {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const signupdata=await Signup.insertOne({name:name,email:email,password:hashedPassword})
            //console.log(signupdata);
            res.json({message:"Signup Successfully"});
        }
        else
        {
            res.json({message:"Password and Confirmpassword Are Mismatch"});
        }
        
    }
    catch (error) 
    {
        res.json({message:"Email Id Already Exist"});
    }
  
});

app.post("/login",async(req, res) => {
    const{
        loginemail,
        loginpassword
        }=req.body
    try 
    {
        const login=await Signup.findOne({email:loginemail})
        //console.log(login);
        if (login)
        {
            const password=login.password
            const isMatch = await bcrypt.compare(loginpassword, password);
            if (!isMatch)
            {
                res.json({message:"Password Wrong"});
            }
            else
            {
                const tokens = jwt.sign({email: login.email },mysecretkey,{ expiresIn: "1h"});
                //console.log(tokens);
                res.json({message:"Login Successfull",token:tokens});
            }
        }
        else
        {
            res.json({message:"User Mail Not Found"});
        }
        
        
    } 
    catch (error) 
    {
        res.json({message:"Login Failed"});
    }
  
});


app.get("/fooddata",verifytoken,async(req, res) => {
    try {
        const responsefood=await Food.find({})
        const responsemail=await Signup.find({email:req.email})
        //console.log(responsemail);
        
        res.json({foodmessage:responsefood,maildata:responsemail})
    } catch (error) {
        res.json({message:"Unable To Fetch Data"})
    }
});

app.post('/forgetpassword',async(req,res)=>{
    const{mail,password}=req.body
    try 
    {
        const getmail=await Signup.findOne({email:mail})
        //console.log(getmail);
        if (!getmail)
        {
            res.json({message:"Invalid Credentials"})
        }
        else
        {
            const hash = await bcrypt.hash(password, 10);
            //console.log(hash);
            const result = await Signup.updateOne({email: mail },{ $set: { password: hash }});
            //console.log(result);
            res.json({message:"Password Updated Successfully"})
        }
        
    } 
    catch (error) 
    {
        res.json({message:"Password Updated Failed"})
    }
})


const PORT = 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
