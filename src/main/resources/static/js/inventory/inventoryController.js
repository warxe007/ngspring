angular
	.module('inventory')
	.controller('InventoryController', InventoryController);

function InventoryController($scope, products, storeInventoryConstants, inventoryService, categories, toasterService) {
	var vm = this;
	
	function init() {
		vm.addNewRow = addNewRow;
		vm.createProduct = createProduct;
		vm.cancelProductCreate = cancelProductCreate;
		vm.editProduct = editProduct;
		vm.gridOptions = storeInventoryConstants.gridOptions;
		vm.gridOptions.rowData = products;
		vm.fields = storeInventoryConstants.fields;
		vm.categories = categories;
		vm.categories.unshift({
			id: 0,
			name: 'todas',
			description: 'todas'
		});
		vm.filterProducts = filterProducts;
		vm.searchProducts = searchProducts;
		vm.deleteMultipleProducts = deleteMultipleProducts;
		
		vm.gridOptions.onCellValueChanged = function(event) {
			if(!angular.isUndefined(event.oldValue) && event.newValue != event.oldValue) {
				var nodes = [event.node];
				
				event.data.dirty = true;
				vm.gridOptions.api.refreshRows(nodes);
			} else {
				event.data.dirty = false;
				vm.gridOptions.api.refreshRows(nodes);
			}
		}
		
		vm.gridOptions.onSelectionChanged = function(event) {
			$scope.$apply(function () {
				vm.selectedRows = vm.gridOptions.api.getSelectedRows();
			});
		}
	}

	function addNewRow() {
		vm.isBlankRowPresent = true;
		vm.gridOptions.api.insertItemsAtIndex(0, [ {newRow: true} ]);
		vm.gridOptions.api.setFocusedCell(0, 'barCode');
		vm.gridOptions.api.startEditingCell({
			rowIndex : 0,
			colKey : 'barCode'
		});
	}
	
	function createProduct(row) {
		inventoryService.saveNewProduct(row).then(function(success) {
			row.newRow = false;
			vm.isBlankRowPresent = false;
			toasterService.success(success.message);
		}, function(error) {
			toasterService.error(error);
		});
	}
	
	function editProduct(row) {
		inventoryService.updateProduct(row).then(function(success) {
			row.dirty = false;
			toasterService.success(success.message);
		}, function (error) {
			toasterService.error(error);
		});
	}

	function cancelProductCreate(node) {
		vm.isBlankRowPresent = false;
		vm.gridOptions.api.removeItems([ node ]);
	}
	
	function filterProducts() {
		vm.gridOptions.api.setQuickFilter(vm.searchProductValue);
	}
	
	function searchProducts() {
		console.log(vm.selectedFilter);
	}
	
	function deleteMultipleProducts() {
		angular.forEach(vm.gridOptions.api.getSelectedRows(), function(currentSelectedRow) {
			console.log(currentSelectedRow.name);
		});
	}
	
	init();
}
