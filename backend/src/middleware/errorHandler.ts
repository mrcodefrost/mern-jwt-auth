import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (error, req: Request, res:Response, next: NextFunction) => {
    console.log(`PATH: ${req.path}`, error);
    res.status(500).send("Internal server error");
    // Adding return keyword on res.status will throw error on express 5
}

export default errorHandler;    