angular.module('inventory').factory('inventoryService', inventoryService);

function inventoryService($q, $http) {
	var factory = {
		getAllProducts : getAllProducts,
		saveNewProduct : saveNewProduct,
		updateProduct : updateProduct
	};

	return factory;

	function getAllProducts() {
		var deferred = $q.defer();

		var req = {
			method : 'GET',
			url : '/get-all-products',
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		$http(req).success(function(data) {
			deferred.resolve(data.products);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	function saveNewProduct(row) {
		var deferred = $q.defer();

		var req = {
			method : 'POST',
			url : '/create-product',
			headers : {
				'Content-Type' : undefined
			},
			params : row
		};

		$http(req).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	function updateProduct(row) {
		var deferred = $q.defer();
		
		var req = {
			method : 'PUT',
			url : '/update-product',
			headers : {
				'Content-Type' : undefined
			},
			params : row
		}

		$http(req).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}
}