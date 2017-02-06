angular.module("users").factory("usersService", usersService);

function usersService($http, $q) {
	var factory = {
		getAllUsers : getAllUsers,
		saveNewUser : saveNewUser,
		updateUser: updateUser
	};

	return factory;

	function getAllUsers() {
		var deferred = $q.defer();

		var req = {
			method : 'GET',
			url : '/get-all',
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		$http(req).success(function(data) {
			deferred.resolve(data);
		}).error(function(data) {
			deferred.reject(data);
		});

		return deferred.promise;
	}

	function saveNewUser(row) {
		var deferred = $q.defer();

		row.enabled = true;

		var req = {
			method : 'POST',
			url : '/create',
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

	function updateUser(row) {
		var deferred = $q.defer();
		
		row = {
				email : row.email,
				firstName : row.firstName,
				lastName: row.lastName,
				password: row.password
		};

		var req = {
			method : 'PUT',
			url : '/update',
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
