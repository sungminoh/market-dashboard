import express from 'express';
import ExpressConfig from './express.config';

const application = express();
const port = 3000;

const initConfig = (app) => {
  ExpressConfig.Init(app);
};

const start = (app) => {
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Listening on http://localhost: ${port}`);
  });
};

initConfig(application);

start(application);
