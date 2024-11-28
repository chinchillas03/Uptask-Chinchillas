import type {Request, Response, NextFunction} from 'express'
import {validationResult} from 'express-validator'

export const handleInputErrors = (Request, Response, NextFunction) => {
    let errors =  validationResult(Request)
    if(!errors.isEmpty()){
        return Response.status(400).json({errors: errors.array()})
    }
    NextFunction()
}