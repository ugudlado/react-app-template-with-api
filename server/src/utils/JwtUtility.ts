import jwt from 'jsonwebtoken'

export function generateToken(object: Token) {
  return jwt.sign(object, process.env.SALT, {
    expiresIn: process.env.JWT_EXPIRY || '15m',
  })
}

export function getObjectFromToken(token: string): Token {
  return jwt.verify(token, process.env.SALT) as Token
}

export interface Token {
  firstName: string
  lastName: string
  role: string
  id: number
  exp?: number
  iat?: number
}
