import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import connectToDatabse from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(cors({origin: APP_ORIGIN, credentials: true}));
app.use(cookieParser());

app.get("/", (req: Request, res: Response, next) => {
    res.status(OK).json({
        status : "Healthy"
    });
});

// Auth Routes
app.use("/auth", authRoutes);


// This middleware will catch all of the errors thrown from any of the above routes.
app.use(errorHandler);

app.listen(
    PORT, 
    async () => {
        console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment`);
        await connectToDatabse();
    }
);


