import express from "express";
import morgan from "morgan";
import connectDatabase from "./config/db";
import contactRoute from "./routes/contactroutes";
import cors from "cors";

const app = express();

const port = process.env.PORT || 8000;

// Configs
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

connectDatabase();

app.use("/api", contactRoute);

app.get("/", async (req, res) => {
  res.send("Server working fine");
});

app.listen(port, () => {
  console.log("Server running successfully on the port: ", port);
});
