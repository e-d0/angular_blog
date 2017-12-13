import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import * as Jimp from 'jimp';
import * as mkdirp from 'mkdirp';

const IMG_PATH = process.env.IMG_PATH || '../../uploads/img/';
export class ImageUploader {

  // image storage path
  storagePath: any;
  imageResolutions: any;
  storage: any;
  upload: any;

  constructor() {

    this.storagePath = path.join(__dirname, IMG_PATH );

    // create image storage path if not exists
    if (!fs.existsSync(this.storagePath)) {
      mkdirp.sync(this.storagePath);
    }
    // array of resolutions for images
    this.imageResolutions = [ 320, 540, 1024 ];
    // configure storage for images
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.storagePath );
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
      }
    });

    this.upload = multer({ storage: this.storage }).array('file');
    // check if path for images exists
    this.ensureExists(this.storagePath, this.imageResolutions, '0o744', function(err) {
      if (err) {console.log(err); }// handle folder creation error
      else console.log('folders created'); // we're all good
    });

  }

  // check if path for images exists. creates dir if not
  ensureExists(path, imageResolutions , mask, cb) {

    const arrayUrls = [];
    arrayUrls.push(path);

    for ( let j = 0; j < imageResolutions.length; j++) {
      const url = path + '/' + imageResolutions[j];
      arrayUrls.push(url);
    }

    for (let i = 0; i < arrayUrls.length; i++) {
      if (typeof mask === 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = '0o777';
      }
      fs.mkdir(arrayUrls[i], mask, function (err) {
        if (err) {
          if (err.code === 'EEXIST') cb(null); // ignore the error if the folder already exists
          else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
      });
    }

  }

  // upload images route object
  uploadImages = ( req, res ) => {

    // prepare to parse multiform data with 'multer' module

    this.upload( req, res, (err) => {

        if (err){
          console.log(err);
        }
        // creating smaller versions of the image
        this.getAllImagesUrl(req).then(
          result => {
            /* successFunction */
            res.status(200).send(result);
          },
          error => {
            /* errorFunction */
            res.status(404).send('error!promise returned error');
          }

        );

      }
    );

  }

  // accepts rest request
  getAllImg = (req, res) => {

    this.getAllImagesUrl(req).then(
      result => {
        /* successFunction */
        res.status(200).send(result);
      },
      error => {
        /* errorFunction */
        res.status(404).send('errror!promise returned error');
      }

    );
  }
  // checks if url is file
  isFile(fileUrl){
    const stats = fs.statSync(fileUrl);

    if ( stats.isFile() ) {
      return true;
    }
    return false;
  }
  // checks if file exists.
  existFile(fileUrl) {

    try {
      const stats = fs.statSync(fileUrl);
      // console.log('it exists');
      return true;
    }
    catch (err) {
      // console.log('it does not exist');
      return false;
    }

  }

  // get all images with promise
  getAllImagesUrl = (req) => {

    return new Promise((resolve, reject) => {

      fs.readdir(this.storagePath, (err, file) => {
          if (err) reject(err);

          const arrayOfUrl = [];

          const host = req.protocol + '://' + req.get('host') + '/';

          if (file) {

            for (let i = 0; i < file.length; i++) {
              const fileUrl = this.storagePath + file[i];


              if ( this.isFile(fileUrl) ) {

                const thumbnailFile = this.storagePath + (this.imageResolutions['0'] + '/') + file[i];
                const smallSizeUrl = host + (this.imageResolutions ? (this.imageResolutions['0'] + '/') : '' ) + file[i];
                const imagePath = host + file[i];
                const urlObj = { thumbnailPath: smallSizeUrl,
                  imagePath: imagePath };

                if ( !this.existFile(thumbnailFile) ){
                  this.createSmallerImage(fileUrl, file[i]);
                }

                arrayOfUrl.push(urlObj);

              }
            }
          }

          resolve(arrayOfUrl);

        }
      );

    });

  }

  // function generates smaller versions of images in img folder
  createSmallerImage(url , name){

    const stats = fs.statSync(url);

    if ( stats.isFile() ) {

      const img = {
        name: name,
        width: this.imageResolutions,
        path: url,
      };

      for (let index = 0; index < img.width.length; ++index) {

        const thumbnailFile = this.storagePath + img.width[index] + '/' + img.name;

        if ( !this.existFile(thumbnailFile)){
          Jimp.read(img.path,  (err, data) => {
            if (err) throw err;
            data.resize(img.width[index], Jimp.AUTO)            // resize
              .write(thumbnailFile); // save
            // console.log('created img ' + thumbnailFile );
          });
        }else{
          console.log('File already exists!!!');
        }
      }

    }else{
      console.log('File not found or it is a directory');
    }

  }

  deleteFile = (req, res) => {

    const fileName = req.params.img;

    this.removeImage(fileName).then(
      (result) => {
        /* successFunction */
        res.status(200).send();
      }).catch((error) => console.log(error));
  }




  removeImage(imgName){
    return new Promise((resolve, reject) => {

      const img = {
        name: imgName,
        width: this.imageResolutions,
        path: this.storagePath + imgName,
      };

      if ( this.existFile(img.path)  ) {

        try {
          fs.unlinkSync(img.path);
        }
        catch (err) {
          console.log('err while remove:' + '\n' + err);
        }

        for (let index = 0; index < img.width.length; ++index) {

          const thumbnailFile = this.storagePath + '/' + img.width[index] + '/' + img.name;

          try {
            fs.unlinkSync(thumbnailFile);
          }
          catch (err) {
            console.log('err while remove:' + '\n' + err);
          }

        }

        resolve( 'all files removed');

      }else{
        reject( 'File not found or it is a directory');
      }

    });
  }



}


export default ImageUploader;
