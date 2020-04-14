import express from 'express'
import AccessDeniedFailure from '../core/failures/AccessDeniedFailure'
import CustomFailure from '../core/failures/CustomFailure'
import Failure from '../core/failures/Failure'
import InternalServerFailure from '../core/failures/InternalServerFailure'
import UnAuthorizedRequestFailure from '../core/failures/UnAuthorizedRequestFailure'
import { HttpStatusCode } from '../core/HttpStatusCode'
import { logError } from '../core/Logger'
import Roles from '../core/Roles'
import * as jwt from '../utils/JwtUtility'

export function allowAllRoles(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  checkifTokenIsValid(req.headers.authorization)
  next()
}

export function allowedRoles(...authorizedRoles: string[]) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const profile = checkifTokenIsValid(req.headers.authorization)
    if (!authorizedRoles.includes(profile.role)) {
      throw new UnAuthorizedRequestFailure()
    }
    next()
  }
}

export function allowProfileUpdate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const profileFromToken = checkifTokenIsValid(req.headers.authorization)
  const profile = req.body
  if (
    profileFromToken.role !== Roles.Admin && // Facility Admin creates/updates Nurse, Doctor
    profileFromToken.role !== Roles.SuperAdmin && // SuperAdmin creates/updates FacilityAdmins
    profileFromToken.role !== Roles.User // Nurse creates Patients
  ) {
    checkJWTProfileMatchesWithRequestBody(profileFromToken, profile)
  }
  next()
}

export function allowOnlyOwner(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const profileFromToken = checkifTokenIsValid(req.headers.authorization)

  let profile
  if (req.params.id) {
    profile = { id: parseInt(req.params.id, 10) }
  } else {
    profile = req.body
  }

  checkJWTProfileMatchesWithRequestBody(profileFromToken, profile)
  next()
}

export function errorHandler(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): any {
  let failure: Failure = err
  if (!failure.isFailure) {
    failure = new InternalServerFailure(err)
  }
  logError(failure)
  res.status(failure.httpStatusCode).send(failure.message)
}

export function postRequestHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): any {
  try {
    res.status(HttpStatusCode.OK).send(res.locals.data)
  } catch (err) {
    next(err)
  }
}

function checkJWTProfileMatchesWithRequestBody(profileFromToken: any, profile: any) {
  if (profileFromToken.id !== profile.id) {
    const errorMsg = `Profile in token doesn't match with updating profile`
    throw new CustomFailure({
      httpStatusCode: HttpStatusCode.UNAUTHORIZED,
      message: errorMsg,
    })
  }
}

function checkifTokenIsValid(token: string) {
  try {
    return jwt.getObjectFromToken(token)
  } catch (err) {
    throw new AccessDeniedFailure(err)
  }
}
