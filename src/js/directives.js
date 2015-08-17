module.exports = function(app) {

  app.directive('repliedPercent', [
    '$interpolate',
    function($interpolate) {
      return {
        restrict: 'E',
        scope: {
          'ratio': '=',
          'label': '='
        },
        template: '<div class="replied-percent"><div class="replied-percent-complete"></div><p>{{text}}</p></div>',
        link: function(scope, element, attrs) {

          scope.percent = 0;

          scope.label = scope.label || '{{percent.toFixed()}}% das perguntas foram respondidas';

          scope.$watch('label', function(label) {
            scope.text = $interpolate(label)(scope);
          });

          var completeNode = element[0].getElementsByClassName('replied-percent-complete');

          scope.$watch('ratio', function(ratio) {
            scope.percent = (ratio.replied / ratio.questions) * 100;
            angular.element(completeNode).css({'width': scope.percent + '%'});
            scope.text = $interpolate(scope.label)(scope);
          });

        }
      }
    }
  ])

}
