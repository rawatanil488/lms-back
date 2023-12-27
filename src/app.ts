import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDb from "./db/connectDb";
import routes from './routes'

const app = express();

app.use(cors())

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
connectDb();
app.use('/', routes());

app.listen(3000 , () => console.log(`Application running at http://localhost:3000`));