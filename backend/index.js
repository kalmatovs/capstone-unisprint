require("dotenv").config({path: "./.env"});


const config = require("./config.json");
const mongoose = require("mongoose");

const User = require("./models/user.model");
const Order = require("./models/order.model");

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection erro:", err));

//mongoose.connect(config.connectionString);

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({data: "hello00"});
});

app.post("/create-account", async (req, res) => {
    const {fullName, email, password, major, hometown, year} = req.body;

    if(!fullName) {
        return res
            .status(400)
            .json({error: true, message: "Full Name is required"})
    }

    if(!email) {
        return res
            .status(400)
            .json({error: true, message: "Email is required"})
    }

    if(!password) {
        return res
            .status(400)
            .json({error: true, message: "Password is required"})
    }

    if(!major) {
        return res
            .status(400)
            .json({error: true, message: "Major is required"})
    }

    if(!year) {
        return res
            .status(400)
            .json({error: true, message: "Year is required"})
    }

    const isUser = await User.findOne({email:email});
    if(isUser) {
        return res.json({
            error:true,
            message:"User already exist",
        });
    }
    
    const user = new User ({
        fullName,
        email,
        password,
        major,
        hometown,
        year
    });

    await user.save();

    const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000min",
    });

    return res.json({
        error:false,
        user,
        accessToken,
        message: "Registration complete",
    });
});

app.post("/login", async (req, res) => {
    const { email, password} = req.body;
    
    if (!email) {
        return res.status(400).json({message: "Email is required."});
    }

    if (!password) {
        return res.status(400).json({message: "Password is required."});
    }

    const userInfo = await User.findOne({email: email});

    if (!userInfo) {
        return res.status(400).json({message:"User not found"});
    }

    if (userInfo.email === email && userInfo.password === password) {
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn:"36000m",
        });
        return res.json({
            error:false,
            message:"Login successful",
            email, 
            accessToken,
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid credentials",
        });
    }
});

app.get("/get-user", authenticateToken, async (req, res) => {
    const {user}  = req.user;
    const isUser = await User.findOne({ _id: user._id});

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: isUser,
        message: "user found",
    });
});

app.post("/add-order", authenticateToken, async(req, res) => {
    console.log("Authenticated user:", req.user._id);
    console.log("JWT Secret:", process.env.ACCESS_TOKEN_SECRET);
    const jwt = require("jsonwebtoken")

    // Replace with your actual token   

    // const decoded = jwt.decode(token, { complete: true });
    // console.log("Decoded token:", decoded);
    // console.log("Decoded token payload:", decoded.payload);



    const {title, content, category, location, payment, urgency, duration} = req.body;
    // const {user}  = req.user;

    if (!title) {
        return res.status(400).json({message: "Title is required."});
    }

    if (!content) {
        return res.status(400).json({message: "Content is required."});
    }

    if (!category) {
        return res.status(400).json({message: "Category is required."});
    }
    if (!payment) {
        return res.status(400).json({message: "Payment is required."});
    }
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: true, message: "Unauthorized" })
    }
    

    try {
        const order = new Order({
            title,
            content,
            category,
            userId: req.user.userId,
            payment: payment|| 0,
            urgency: urgency || false,
            duration: duration || 0, 
            location,
        })
        await order.save()
        return res.json({
            error: false,
            order,
            message: "Order added successfully"
        });
    } catch (error ) {
        console.error("Error in /add-order route:", error.message);
        return res.status(500).json({
            error:true,
            message: "Internal Server error"
        })
    }


});

app.get("/order-history", authenticateToken, async (req, res) => {
    try {
        // Retrieve orders based on the user ID (from the token)
        const orders = await Order.find({ userId: req.user.userId });

        // If no orders exist
        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        return res.json({
            error: false,
            orders,
            message: "Orders retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});


app.put("/edit-order/:orderId", authenticateToken, async (req, res) => {
    const orderId  = req.params.orderId;
    const { title, content, category, location, payment, urgency, duration } = req.body;
    const  {user}  = req.user;

    // Check for required fields
    if (!title && !content && !category && !location && !payment && !urgency && !duration) {
        return res.status(400).json({
            message: "No changes provided."
        });
    }
    
    try {
        // Find the order by ID and ensure it belongs to the logged-in user
        const order = await Order.findOne({ _id: orderId, userId: user._id });
        if (!order) {
            return res.status(404).json({ error: true, message: "Order not found or unauthorized." });
        }

        // Update the order fields
        if (order) order.title = title;
        if (content) order.content = content;
        if (category) order.category = category;
        if (location) order.location = location;
        if (payment) order.payment = payment;
        if (urgency) order.urgency = urgency || false;
        if (duration) order.duration = duration || 1;

        // Save the updated order
        await order.save();

        return res.json({
            error: false,
            order,
            message: "Order updated successfully",
        });
    } catch (error) {
        console.error("Error in /edit-order route:", error); // Log error for debugging
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

app.get("/get-user-all-orders", authenticateToken, async (req, res) => {
    const {user} = req.user;
    try {
        const orders = await Order.find({userId: user._id}); // Retrieve all orders
        return res.json({
            error: false,
            orders,
            message: "All orders retrieved successfully",
        });
    } catch (error) {
        console.error("Error in /get-all-orders route:", error);
        return res.status(500).json({
            error: true,
            message: "Internal Server error",
        });
    }
});

app.delete("/delete-order/:orderId", authenticateToken, async (req, res) => {
    const  orderId  = req.params.orderId;
    const {user} = req.user;

    try {
        // Find the order by ID and ensure it belongs to the logged-in user
        const order = await Order.findOne({ _id: orderId, userId: user._id });
        
        if (!order) {
            return res.status(404).json({
                error: true,
                message: "Order not found or unauthorized",
            });
        }

        // Delete the order
        await Order.deleteOne({ _id: orderId });

        return res.json({
            error: false,
            message: "Order deleted successfully",
        });
    } catch (error) {
        console.error("Error in /delete-order route:", error);
        return res.status(500).json({
            error: true,
            message: "Internal Server error",
        });
    }
});

app.get("/profile", authenticateToken, async (req, res) => {
    try {
        const {user}  = req.user;
        const isUser = await User.findOne({_id: user._id}); // Exclude password for security
        if (!isUser) {
            return res.status(404).json({ error: true, message: "User not found" });
        }
        res.json({ error: false, user, message: "User profile retrieved successfully" });
    } catch (error) {
        console.error("Error in /profile:", error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

app.get("/get-all-orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({createdAt: -1}); 
        return res.json({
            error: false,
            orders,
            message: "All orders retrieved successfully",
        });
    } catch (error) {
        console.error("Error in /get-all-orders route:", error);
        return res.status(500).json({
            error: true,
            message: "Internal Server error",
        });
    }
});


app.listen(8000);

module.exports = app;

