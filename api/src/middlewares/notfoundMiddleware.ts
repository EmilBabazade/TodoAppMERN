import { Request, Response } from "express"
import { IError } from "../errors/error.js";

const unknownEndpoint = (request: Request, response: Response<IError>) => {
    response.status(404).send({ message: 'unknown endpoint' })
}

module.exports = unknownEndpoint;