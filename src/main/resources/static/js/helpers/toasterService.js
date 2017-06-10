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
		toaster.pop('success', text);
	}
	
	function error(text) {
		toaster.pop('success', text);
	}
	
	function warning(text) {
		toaster.pop('warning', text);
	}
	
	function info(text) {
		toaster.pop('info', text);
	}
	
}
