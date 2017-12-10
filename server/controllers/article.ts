import Article from '../models/article';
import BaseCtrl from './base';


export default class ArticleCtrl extends BaseCtrl {
  model = Article;
  // get all articles without content
  getAllArticles = (req, res) => {
    this.model.find({},{ content: 0 }, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }
}
