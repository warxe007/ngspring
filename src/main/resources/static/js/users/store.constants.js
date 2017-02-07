var columnDefs = [ {
	headerName : "",
	cellRenderer : buttonCellRendererFunc,
	width : 100,
	pinned : 'left'
}, 
{
	headerName : "Username",
	field : "email",
	editable : true
}, 
{
	headerName : "Password",
	field : "password",
	editable : true
},
{
	headerName : "Role",
	field : "role",
	editable : true,
	cellEditor : "select",
	cellEditorParams : {
		values : [ 'ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER' ]
	}
},
{
	headerName : "First name",
	field : "firstName",
	editable : true
}, 
{
	headerName : "Last name",
	field : "lastName",
	editable : true
}, 
{
	headerName : "Address",
	field : "address",
	editable : true
}, 
{
	headerName : "Telephone",
	field : "telephone",
	editable : true
}, 
{
	headerName : "Gender",
	field : "gender",
	editable : true,
	cellEditor : "select",
	cellEditorParams : {
		values : [ 'Male', 'Female' ]
	}
} 
]

var constant = {
	gridOptions : {
		columnDefs : columnDefs,
		angularCompileRows : true,
		rowHeight : 40,
		singleClickEdit : true
	}
};

function buttonCellRendererFunc(params) {

	return '<button ng-if="data.newRow" ng-click="UC.cancelUserCreate(this.rowNode)" class="btn btn-default" style="float: right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><button ng-if="data.newRow" ng-click="UC.createUser(data)" class="btn btn-default"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span></button></button><button ng-if="!data.newRow" ng-click="UC.editUser(data)" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
}

angular.module('users').constant('storeConstants', constant);