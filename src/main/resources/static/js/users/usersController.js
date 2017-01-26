angular.module('users').controller('UsersController', UsersController);

function UsersController($scope, usersService) {
	var vm = this;
	
	vm.addNewRow = addNewRow;
	
	var columnDefs = [
		{headerName: "", cellRenderer: buttonCellRendererFunc},
        {headerName: "Username", field: "username", editable: true},
        {headerName: "Password", field: "password", editable: true},
        {headerName: "First name", field: "firstname", editable: true},
        {headerName: "Last name", field: "lastname", editable: true},
        {headerName: "Address", field: "address", editable: true},
        {headerName: "Telephone", field: "telephone", editable: true}
    ];


	var rowData = [
        {username: "aaronarce02@gmail.com", password: "password", firstname: "Aaron", lastname: "Arce Hernandez", address : "Addresssssssssssssss 1", telephone: "8155585226"},
        {username: "johnsmith@gmail.com", password: "password", firstname: "John", lastname: "Smith", address : "Addresssssssssssssss 2", telephone: "8155585226"},
        {username: "michaelrodgers@gmail.com", password: "password", firstname: "Michael", lastname: "Rodgers", address : "Addresssssssssssssss 3", telephone: "8155585226"}
    ];

	
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
	
	function createUser(data) {
		usersService.saveNewUser(data)
			.then(function(success) {
				console.log("success: ");
				console.log(success);
			}, function(error) {
				console.log("error: ");
				console.log(error);
			});
    }

	
	function addNewRow() {
		vm.gridOptions.api.insertItemsAtIndex(0, [{username: "", firstname: "", lastname: ""}]);
	}

}
