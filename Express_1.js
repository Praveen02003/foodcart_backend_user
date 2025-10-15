import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import { Signupuser } from "./Signup.js";
import { Beverages } from "./Categories/Beverages.js";
import { Breakfasts } from "./Categories/Breakfasts.js";
import { Burgers } from "./Categories/Burgers.js";
import { Desserts } from "./Categories/Desserts.js";
import { Pizzas } from "./Categories/Pizzas.js";
import { Populars } from "./Categories/Populars.js";
import { Rolls } from "./Categories/Rolls.js";
import { Salads } from "./Categories/Salads.js";
import { Sandwiches } from "./Categories/Sandwiches.js";
import { Snacks } from "./Categories/Snacks.js";
import { Soups } from "./Categories/Soups.js";
import { Starters } from "./Categories/Starters.js";
import { verifytoken } from "./Verifytoken/Verifytoken.js";
import { Ordersdata } from "./Orders/Orders.js";

dotenv.config();
const mysecretkey = "19112003"
const app = express();
app.use(cors());
app.use(express.json());

const mongourl="mongodb+srv://Praveen:Praveen19112003@foodcartcluster.cbsx3vp.mongodb.net/foodcartdb?retryWrites=true&w=majority&appName=foodcartcluster"
// const mongourl = "mongodb://localhost:27017/foodcartdb"

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));



app.get("/", (req, res) => {
    res.send("Hello, Node.js with import syntax!");
});

app.post("/signup", async (req, res) => {
    const { name, mail, password, } = req.body
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const signupdata = await Signupuser.insertOne({ name: name, mail: mail, password: hashedPassword })
        //console.log(signupdata);
        res.json({ message: "Signup Successfull" });
    }
    catch (error) {
        res.json({ message: "Email Id Already Exist" });
    }

});

app.post("/login", async (req, res) => {
    const { mail, password } = req.body
    try {
        const login = await Signupuser.findOne({ mail: mail })
        // console.log(login);
        if (login) {
            const originalpassword = login.password
            const isMatch = await bcrypt.compare(password, originalpassword);
            if (!isMatch) {
                res.json({ message: "Wrong Password" });
            }
            else {
                const tokens = jwt.sign({ mail: login.mail }, mysecretkey, { expiresIn: "1h" });
                //console.log(tokens);
                res.json({ message: "Login Successfull", token: tokens });
            }
        }
        else {
            res.json({ message: "Invalid Credentials" });
        }


    }
    catch (error) {
        res.json({ message: "Login Failed" });
    }

});

app.post('/getuserdata', verifytoken, async (req, res) => {
    try {
        const getuserdata = await Signupuser.findOne({ mail: req.mail })
        // console.log(getuserdata);
        res.json({ message: getuserdata });
    } catch (error) {
        res.json({ message: "Invalid Token" });
    }
})


app.get('/beverages', async (req, res) => {
    try {
        const getdata = await Beverages.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/breakfasts', async (req, res) => {
    try {
        const getdata = await Breakfasts.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/burgers', async (req, res) => {
    try {
        const getdata = await Burgers.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/desserts', async (req, res) => {
    try {
        const getdata = await Desserts.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/pizzas', async (req, res) => {
    try {
        const getdata = await Pizzas.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/populars', async (req, res) => {
    try {
        const getdata = await Populars.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/rolls', async (req, res) => {
    try {
        const getdata = await Rolls.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/salads', async (req, res) => {
    try {
        const getdata = await Salads.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/sandwiches', async (req, res) => {
    try {
        const getdata = await Sandwiches.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/snacks', async (req, res) => {
    try {
        const getdata = await Snacks.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/soups', async (req, res) => {
    try {
        const getdata = await Soups.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/starters', async (req, res) => {
    try {
        const getdata = await Starters.find()
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.get('/offers', async (req, res) => {
    try {
        var getdata = []
        const beverages = await Beverages.find({ offer: { $gt: 0 } });
        const breakfasts = await Breakfasts.find({ offer: { $gt: 0 } });
        const burgers = await Burgers.find({ offer: { $gt: 0 } });
        const desserts = await Desserts.find({ offer: { $gt: 0 } });
        const pizzas = await Pizzas.find({ offer: { $gt: 0 } });
        const populars = await Populars.find({ offer: { $gt: 0 } });
        const rolls = await Rolls.find({ offer: { $gt: 0 } });
        const salads = await Salads.find({ offer: { $gt: 0 } });
        const sandwiches = await Sandwiches.find({ offer: { $gt: 0 } });
        const snacks = await Snacks.find({ offer: { $gt: 0 } });
        const soups = await Soups.find({ offer: { $gt: 0 } });
        const starters = await Starters.find({ offer: { $gt: 0 } });
        getdata = [
            ...beverages,
            ...breakfasts,
            ...burgers,
            ...desserts,
            ...pizzas,
            ...populars,
            ...rolls,
            ...salads,
            ...sandwiches,
            ...snacks,
            ...soups,
            ...starters
        ]
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find food" })
    }
})

app.post('/cartdetails', async (req, res) => {
    const { ids } = req.body
    try {
        var getdata = []
        const beverages = await Beverages.find({ _id: { $in: ids } });
        const breakfasts = await Breakfasts.find({ _id: { $in: ids } });
        const burgers = await Burgers.find({ _id: { $in: ids } });
        const desserts = await Desserts.find({ _id: { $in: ids } });
        const pizzas = await Pizzas.find({ _id: { $in: ids } });
        const populars = await Populars.find({ _id: { $in: ids } });
        const rolls = await Rolls.find({ _id: { $in: ids } });
        const salads = await Salads.find({ _id: { $in: ids } });
        const sandwiches = await Sandwiches.find({ _id: { $in: ids } });
        const snacks = await Snacks.find({ _id: { $in: ids } });
        const soups = await Soups.find({ _id: { $in: ids } });
        const starters = await Starters.find({ _id: { $in: ids } });
        getdata = [
            ...beverages,
            ...breakfasts,
            ...burgers,
            ...desserts,
            ...pizzas,
            ...populars,
            ...rolls,
            ...salads,
            ...sandwiches,
            ...snacks,
            ...soups,
            ...starters
        ]
        res.json({ message: getdata })
    } catch (error) {
        res.json({ message: "Unable to find cartitems" })
    }
})


app.post("/orders", async (req, res) => {
    const { mail, username, items, quantity, total } = req.body
    try {
        const savedata = await Ordersdata.insertMany([{ mail: mail, username: username, items: items, quantity: quantity, total: total }])
        res.json({ message: "Data Saved" })
    } catch (error) {
        res.json({ message: "Data Saved Failed" })
    }
});

app.post('/passwordupdate', async (req, res) => {
    const { mail, password } = req.body
    try {
        const getdata = await Signupuser.findOne({ mail: mail })
        // console.log(getdata);
        if (getdata) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)
            const updatedata = await Signupuser.updateOne({ mail: mail }, { $set: { password: hashedPassword } })
            // console.log(getdata);

            res.json({ message: "Password updated successfully" })
        }
        else {
            res.json({ message: "Invalid Credentials" })
        }
    } catch (error) {
        res.json({ message: "Password update failed" })
    }
})


app.post("/generateqr", async (req, res) => {
  const { amount, orderId } = req.body;

  // your UPI details
  const upiId = "praveen.aeropilot@okaxis";
  const payeeName = "PRAVEEN J";

  // Create UPI payment link
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=Order+${orderId}`;

  try {
    // Generate QR image (base64)
    const qrDataURL = await QRCode.toDataURL(upiLink);
    res.json({ qrImage: qrDataURL, upiLink });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
