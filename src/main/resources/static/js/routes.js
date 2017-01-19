function routes($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
	
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path();
        // If no path is defined then re route the user to the home page. For now, product list.
        if (path === "" || path === "/") {
            $injector.invoke(['$state', function ($state) {
                $state.transitionTo('app.home', {});
            }]);
            return "home";
        }
    });
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var path = $location.path();
             /*if (path !== "" && path !== "/") {
                 $injector.invoke(['$state', function ($state) {
                     $state.get('error').error = {status: '404'};
                     $state.go('error', {});
                 }]);
                 return "error";
             }*/
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
                    templateUrl: '/js/products/menu.html',
                    controller: 'MenuController',
                    controllerAs: 'MC'
                }
            }
        });/*
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
