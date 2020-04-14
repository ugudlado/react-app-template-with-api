import dotenv from 'dotenv'
import 'reflect-metadata'
import * as App from './app'

dotenv.config()

const server = App.listen()

export default server
