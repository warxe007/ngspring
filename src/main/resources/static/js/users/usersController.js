angular.module('users').controller('UsersController', UsersController);

function UsersController($scope, users, usersService, storeConstants) {
	var vm = this;

	vm.addNewRow = addNewRow,	
	vm.createUser = createUser,
	vm.cancelUserCreate = cancelUserCreate,
	vm.editUser = editUser,
	vm.gridOptions = storeConstants.gridOptions,
	vm.gridOptions.rowData = users;
	
	function addNewRow() {
		vm.gridOptions.api.insertItemsAtIndex(0, [ {newRow: true} ]);
		vm.gridOptions.api.setFocusedCell(0, 'email');
		vm.gridOptions.api.startEditingCell({
			rowIndex : 0,
			colKey : 'email'
		});
	}

	function createUser(row) {
		usersService.saveNewUser(row).then(function(success) {
			console.log(success.message);
		}, function(error) {
			console.log(error);
		});
	}
	
	function editUser(row) {
		usersService.updateUser(row).then(function(success) {
			console.log(success.message);
		}, function (error) {
			console.log(error);
		});
	}

	function cancelUserCreate(node) {
		vm.gridOptions.api.removeItems([ node ]);
	}
}
