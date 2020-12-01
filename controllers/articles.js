const Article = require('../models/Article');
const ValidationError = require('../middleware/errors/ValidationError');
const NotFoundError = require('../middleware/errors/NotFoundError');
const ForbiddenError = require('../middleware/errors/ForbiddenError');

module.exports.getArticles = (req, res) => {
  Article.find({ owner: req.user })
    .then((articles) => {
      res.send({ articles });
    })
    .catch(() => res.status(500).send({ message: 'Error' }));
};
module.exports.saveArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link,
  } = req.body;
  const owner = req.user;
  if (!keyword || !title || !text || !date || !source || !link) {
    throw new ValidationError('invalid data passed to the methods for creating an article');
  }
  Article.create({
    keyword, title, text, date, source, link, owner,
  })
    .then((article) => {
      if (!article) {
        throw new ValidationError('invalid data passed to the methods for creating an article');
      }
      res.send(article);
    })
    .catch(next);
};
module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndDelete(req.params.articleId)
    .then((article) => {
      if (String(article.owner) !== req.user._id) {
        throw new ForbiddenError('User is not authorized for this method');
      }
      if (!article) {
        throw new NotFoundError('article not found');
      }
      res.send({ message: 'card deleted' });
    })
    .catch(next);
};
