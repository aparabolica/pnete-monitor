module.exports = function(app) {

  app.filter('fromNow', [
    function() {
      return _.memoize(function(input) {
        return moment(input).utc().fromNow();
      });
    }
  ]);

  app.filter('formatDate', [
    function() {
      return _.memoize(function(input, format) {
        return moment(input).utc().format(format);
      });
    }
  ]);

}
