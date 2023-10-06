import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb"}));




const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

