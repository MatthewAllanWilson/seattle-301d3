(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    debugger;
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //This runs Article.findWhere which runs a SQL query to pull articles with the selected ID on the context object, then, using the articleData function, sets an id property on the context object that is then passed to the next callback in the chain, which is the articlesController.index.

  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This runs Article.findWhere which runs a SQL query to pull articles with the selected author and replaces the + characters with a space so that the author name will match the name in the database, then runs the callback function which is authorData, which sets an author property on the context object that is then passed to the next callback in the chain, which is the articlesController.index.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //This runs Article.findWhere which runs a SQL query to pull articles with the field of category and the value of the specific category name, then runs the callback function which is categoryData, which sets the articles property on the context object to the array of article(s) in that category.  The context object is then passed to the next callback in the chain, which is the articlesController.index.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //This method is the first callback in the home page route.  It checks to see if the Article.all array has the articles.  If it does, it sets the array to the articles property on the context object and then runs the callback function (next).  If the array is empty, it will run the Article.fetchAll function which pulls the data from the JSON and fills the Article.all array, then runs articleData which sets the Article.all array to the context object and then runs the callback (next).
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
