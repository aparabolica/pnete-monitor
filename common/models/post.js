module.exports = function(Post) {

  /*
   * Disable unwanted endpoints
   */
  Post.disableRemoteMethod("upsert", true);
  Post.disableRemoteMethod("updateAll", true);
  Post.disableRemoteMethod("createChangeStream", true);


};
