import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://admin:admin@cluster0.2rqpu.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(error => console.log(error.message));