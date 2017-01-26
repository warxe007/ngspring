angular.module("users")
	.factory("usersService", usersService);

function usersService($http, $q) {
	var factory = {
			saveNewUser: saveNewUser
	};
	
	return factory;
	
	function saveNewUser(row) {
		var deferred = $q.defer();
		
		$http.post('/create', {row}).
			success(function(data) {
				deferred.resolve(data);
			}).
			error(function(data){
				console.log(data);
				deferred.reject(data);
			});
		
		return deferred.promise;
	}
}
