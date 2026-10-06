require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const pageRoutes = require("./routes/pageRoutes");
const app = express();
const PORT = 3000;
app.set("view engine", "ejs");

app.use(session({
    secret: "webapp-secret",
    resave: false,
    saveUninitialized: false
}));


//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error", error);

    });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/",pageRoutes)

app.use(express.static("public"));

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});





