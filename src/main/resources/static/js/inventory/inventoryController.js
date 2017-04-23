angular
	.module('inventory')
	.controller('InventoryController', InventoryController);

function InventoryController(products, storeInventoryConstants, inventoryService) {
	var vm = this;
	
	vm.addNewRow = addNewRow,	
	vm.createProduct = createProduct,
	vm.cancelProductCreate = cancelProductCreate,
	vm.editProduct = editProduct,
	vm.gridOptions = storeInventoryConstants.gridOptions,
	vm.gridOptions.rowData = products;

	function addNewRow() {
		vm.gridOptions.api.insertItemsAtIndex(0, [ {newRow: true} ]);
		vm.gridOptions.api.setFocusedCell(2, 'barCode');
		vm.gridOptions.api.startEditingCell({
			rowIndex : 0,
			colKey : 'barCode'
		});
	}
	
	function createProduct(row) {
		inventoryService.saveNewProduct(row).then(function(success) {
			console.log(success.message);
		}, function(error) {
			console.log(error);
		});
	}
	
	function editProduct(row) {
		inventoryService.updateProduct(row).then(function(success) {
			console.log(success.message);
		}, function (error) {
			console.log(error);
		});
	}

	function cancelProductCreate(node) {
		vm.gridOptions.api.removeItems([ node ]);
	}
}
