import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./api/todo/todoRouter.js";
import { unknownEndpoint } from "./middlewares/notfoundMiddleware.js";
const app = express();
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/api/todos', todoRoutes);
app.use(unknownEndpoint);
const CONNECTION_URL = 'mongodb+srv://admin:admin@cluster0.2rqpu.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3001;
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(error => console.log(error.message));
//# sourceMappingURL=index.js.map