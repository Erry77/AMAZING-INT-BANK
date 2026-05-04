const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/databaseConfig");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/onboarding", require("./routes/onboardingRoutes"));
app.use("/api/account", require("./routes/accountsRoutes"));
app.use("/api/transaction", require("./routes/transactionsRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountsRoutes"));

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log("Server running")
);