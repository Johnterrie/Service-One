const express = require('express');
const { graphqlHTTP } = require('graphql-http');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();

const schema = require('./src/schema/userSchema');
const resolvers = require('./src/controllers/resolvers');
const User = require('./src/models/user.js');

const app = express();

app.use(express.json());
app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
  })
);

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema: buildSchema(schema),
    rootValue: resolvers,
    context: {
      req,
      User,
    },
    graphiql: true,
  }))
);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
