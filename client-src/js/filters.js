module.exports = function(app) {

  app.filter('parseUrl', [
    '$sce',
    function($sce) {
      var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
      return function (text) {
        return $sce.trustAsHtml(text.replace(urlPattern, '<a target="_blank" href="$&">$&</a>'));
      };
    }
  ]);

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

  app.filter('taskStatus', [
    function() {
      return _.memoize(function(input) {
        var str = '';
        switch(input) {
          case 'error':
            str = 'Erro';
            break;
          case 'pending':
            str = 'Pendente';
            break;
          case 'accepted':
            str = 'Envio aceito';
            break;
          case 'rejected':
            str = 'Envio rejeitado';
            break;
          case 'delivered':
            str = 'Entregue';
            break;
          case 'failed':
            str = 'Falhou';
            break;
          case 'opened':
            str = 'Entregue e lida';
            break;
          case 'click':
            str = 'Entregue, lida e clicada';
            break;
          case 'unsubscribed':
            str = 'Deixou de assinar';
            break;
          case 'complained':
            str = 'Reportado como spam';
            break;
          case 'store':
            str = 'Respondido';
            break;
        }
        return str;
      });
    }
  ])

}
