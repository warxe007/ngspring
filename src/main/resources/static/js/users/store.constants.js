var columnDefs = [ {
	headerName : "",
	cellRenderer : buttonCellRendererFunc,
	width : 100,
	pinned : 'left'
}, {
	headerName : "Username",
	field : "email",
	editable : true
}, {
	headerName : "Password",
	field : "password",
	editable : true
}, {
	headerName : "First name",
	field : "firstName",
	editable : true
}, {
	headerName : "Last name",
	field : "lastName",
	editable : true
}, {
	headerName : "Address",
	field : "address",
	editable : true
}, {
	headerName : "Telephone",
	field : "telephone",
	editable : true
} ]

var constant = {
	gridOptions : {
		columnDefs : columnDefs,
		angularCompileRows : true,
		rowHeight : 40,
		singleClickEdit : true
	}
};

function buttonCellRendererFunc(params) {

	return '<button ng-if="data.newRow" ng-click="UC.cancelUserCreate(this.rowNode)" class="btn btn-default" style="float: right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><button ng-if="data.newRow" ng-click="UC.createUser(data)" class="btn btn-default"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span></button></button><button ng-if="!data.newRow" ng-click="UC.editUser(this.rowNode)" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
}

angular.module('users').constant('storeConstants', constant);