module.exports = function(app) {

  app.directive('dateInput', [
    function() {
      return {
        restrict: 'A',
        scope: {
          'dateInput': '=',
          'inputFormat': '=',
          'outputFormat': '='
        },
        link: function(scope, element, attrs) {

          var date;

          if(scope.dateInput) {
            element.val(moment(scope.dateInput).utc().format(scope.inputFormat));
          }

          element.bind('propertychange keyup paste', function(ev) {
            var val = element.val();
            if(val) {
              date = moment(val, scope.inputFormat, true);
              if(date.isValid()) {
                scope.dateInput = date.utc().format(scope.outputFormat);
              } else {
                scope.dateInput = '';
              }
            } else {
              scope.dateInput = '';
            }
          });

        }
      }
    }
  ])

}
