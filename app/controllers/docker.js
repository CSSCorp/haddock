var docker = require('docker.io')({socketPath: '/var/run/docker.sock'});

exports.i_all = function(req, res) {
  var options = {};
  
  docker.images.list(options, function(err, images) {
    if(err) {
      return res.jsonp({err: err.errors});
    } else {
      return res.jsonp(images);
    }
  });
};

exports.c_all = function(req, res) {
  var options = {};
  
  docker.containers.list(options, function(err, containers) {
    if(err) {
      return res.jsonp({err: err.errors});
    } else {
      return res.jsonp(containers);
    }
  });
};

