var articles = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toAuthors = function () {
  var $source = $('#author-template').html();
  var template = Handlebars.compile($source);
  return template(this);

};

Article.prototype.toCategories = function () {
  var $source = $('#category-template').html();
  var template = Handlebars.compile($source);
  return template(this);

};

Article.prototype.toHtml = function() {
  var $source = $('#article-template').html();
  var template = Handlebars.compile($source);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  return template(this);
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});

articles.forEach(function(a){
  $('#author-filter').append(a.toAuthors());
});

articles.forEach(function(a){
  $('#category-filter').append(a.toCategories());
});
