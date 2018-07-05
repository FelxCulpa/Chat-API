module.exports = {
  secret:   'mysecret',
  jwtSecret: 'jwtSecret',
  serverPort:   9020,
  mongoose: {
    uri:     'mongodb://localhost:27017/fulcrum',
    keepAlive: 1,
    poolSize: 5,
    useMongoClient: true
  }
};