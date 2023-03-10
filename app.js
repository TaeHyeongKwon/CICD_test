require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./modules/errorHandler');
const app = express();
const helmet = require('helmet');
app.set('port', process.env.PORT || '3000');

const { sequelize } = require('./models');
const indexRouter = require('./routes');

const corsOption = {
  origin: ['https://www.ezip.store', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
};

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB 연결 되었습니다.');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use(errorHandler);

module.exports = app;
