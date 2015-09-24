var mongoose = require('mongoose'),
    crypto   = require('crypto');

var LinkSchema = new mongoose.Schema({
  visits: Number, // # of visits
  link: String, // http://localhost:3000/235423458
  title: String, // title of site
  code: String, // some hash: 235423458
  base_url: String, // localhost:3000
  url: String // http://www.cnn.com
});

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

LinkSchema.pre('save', function(next){
  var code = createSha(this.url);
  this.code = code;
  this.link = this.base_url + '/' + this.code;
  next();
});

module.exports = mongoose.model('Link', LinkSchema);
