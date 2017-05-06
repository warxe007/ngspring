var columnDefs = [ {
	headerName : "",
	cellRenderer : buttonCellRendererFunc,
	width : 100,
	pinned : 'left'
}, 
{
	headerName : "Id",
	width: 80,
	field : "id",
	editable : false
}, 
{
	headerName : "Codigo de barras",
	width: 150,
	field : "barCode",
	editable : true
},
{
	headerName : "Nombre",
	field : "name",
	editable : true
},
{
	headerName : "Costo",
	width: 100,
	field : "entryCost",
	editable : true
}, 
{
	headerName : "Precio Venta",
	width: 100,
	field : "saleCost",
	editable : true
}, 
{
	headerName : "Cantidad",
	width: 100,
	field : "quantity",
	editable : true
},
{
	headerName: "Descripcion",
	width: 200,
	field: "description",
	editable: true
},
{
	headerName : "Unidad de medida",
	width: 130,
	field : "measurementUnit",
	editable : true
}
];

var constant = {
	gridOptions : {
		columnDefs : columnDefs,
		angularCompileRows : true,
		rowHeight : 40,
		singleClickEdit : true,
		animateRows: true,
		enableColResize: true
	},
	fields : [
		{
			name: 'Todos',
			value: 'all'
		},
		{
		   	name: 'Id',
		   	value: 'productId'
		}, {
			name: 'Codigo de Barras',
			value: 'barCode'
		}, {
			name: 'Nombre',
			value: 'name'
		}]
};

function buttonCellRendererFunc(params) {
	return '<button ng-if="data.newRow" ng-click="IC.cancelProductCreate(this.rowNode)" class="btn btn-default" style="float: right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><button ng-if="data.newRow" ng-click="IC.createProduct(data)" class="btn btn-default"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span></button></button><button ng-if="!data.newRow" ng-disabled="!data.dirty" ng-click="IC.editProduct(data)" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
}

angular.module('inventory').constant('storeInventoryConstants', constant);
