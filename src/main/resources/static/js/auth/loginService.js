angular.module('auth')
	.factory('loginService', loginService);

function loginService($http, $q, $cacheFactory) {
	
	var loginCache = $cacheFactory('login'), factory = {
		login : login,
		getLoggedUser : getLoggedUser,
		logout : logout
	};

	return factory;
	
	function login(credentials, $rootScope) {
		var deferred = $q.defer();
		
		var headers = credentials && credentials.username ? {
            authorization : "Basic "
                + btoa(credentials.username + ":"
                    + credentials.password)
          } : {};
          
          $http.get('login', {
              headers : headers
            }).success(function(success) {
            	deferred.resolve(success);
            }).error(function(error) {
            	deferred.reject(error);
            });
            
            return deferred.promise;
    }

    function logout() {
        var deferred = $q.defer();

        $http.post('logout').success(function(success) {
        	deferred.resolve(success);
        }).error(function(error) {
        	deferred.reject(error);
        });

        return deferred.promise;
    }

    function getLoggedUser() {
		var deferred = $q.defer();
		
		$http.get('user').success(function(success) {
			processUserProfileResponse(success);
			deferred.resolve(success);
		}).error(function(error) {
			deferred.reject(error);
		});
		
		return deferred.promise;
    }

    function processUserProfileResponse(userProfile) {
    	userProfile.isAnonymous = _.findWhere(userProfile.authorities, {authority: 'ROLE_ANONYMOUS'}) ? true: false;
        userProfile.isSuperAdmin = _.findWhere(userProfile.authorities, {authority: 'ROLE_SUPER_ADMIN'}) ? true : false;
        userProfile.isAdmin = _.findWhere(userProfile.authorities, {authority: 'ROLE_ADMIN'}) ? true : false;
        userProfile.isRegUser = _.findWhere(userProfile.authorities, {authority: 'ROLE_USER'}) ? true : false;
    }
}
