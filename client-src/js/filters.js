module.exports = function(app) {

  app.filter('parseUrl', [
    function() {

      var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;

      return function(text) {
        if(text) {
          text = text.replace(urlPattern, '<a target="_blank" href="$&">$&</a>');
        }
        return text;
      };
    }
  ]);

  app.filter('autop', [
    function() {
      return function(input) {
        if(input) {
          input = '<p>' + input.replace(/\n([ \t]*\n)+/g, '</p><p>').replace(/\n/g, '<br />') + '</p>';
        }
        return input;
      }
    }
  ]);

  app.filter('trustHtml', [
    '$sce',
    function($sce) {
      return function(input) {
        if(input)
          return $sce.trustAsHtml(input);
        else
          return input;
      }
    }
  ])

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
