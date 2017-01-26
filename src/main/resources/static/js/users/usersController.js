angular.module('users').controller('UsersController', UsersController);

function UsersController($scope, users, usersService, $http) {
	var vm = this;
	
	vm.addNewRow = addNewRow;
	
	var columnDefs = [
		{headerName: "", cellRenderer: buttonCellRendererFunc},
        {headerName: "Username", field: "email", editable: true},
        {headerName: "Password", field: "password", editable: true},
        {headerName: "First name", field: "firstName", editable: true},
        {headerName: "Last name", field: "lastName", editable: true},
        {headerName: "Address", field: "address", editable: true},
        {headerName: "Telephone", field: "telephone", editable: true}
    ];


	var rowData = users;

	
	vm.gridOptions = {
			columnDefs: columnDefs,
			rowData: rowData,
			angularCompileRows: true,
			rowHeight : 40
	};
	
	function buttonCellRendererFunc(params) {
        params.$scope.createUser = createUser;
        return '<button ng-click="createUser(data)" class="btn btn-default">Save</button>';
    }
	
	function createUser(row) {
		usersService.saveNewUser(row)
			.then(function(success) {
				console.log(success.message);
			}, function(error) {
				console.log("error: ");
				console.log(error);
			});
    }

	
	function addNewRow() {
		vm.gridOptions.api.insertItemsAtIndex(0, [{username: "", firstname: "", lastname: ""}]);
	}

}
