angular.module("users").factory("usersService", usersService);

function usersService($http, $q) {
	var factory = {
		getAllUsers : getAllUsers,
		saveNewUser : saveNewUser
	};

	return factory;

	function saveNewUser(row) {
		var deferred = $q.defer();

		var user = {
			email : row.email,
			firstName : row.firstName,
			lastName : row.lastName,
			password : row.password,
			address: row.address,
			telephone: row.telephone,
			enabled : true
		};

		var req = {
			method : 'POST',
			url : '/create',
			headers : {
				'Content-Type' : undefined
			},
			params : user
		};

		$http(req).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		/*
		 * $http(req).then(function(data) { console.log(data); }, function(data) {
		 * console.log(data); });
		 */

		return deferred.promise;
	}

	function getAllUsers() {
		var deferred = $q.defer();

		var req = {
			method : 'GET',
			url : '/get-all',
			headers : {
				'Content-Type' : undefined
			}
		};

		$http(req).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}
}
