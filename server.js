const express = require("express");
const colors = require("colors"); //When we want to add colors to our console logs for better visibility, we can use the colors library. It allows us to easily style our console output with different colors and backgrounds, making it easier to distinguish between different types of messages (e.g., errors, warnings, info) in the terminal.
const cors = require("cors"); //When we want to allow cross-origin requests from different domains, we can use the cors middleware. It enables us to specify which origins are allowed to access our server's resources, making it easier to handle requests from web applications hosted on different domains.
const morgan = require("morgan"); //When we want to log the request and response details in the console, we can use morgan as a middleware. It helps us to see the incoming requests, their methods, URLs, status codes, and response times, which is useful for debugging and monitoring our application.
const dotenv = require("dotenv"); //When we want to manage environment variables in our application, we can use the dotenv library. It allows us to load environment variables from a .env file into process.env, making it easier to configure our application without hardcoding sensitive information like database credentials or API keys directly in our code.
const { connect } = require("mongoose");
const connectDb = require("./config/db");

//dot env configuration
dotenv.config();

// DB connection
connectDb();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
//URL => http://localhost:8080/
app.use("/api/v1/test", require("./routes/testRoutes"));

//routes

app.get("/", (req, res) => {
  return res
    .status(200)
    .send(
      "<h1 style='color: skyblue; font-family: Arial, sans-serif;'>Welcome to the Restaurant App!</h1>",
    );
});

//port
const PORT = process.env.PORT || 8080;

//listening to the PORT
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`.white.bgMagenta);
});
