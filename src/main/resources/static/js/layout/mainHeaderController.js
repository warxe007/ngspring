angular.module('layout')
	.controller('HeaderController', HeaderController);

function HeaderController(loginService, $state, loggedUser) {
	var vm = this;
	
	vm.credentials = {},
	vm.loggedUser = loggedUser,
	vm.login = login,
	vm.logout = logout;
	
	function login() {
		
		vm.credentials = {username: vm.username, password: vm.password};
		
		loginService.login(vm.credentials)
        .then(function(success) {
        	if(success.authenticated) {
                $state.reload();
            }
        })
        .catch(function(error, status) {
            console.log(error);
        });
	}
	
	function logout() {
		loginService.logout().then(function(success){
			$state.reload();
		})
		.catch(function(error) {
			console.log(error);
		});
	}
}
