const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({
  path: "./config/config.env",
});

const port = process.env.PORT;

connectDatabase();
app.listen(port, () => {
  console.log("server is running on the port", port);
});
