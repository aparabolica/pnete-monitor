function getPastelColor() {
  var r = (Math.round(Math.random()* 127) + 70).toString(16);
  var g = (Math.round(Math.random()* 127) + 70).toString(16);
  var b = (Math.round(Math.random()* 127) + 70).toString(16);
  return '#' + r + g + b;
}

module.exports = function(app) {

  app.controller('MainCtrl', [
    '$scope',
    function($scope) {

    }
  ]);

  app.controller('HomeCtrl', [
    '$scope',
    function($scope) {
      $scope.greeting = 'Hi';
    }
  ]);

  app.controller('IndicadorCtrl', [
    '$scope',
    function($scope) {
      var date = moment('2015-06-05')
      $scope.since = date.fromNow();
      $scope.date = date.format('LLLL');
      $scope.date_ = date.format('L');

      $scope.pastelColor = function() {
        return getPastelColor();
      }

      $scope.indicadores = [
        {
          category: 'Enfrentamento e Repressão',
          indicador: 'Quantidade de fiscais do trabalho para cada dez mil pessoas ocupadas',
          pergunta: 'Qual a quantidade de vagas de auditores fiscais do trabalho efetivamente preenchidas?',
          related: [18, 19],
          responses: [
            {
              responsible: 'Ministério do Trabalho e Emprego (Detrae/SIT)',
              slug: 'MTE DETRAE',
              means: 'Quantidade de fiscais: registros MTE. População ocupada: PNAD do IBGE.',
              response: '2008: 0,34 fiscais para cada 10 mil pessoas ocupadas (meta de ação judical do MPT é de pelo menos 1 fiscal: ver matéria da Repórter Brasil)'
            }
          ]
        },
        {
          category: 'Enfrentamento e Repressão',
          indicador: 'Quantidade de trabalhadores libertados',
          pergunta: 'Quantos trabalhadores foram libertados do trabalho escravo no ano passado?',
          related: [18,21,22],
          responses: [
            {
              responsible: 'Ministério do Trabalho e Emprego (Detrae/SIT)',
              slug: 'MTE DETRAE',
              means: 'COETE (ou SISACTE, se voltar a ser alimentado)',
              response: '2013: 2.758; 2012: 2.686; 2011: 2.491; 2010: 2.559'
            }
          ]
        },
        {
          category: 'Reinserção e prevenção',
          indicador: 'Existência de políticas de reinserção social de trabalhadores libertados e quantidade de trabalhadores atendidos pelas mesmas',
          pergunta: 'Seu órgão/instituição (ou, no caso das Coetraes: seu estado) possui alguma política, programa, projeto ou ação de reinserção social dos trabalhadores libertados do trabalho escravo, com ações específicas voltadas à geração de emprego e renda, reforma agrária, educação profissionalizante e/ou reintegração do trabalhador? Em caso positivo, como ela funciona e quantos trabalhadores já foram beneficiados?',
          related: [2, 32, 36, 37, 47],
          responses: [
            {
              responsible: 'Ministério do Trabalho e Emprego (Detrae/SIT)',
              slug: 'MTE DETRAE',
              means: 'Questionário na plataforma',
              response: 'Primeira Verificação com essa abrangência. Monitoramento 2010 apontou que ""ainda que a política não tenha sido implementada, há ações de reinserção pontuais levadas a cabo pela CPT (assentamento no Piauí), pelo CDVDH (3 cooperativas criadas), pela SRT de MT (cursos profissionalizantes""). Monitoramento 2012 apontou o Programa ""Qualificação - Ação Integrada"" do MTE (SRTE-MT), que entre 2009 a 2011 qualificou 302 trabalhadores egressos do trabalho escravo ou em situação de vulnerabilidade social, e citou o projeto ""Resgatando Cidadania"", do MPT. Sobre inscrição dos resgatados no CadUn e posterior benefício do Programa Bolsa Família, dados do monitoramento de 2010: ""Até o momento, o MTE enviou 5 listas com o nome dos cidadãos resgatados. A última foi enviada em dezembro de 2009. Do total de 19.599 cidadãos resgatados de situação análoga à escravidão repassada pelo MTE nessas 5 listas, 13.375 não foram identificados no Cadastro Único. Dos 6.224 identificados no Cadastro Único, 5.126 eram beneficiários do PBF. Dentre os restantes 1098, 775 possuíam renda per capita até R$ 140,00, 245 possuíam renda de R$ 140,00 per capita a ½ salário mínimo per capita e 78 acima de ½ salário mínimo per capita. Os dados demonstram que o total de cidadãos resgatados não identificados e identificados no Cadastro Único representa 68% e 32%, respectivamente, do total de cidadãos resgatados”.'
            }
          ]
        }
      ];

      $scope.indicador = $scope.indicadores[0];

    }
  ]);

  app.controller('EixoCtrl', [
    '$scope',
    function($scope) {

    }
  ]);

  app.controller('RepCtrl', [
    '$scope',
    function($scope) {

      $scope.rep = {
        name: 'Ministério do Trabalho e Emprego (Detrae/SIT)',
        slug: 'MTE DETRAE',
        ratio: {
          'questions': 50,
          'replied': 20
        }
      }

    }
  ]);

};
