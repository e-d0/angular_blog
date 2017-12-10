import * as mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: String,
  url: String,
  content: String,
  image_teaser: String,
  teaser_text: String,
  weight: Number,
  tag: String,
  created: Date
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
