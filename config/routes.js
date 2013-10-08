
var async = require('async')

module.exports = function (app, passport, auth) {

  // user routes
  var users = require('../app/controllers/users')
  var images = require('../app/controllers/images');
  var docker = require('../app/controllers/docker');
  
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/signout', users.signout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/me', users.me)
  app.get('/users/:userId', users.show)
  
  app.get('/images', images.all);
  app.get('/images/:imageId', images.show);
  app.post('/images', images.create);
  app.put('/images/:imageId', images.update);
  app.del('/images/:imageId', images.remove);
  
  //Admin operations
  app.get('/docker/images', docker.i_all);
  app.get('/docker/containers', docker.c_all);
  
 // app.post('/docker', docker.create);
  
  app.param('imageId', images.image);
  app.param('userId', users.user)
  
  // home route
  var index = require('../app/controllers/index')
  app.get('/', index.render)

}
