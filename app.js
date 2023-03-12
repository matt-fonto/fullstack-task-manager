const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

//Middlewares
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

//initialize express and make it parse json
app.use(express.static("./public"));
app.use(express.json());

//Routes
//Set GET request to specific path
//Set a route to handle requests to "path", the handling is delegated to another module "tasks"
app.use("/api/v1/tasks", tasks);

//Handling the 404
app.use(notFound);

//Handling errors
app.use(errorHandlerMiddleware);

const PORT = 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
