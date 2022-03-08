import app from './src/app.js';
import chalk from 'chalk';
import * as redis from './src/service/redis.js';

const { IP, PORT } = {
  IP: '127.0.0.1',
  PORT: process.env.PORT || 5400,
};

const startServer = async () => {
  // await redis.connect();
  await redis.flushall();
  app.listen(PORT, function (err) {
    console.log(chalk.bgHex('#BDF4F1').black.bold.underline(`Server listening on `), chalk.bgYellow.black.bold.underline(` http://${IP}:${PORT} `));
    // console.log('\n');

    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
};

startServer();
