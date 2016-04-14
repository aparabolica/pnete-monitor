module.exports = function(app) {

  app.directive('parseUrl', function () {
    var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
    return {
      restrict: 'A',
      require: 'ngModel',
      replace: true,
      scope: {
        props: '=parseUrl',
        ngModel: '=ngModel'
      },
      link: function compile(scope, element, attrs, controller) {
        scope.$watch('ngModel', function (value) {
          var html = value.replace(urlPattern, '<a target="' + scope.props.target + '" href="$&">$&</a>');
          element.html(html);
        });
      }
    };
  });

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
  ]);

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
  ]);

  app.directive('assessmentChart', [
    'Cycle',
    'Assessment',
    function(Cycle, Assessment) {
      return {
        restrict: 'E',
        scope: {
          'cycleId': '='
        },
        template: '<div class="assessment-chart"></div>',
        replace: true,
        link: function(scope, element, attrs) {

          if(!scope.cycleId) {
            Cycle.find({
              filter: {
                where: {
                  active: true
                }
              }
            }, function(cycle) {
              scope.cycleId = cycle.id;
              get(scope.cycleId);
            });
          } else {
            get(scope.cycleId);
          }

          function get(cycleId) {
            Assessment.find({
              filter: {
                where: {
                  cycleId: cycleId
                }
              }
            }, function(data) {
              chart(data);
            });
          }

          function chart(data) {

            var total = data.length;

            var types = {};

            data.forEach(function(item) {
              if(!types[item.status])
                types[item.status] = 1;
              else
                types[item.status]++;
            });

            var seriesData = [];

            for(var key in types) {

              var name = key;
              var color;

              if(key == 'incomplete') {
                name = 'Não cumprido';
                color = 'rgb(201, 73, 73)';
              } else if(key == 'partial') {
                name = 'Parcialmente cumprido';
                color =  'rgb(214, 221, 95)';
              } else if(key == 'complete') {
                name = 'Cumprido';
                color = 'rgb(66, 223, 77)';
              }

              seriesData.push({
                name: name,
                color: color,
                y: types[key] / total * 100
              });
            }

            $(element).highcharts({
              chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                backgroundColor: null
              },
              title: false,
              subtitle: false,
              credits: {
                enabled: false
              },
              tooltip: {
                  pointFormat: '<b>{point.percentage:.1f}%</b>'
              },
              plotOptions: {
                pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                      color: '{point.color}'
                    }
                  }
                }
              },
              series: [{
                data: seriesData
              }]
            })

          }

        }
      }
    }
  ]);

};
