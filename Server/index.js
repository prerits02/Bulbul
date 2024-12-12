const express = require("express");
const dotenv = require("dotenv");

const app = express();


const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "tmp",
  })
);


const authRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const transactionRoutes = require("./routes/Transaction");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/transaction", transactionRoutes);

const connectDB = require("./config/db");
connectDB();


const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
