import * as express from 'express';

import ImageUploader from './uploader';
import MailNotificator from './notificator';
import UserCtrl from './controllers/user';
import ArticleCtrl from './controllers/article';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const articleCtrl = new ArticleCtrl();

  const imageUploader = new ImageUploader();

  const mailNotificator = new MailNotificator();

  // Articles
  router.route('/articles').get(articleCtrl.getAllArticles);
  router.route('/articles/count').get(articleCtrl.count);
  router.route('/article/add').post(articleCtrl.insert);
  // router.route('/article/:id').get(articleCtrl.get);
  router.route('/article/:id').put(articleCtrl.update);
  router.route('/article/remove/:id').delete(articleCtrl.delete);
  router.route('/article/:url').get(articleCtrl.findurl);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Notificators

  router.route('/sendmail').post(mailNotificator.sendMail);

  // allow headers to accept files
  app.use(function(req, res , next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


  router.route('/upload').post(imageUploader.uploadImages);

  router.route('/getallimages').post(imageUploader.getAllImg);

  router.route('/remove/:img').post(imageUploader.deleteFile);



  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
