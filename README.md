# angular_blog
Angular 5+ SPA custom personal blog CMS with node.js/express server. All in one.

Build Setup
# install dependencies
npm install

# install pm2 manager https://github.com/Unitech/pm2
npm install pm2 -g

# create .env file at root project folder and configure path for images and your Mongo DB credentials (example)

MONGODB_URI=mongodb://example:12345.mlab.com:12345/blog_db<br>
SECRET_TOKEN=releasethekraken<br>
EMAIL_PASS=123456<br>
MAIL_ADRESS=e-do@inbox.ru<br>
IMG_PATH='../../uploads/img/'<br>
PORT=8200<br>


# build the app
npm run prod

# Visit the app at [http://localhost:8200](http://localhost:8200)

# to list/stop/start/restart rest-server use pm2 commands with name "rest-server"
pm2 list
pm2 stop rest-server
pm2 start rest-server
pm2 restart rest-server

# for development:
# serve frontend with hot reload at [http://localhost:4200](http://localhost:4200) and run pm2 server 
npm run rest-server-prod
npm start
