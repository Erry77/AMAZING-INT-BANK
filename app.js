const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/databaseConfig");

const identityRoutes = require("./routes/identityRoutes");
const fintechRoutes = require("./routes/fintechRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());


// ================= ROUTES =================

// Existing Routes
app.use("/api/onboarding", require("./routes/onboardingRoutes"));
app.use("/api/account", require("./routes/accountsRoutes"));
app.use("/api/transaction", require("./routes/transactionsRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Fintech Routes
app.use("/api/fintech", fintechRoutes);

// BVN & NIN Identity Routes
app.use("/api", identityRoutes);


// ================= DEFAULT ROUTE =================

app.get("/", (req, res) => {
  res.send("Amazing Bank API Running...");
});


// ================= ERROR HANDLERS =================

app.use(notFound);
app.use(errorHandler);


// ================= LIST ENDPOINTS =================

const listEndpoints = require("express-list-endpoints");

console.log(listEndpoints(app));


// ================= SERVER =================

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});

module.exports = app;