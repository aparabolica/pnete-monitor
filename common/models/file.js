module.exports = function(File) {

  var CONTAINERS_URL = '/api/v1/containers/';

  File.upload = function (ctx,doneUpload) {
    ctx.req.params.container = 'default';
    File.app.models.Container.upload(ctx.req,ctx.result,{},function (err,fileObj) {
      if (err) { doneUpload(err) }
      else {
        var fileInfo = fileObj.files.file[0];
        File.create({
          name: fileInfo.originalFilename,
          type: fileInfo.type,
          container: fileInfo.container,
          url: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name
        }, doneUpload);
      }
    });
  }

  File.remoteMethod(
    'upload',
    {
      description: 'Uploads a file',
      accepts: [
        { arg: 'ctx', type: 'object', http: { source:'context' } }
      ],
      returns: {
        arg: 'fileObject', type: 'object', root: true
      },
      http: {verb: 'post'}
    }
  )
}
