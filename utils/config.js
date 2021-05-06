module.exports.CFG = {
  PORT: 3000,
  MONGO_DB: 'mongodb://localhost:27017/bitfilmsdb',
  MONGO_OPTIONS: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
