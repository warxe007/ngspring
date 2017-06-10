angular.module('home')
	.controller('HomeController', HomeController);

function HomeController($http, toasterService) {
	var vm = this;

	vm.openToaster = openToaster;
	
	function openToaster() {
		toasterService.success('yeeeeeeeeeeeei!');
	}
	/*$http.get('/resource/').then(function(response) {
		vm.greeting = response.data;
	});*/
}