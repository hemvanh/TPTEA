import 'babel-polyfill' // This is for to run babel-parsed code with async/await
import Express from 'express'
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import ServeStatic from 'serve-static'
import bodyParser from 'body-parser'
import schema from './schema'
import jwt from 'express-jwt'
require('dotenv').config()

const APP_PORT = 8888
const app = Express()
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
})

app.use(ServeStatic(__dirname))
app.use(
  '/api',
  bodyParser.json(),
  auth,
  graphqlExpress(req => ({
    schema,
    context: {
      // can access from resolvers, for when token is attached to axios Authorization header
      authCustomer: req.user,
    },
  }))
)
app.use('/graphiql', graphiqlExpress({endpointURL: 'api'}))

app.listen(process.env.PORT || APP_PORT, () => {
  console.log(`TPTEA_API listening on port ${APP_PORT} ...`)
})
