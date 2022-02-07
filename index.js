const app = require('./src/app');
const PORT = process.env.PORT || 5400;
const localhost = '127.0.0.1';

const telegram = require('./src/services/telegram');

const startServer = async () => {
  await telegram.connect();
  app.listen(PORT, function (err) {
    console.log('\n');
    console.log(`Server listening on http://${localhost}:${PORT}`);
    console.log('\n');

    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
};

startServer();
