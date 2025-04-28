import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (error, req: Request, res:Response, next: NextFunction) => {
    console.log(`PATH: ${req.path}`, error);
    return res.status(500).send("Internal server error");
}

export default errorHandler;    