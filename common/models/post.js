var json2csv = require('json2csv');
var modelConfig = require('./post.json')
var properties = Object.keys(modelConfig.properties);

module.exports = function(Post) {

  /*
   * Disable unwanted endpoints
   */
  Post.disableRemoteMethod("upsert", true);
  Post.disableRemoteMethod("updateAll", true);
  Post.disableRemoteMethod("createChangeStream", true);

  Post.export = function(filter, res, doneExport) {
    Post.find(filter, function(err, results){
      json2csv({ data: results, fields: properties }, function(err, csv){
        res.attachment('posts.csv');
        res.send(csv);
      });
    });
  }

  Post.remoteMethod(
    'export',
    {
      http: { verb: 'get' },
      accepts: [
        {arg: 'filter', type: 'object'},
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
      ],
      returns: {arg: 'data', root: true}
    }
  )


};
