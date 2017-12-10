import TokenHandler from '../tokenhandler';

abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  // Count all
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.json(count);
    });
  }

  // Insert
  insert = (req, res) => {

    if( this.authorization(req) ){

        const obj = new this.model(req.body);
        obj.save((err, item) => {
          // 11000 is the code for duplicate key error
          if (err && err.code === 11000) {
            res.sendStatus(400);
          }
          if (err) {
            return console.error(err);
          }
          res.status(200).json(item);
        });

    }else{
      res.status(403).json({
        message: 'No Token Or Wrong Secret'
      });
    }

  }

  // Get by id
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }

  // Find by url
  findurl = (req, res) => {

    this.model.findOne( { url: req.params.url }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }

  // Update by id
  update = (req, res) => {

    if( this.authorization(req) ){
        this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
          if (err) { return console.error(err); }
          res.sendStatus(200);
        });

    }else{
        res.status(403).json({
          message: 'No Token Or Wrong Secret'
        });
    }

  }

  // Delete by id
  delete = (req, res) => {
    if( this.authorization(req) ){

        this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
          if (err) { return console.error(err); }
          res.sendStatus(200);
        });

    }else{
      res.status(403).json({
        message: 'No Token Or Wrong Secret'
      });
    }

  }

  authorization = (req) => {
    const handler = new TokenHandler(req);
    return handler.checkToken();
  }




}

export default BaseCtrl;
