var mongoose = require('mongoose'),
    Image = mongoose.model('Image'),
    _ = require('underscore');

exports.image = function(req, res, next, id) {
  Image.load(id, function(err, image){
    if(err) return next(err);
    if(!image) return next(new Error('Failed to load image '+ id));
    req.image = image;
    next();
  });
};


exports.all = function(req, res) {
  Image.find(function(err, images) {
    if(err) {
      return res.jsonp({err: err.errors});
    } else {
      return res.jsonp(images);
    }
  });
};

exports.show = function(req, res) {
  return res.jsonp(req.image);
};

exports.create = function(req, res) {
  var image = new Image(req.body);
  
  image.save(function(err) {
    if(err) {
      return res.jsonp({err: err.errors});
    } else {
      return res.jsonp(image);
    }
  });
};

exports.update = function(req, res) {
  var image = req.image;
  
  image = _.extend(image, req.body);
  image.save(function(err) {
    if(err) {
      return res.jsonp({err: err.errors});
    } else {
      return res.jsonp(image);
    }
  });
};

exports.remove = function(req, res) {
  var image = req.image;
  
  image.remove(function(err) {
    if(err) {
      return res.jsonp({err: err.errors});
    } else {
      return res.jsonp({status: 200, message: "Image deleted successfully."});
    }
  });
};
