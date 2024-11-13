import express from "express";
import morgan from "morgan";
import connectDatabase from "./config/db";
import contactRoute from "./routes/contactroutes";
import cors from "cors";
import path from "path";
const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 8000;
// Configs
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
connectDatabase();
app.use("/api", contactRoute);
app.use(express.static(path.join(__dirname, '../client/dist')));
// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.get("/", async (req, res) => {
    res.send("Server working fine");
});
app.listen(port, () => {
    console.log("Server running successfully on the port: ", port);
});
