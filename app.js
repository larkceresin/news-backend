require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
const users = require('./routes/users');
const articles = require('./routes/articles');
const {createUser, login} = require('./controllers/users');
const auth = require('./middleware/auth');
const NotFoundError = require('./middleware/errors/NotFoundError')
const { requestLogger, errorLogger } = require('./middleware/logger');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
app.use(express.json(), cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger)

app.options('*', cors())

app.post('/signup', createUser);
app.post('/login', login);
app.use(auth);
app.use('/users', users);
app.use('/articles', articles);
app.get('*', (req, res) => {
  throw new NotFoundError('Requested resource not found');
});
app.use(errorLogger)
app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and display a message based on it
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})
