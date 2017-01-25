angular.module('users').controller('UsersController', UsersController);

function UsersController() {
	var vm = this;

	vm.users = [ {
		email: 'aaronarce02@gmail.com',
		firstname : 'Aaron',
		lastname : 'Arce'
	},
	{
		email: 'johnsmith@gmail.com',
		firstname : 'John',
		lastname : 'Smith'
	},
	{
		email: 'mrodgers@gmail.com',
		firstname : 'Michael',
		lastname : 'Rodgers'
	}];
}
