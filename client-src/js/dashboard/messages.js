module.exports = function(app) {

  app
  .config([
  	'$httpProvider',
  	function($httpProvider) {
  		$httpProvider.interceptors.push('messageInterceptor');
  	}
  ])

  .factory('messageInterceptor', [
  	'$q',
  	'MessageService',
  	function($q, Message) {
  		return {
  			responseError: function(rejection) {
  				if(rejection.status != 404 && rejection.data && rejection.data.error && rejection.data.error.message) {
            Message.add(rejection.data.error.message);
  				}
  				return $q.reject(rejection);
  			}
  		};
  	}
  ])

  .factory('MessageService', [
  	'$timeout',
  	function($timeout) {

  		var messages = [];
  		var enabled = true;

  		return {
  			get: function() {
  				return messages;
  			},
  			close: function(message) {
  				messages = messages.filter(function(m) { return m !== message; });
  			},
  			add: function(val, timeout) {

  				if(enabled) {

  					var self = this;

  					if(typeof val !== 'undefined') {

  						var message = val;

  						if(typeof message == 'string') {
  							message = {
  								text: message
  							};
  						}

  						messages.push(message);

  						if(timeout !== false) {
  							timeout = timeout ? timeout : 3000;
  							$timeout(function() {
  								self.close(message);
  							}, timeout);
  						}

  					}

  				}

  				return message;
  			},
  			message: function(val, timeout) {
  				this.add(val, timeout);
  			},
  			disable: function() {
  				enabled = false;
  			},
  			enable: function() {
  				enabled = true;
  			}
  		}

  	}
  ])

  .run([
  	'$rootScope',
  	'MessageService',
  	function($rootScope, Message) {

  		if(window.jQuery) {
  			jQuery(document).ajaxError(function(e, jqXHR) {
  				if(jqXHR.responseJSON.length) {
  					jQuery.each(jqXHR.responseJSON, function(i, res) {
  						if(res.message) {
  							$rootScope.$apply(function() {
  								Message.add(res.message);
  							});
  						}
  					});
  				}
  				if (jqXHR.status == 0) {
  					//alert("Element not found.");
  				} else {
  					//alert("Error: " + textStatus + ": " + errorThrown);
  				}
  			});
  		}
  	}
  ])

  .controller('MessageCtrl', [
  	'$scope',
  	'$sce',
  	'MessageService',
  	function($scope, $sce, MessageService) {

  		$scope.service = MessageService;

  		$scope.$watch('service.get()', function(messages) {
  			var $dialogs = document.querySelectorAll('.ngdialog');
  			if($dialogs.length) {
  				$scope.isDialog = true;
  			} else {
  				$scope.isDialog = false;
  			}
  			$scope.messages = messages;
  		});

  		$scope.getMessage = function(message) {
  			return $sce.trustAsHtml(message.text);
  		};

  		$scope.close = function(message) {
  			$scope.service.close(message);
  		};

  	}
  ]);

};
