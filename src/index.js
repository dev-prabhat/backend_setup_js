import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Error", error);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on PORT`, process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("EXPRESS server ERROR", error);
    process.exit(1);
  });
