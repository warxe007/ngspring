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
			deferred.resolve(data.users);
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
				firstName: row.firstName,
				lastName: row.lastName,
				email: row.email,
				role: row.role,
				address: row.address,
				telephone: row.telephone,
				gender: row.gender,
				enabled: row.enabled
		}

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
