type User {
  id: ID!
  username: String!
  password: String
}

type Query {
  getUser(id: ID!): User
}

type Mutation {
  signup(username: String!, password: String!): User
  login(username: String!, password: String!): String
}
