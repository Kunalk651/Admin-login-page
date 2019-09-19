const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Middleware
app.use(express.json({ extended: false }));

// Routs
app.use("/", require("./routes/auth"));

const PORT = process.env.PORT || 5555;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
});
