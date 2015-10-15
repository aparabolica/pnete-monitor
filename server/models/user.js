var crypto = require('crypto');

module.exports = function(User) {

  User.beforeRemote('create', function(ctx, modelInstance, next){
    // set a random password until user confirmation
    ctx.req.body.password = crypto.randomBytes(20).toString('hex');
    next();
  });
};
