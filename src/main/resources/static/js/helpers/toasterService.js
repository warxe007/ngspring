angular
	.module('ngspring')
	.factory('toasterService', toasterService);

function toasterService(toaster) {
	var factory = {
		success: success,
		error: error,
		warning: warning,
		info: info
	};
	
	return factory;
	
	function success(text) {
		toaster.pop({type: 'success', body: text, timeout: 3000, showCloseButton: false});
	}
	
	function error(text) {
		toaster.pop({type: 'error', body: text, showCloseButton: true});
	}
	
	function warning(text) {
		toaster.pop({type: 'warning', body: text, showCloseButton: true});
	}
	
	function info(text) {
		toaster.pop({type: 'info', body: text, showCloseButton: true});
	}
	
}
