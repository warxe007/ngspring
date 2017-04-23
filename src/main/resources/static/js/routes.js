function routes($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
	
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path();
        // If no path is defined then re route the user to the home page.
        if (path === "" || path === "/") {
            $injector.invoke(['$state', function ($state) {
                $state.transitionTo('app.home', {});
            }]);
            return "home";
        }
    });
    $stateProvider
        .state('app', {
            abstract:true,
            url: '/',
            resolve: {
            	loggedUser: function(loginService) {
                    return loginService.getLoggedUser();
                }
            },
            views: {
                'header': {
                    templateUrl: '/js/layout/header.html',
                    controller: 'HeaderController',
                    controllerAs: 'HC'
                },
                'left-nav': {
                	templateUrl: '/js/layout/leftSideNavigationBar.html',
                    controller: 'LeftSideNavController',
                    controllerAs: 'LSC'
                },
                'content': {
                    templateUrl: '/js/home/home.html'
                },
                'footer': {
                    templateUrl: '/js/layout/footer.html',
                    controller: 'FooterController',
                    controllerAs: 'FC'
                }
            }
        })
        .state('app.home', {
            url: 'home',
            views: {
                'content@': {
                    templateUrl: '/js/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'HOC'
                }
            }
        })
        .state('app.menu', {
            url: 'menu',
            resolve: {
                /*menuResult : function (menuService) {
                    return menuService.getMenu();
                }*/
            },
            views: {
                'content@': {
                    templateUrl: '/js/menu/menu.html',
                    controller: 'MenuController',
                    controllerAs: 'MC'
                }
            }
        })
        .state('app.principal', {
            url: 'principal',
            views: {
                'content@': {
                    templateUrl: '/js/principal/principal.html',
                    controller: 'PrincipalController',
                    controllerAs: 'PC'
                }
            }
        })
        .state('app.inventory', {
        	url: 'inventory',
        	views: {
        		'content@': {
        			templateUrl: '/js/inventory/inventory.html',
        			controller: 'InventoryController',
        			controllerAs: 'IC'
        		}
        	}
        })
        .state('app.users', {
            url: 'manage-users',
            resolve: {
                users : function (usersService) {
                    return usersService.getAllUsers();
                }
            },
            views: {
                'content@': {
                    templateUrl: '/js/users/users.html',
                    controller: 'UsersController',
                    controllerAs: 'UC'
                }
            }
        });
        /*
        .state('app.productList', {
            url: 'manage-products',
            resolve: {
                productResult : function (productService) {
                    return productService.getProducts();
                }
            },
            views: {
                'content@': {
                    templateUrl: '/ngstore/products/productList.html',
                    controller: 'ProductListController',
                    controllerAs: 'PL'
                }
            }
        })
        .state('app.error', {
            url: 'error',
            views: {
                'content': {
                    templateUrl: '/ngstore/layout/error.html',
                    controller: 'ErrorController',
                    controllerAs: 'EC'
                }
            }
        });*/

}

// Configure the app with the routes
angular
    .module('ngspring')
    .config(routes);
