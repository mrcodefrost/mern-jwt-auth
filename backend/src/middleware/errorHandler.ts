import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";


const handleZodError = (res: Response, error:z.ZodError) => {

    // Extract the zod issues (errors)
    const errors = error.issues.map((err) => ({

        path: err.path.join("."),
        message: err.message,
    }));


    res.status(BAD_REQUEST).json({
        message:error.message,
        errors
    })
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}`, error);


    if(error instanceof z.ZodError) {
        return handleZodError(res, error);
    }


    res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
    // Adding return keyword on res.status will throw error on express 5
}

export default errorHandler;    