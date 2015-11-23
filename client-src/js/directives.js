module.exports = function(app) {

  app.directive('scrolledClass', [
    function() {
      return {
        restrict: 'A',
        scope: {
          sClass: '=',
          offset: '@',
          fromElement: '@'
        },
        link: function(scope, element, attrs) {
          var offset = parseInt(scope.offset);
          if(scope.fromElement) {
            offset += $(element).offset().top;
          }
          $(window).scroll(function() {
            if($(window).scrollTop() >= offset) {
              $(element).addClass(scope.sClass);
            } else {
              $(element).removeClass(scope.sClass);
            }
          });
        }
      }
    }
  ])

  app.directive('repliedPercent', [
    '$interpolate',
    '$timeout',
    function($interpolate, $timeout) {
      return {
        restrict: 'E',
        scope: {
          'ratio': '=',
          'label': '='
        },
        template: '<div class="replied-percent"><div class="replied-percent-complete"></div><p>{{text}}</p></div>',
        link: function(scope, element, attrs) {

          scope.percent = 0;

          scope.label = scope.label || '{{ratio.given}}/{{ratio.needed}} perguntas foram respondidas';

          scope.$watch('label', function(label) {
            scope.text = $interpolate(label)(scope);
          });

          var completeNode = element[0].getElementsByClassName('replied-percent-complete');

          angular.element(completeNode).css({'width': '0%'});
          scope.$watch('ratio', function(ratio) {
            if(ratio) {
              $timeout(function() {
                scope.percent = (ratio.given / ratio.needed) * 100;
                angular.element(completeNode).css({'width': scope.percent + '%'});
              }, 100);
              scope.text = $interpolate(scope.label)(scope);
            }
          });

        }
      }
    }
  ])

}
