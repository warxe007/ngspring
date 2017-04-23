var columnDefs = [ {
	headerName : "",
	cellRenderer : buttonCellRendererFunc,
	width : 100,
	pinned : 'left'
}, 
{
	headerName : "Id del producto",
	field : "id",
	editable : false
}, 
{
	headerName : "Codigo de barras",
	field : "barCode",
	editable : true
},
{
	headerName : "Nombre",
	field : "name",
	editable : true
},
{
	headerName : "Unidad de medida",
	field : "measurementUnit",
	editable : true
}, 
{
	headerName : "Costo",
	field : "entryCost",
	editable : true
}, 
{
	headerName : "Precio Venta",
	field : "saleCost",
	editable : true
}, 
{
	headerName : "Cantidad",
	field : "quantity",
	editable : true
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

	return '<button ng-if="data.newRow" ng-click="IC.cancelProductCreate(this.rowNode)" class="btn btn-default" style="float: right"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><button ng-if="data.newRow" ng-click="IC.createProduct(data)" class="btn btn-default"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span></button></button><button ng-if="!data.newRow" ng-click="IC.editProduct(data)" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>';
}

angular.module('inventory').constant('storeInventoryConstants', constant);
