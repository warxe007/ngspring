angular.module('home')
	.controller('HomeController', HomeController);

function HomeController($http) {
	var vm = this;

	/*$http.get('/resource/').then(function(response) {
		vm.greeting = response.data;
	});*/
}