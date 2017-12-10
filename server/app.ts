import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as path from 'path';

import setRoutes from './routes';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  dotenv.load({ path: '.env' });
}

const IMG_PATH = process.env.IMG_PATH || '../../uploads/img/';

app.set('port', (process.env.PORT || 8200));
app.use('/', express.static(path.join(__dirname, IMG_PATH )));
app.use('/', express.static(path.join(__dirname, '../static/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  setRoutes(app);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../static/public/index.html'));
  });

  app.listen(app.get('port'), () => {
    console.log('Angular REST SERVER listening on port ' + app.get('port'));
  });

});

export { app };
