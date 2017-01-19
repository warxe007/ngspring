angular.module('navigation')
	.controller('navigation', NavigationController);

function NavigationController(auth, $http, $location) {
	var vm = this;

	vm.credentials = {};

	vm.authenticated = function() {
        return auth.authenticated;
    }

	vm.login = function() {
        auth.authenticate(vm.credentials, function(authenticated) {
            if (authenticated) {
                console.log("Login succeeded")
                vm.error = false;
            } else {
                console.log("Login failed")
                vm.error = true;
            }
        })
    }

    vm.logout = function() {
      auth.clear();
    }
}