angular.module('layout')
	.controller('LeftSideNavController', LeftSideNavController);

function LeftSideNavController(loggedUser) {
	var vm = this;
	
	vm.loggedUser = loggedUser;
}
