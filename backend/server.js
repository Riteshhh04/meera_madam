const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/database");

// Import Routes
const clientRoutes = require("./routes/clientRoutes");
const artworkRoutes = require("./routes/artworkRoutes");
const staffRoutes = require("./routes/staffRoutes");
const advanceRoutes = require("./routes/advanceRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const billRoutes = require("./routes/billRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// 1. UPDATED CORS: Only allow your Netlify domain
const corsOptions = {
    origin: 'https://meeraartsystem.netlify.app', // Only your frontend can access this
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

// API Routes
app.use("/api/clients", clientRoutes);
app.use("/api/artworks", artworkRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/advances", advanceRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("Meeraa Studio Backend Running...");
});

// Test Database Connection
app.get("/api/test-db", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT NOW() AS server_time");
        res.json({
            success: true,
            message: "Database Connected Successfully",
            serverTime: rows[0].server_time
        });
    } catch (err) {
        console.error("DB Test Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});