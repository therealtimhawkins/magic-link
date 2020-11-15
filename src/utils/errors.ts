import { Response, Request, NextFunction } from 'express'
import { ValidationError } from 'joi'
import { Boom } from '@hapi/boom'

interface Err extends ValidationError {
  status: number
}

const buildError = (err: Err) => {
  if (err instanceof Boom) {
    return {
      status: err.output.statusCode,
      error: err.output.payload.error,
      message: err.output.payload.message
    }
  }

  if (err.isJoi) {
    return {
      status: 400,
      error: 'Bad Request',
      message: err.details[0].message
    }
  }
  return err
}

export function handler(
  err: Err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err)
  const error = buildError(err)
  res.status(error.status).json(error)
}
