// JavaScript Document
var myApp = angular.module('myApp', [
    'ui.router',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload',
    "ngMap",
    "internationalPhoneNumber",
    'ui.bootstrap',
    'ui.select',
    'ngAnimate',
    'toastr',
    'textAngular',
    'ngSanitize',
    'angular-flexslider',
    'ngMap',
    'toggle-switch',
    'cfp.hotkeys',
    'ui.sortable'
]);

myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider

        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/template.html",
            controller: 'DashboardCtrl',
        })

        .state('user', {
            url: "/#!/page/viewUser//",
            templateUrl: "views/template.html",
            controller: 'UserCtrl',
        })

        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        .state('page', {
            url: "/page/:id/{page:.*}/{keyword:.*}",
            templateUrl: "views/template.html",
            controller: 'PageJsonCtrl'
        })

        .state('loginapp', {
            url: "/login/:id",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        .state('country-list', {
            url: "/country-list/{page:.*}/{keyword:.*}",
            templateUrl: "views/template.html",
            controller: 'CountryCtrl',
            params: {
                page: "1",
                keyword: ""
            }
        })

        .state('createcountry', {
            url: "/country-create",
            templateUrl: "views/template.html",
            controller: 'CreateCountryCtrl'
        })
         .state('newsDetail', {
            templateUrl: "views/template.html",
            url: "/newsDetail/:id/{page:.*}/{keyword:.*}",
            controller: 'NewsDetailCtrl'
        })
          .state('commentdetail', {
            templateUrl: "views/template.html",
            url: "/commentdetail/:id/{page:.*}/{keyword:.*}",
            controller: 'CommentdetailCtrl'
        })
         .state('userViewCount', {
            url: "/userViewCount",
            templateUrl: "views/template.html",
            controller: 'UserViewCountrCtrl'
        })
          .state('viewUserCountDetail', {
            url: "/viewUserCountDetail/:userId",
            templateUrl: "views/template.html",
            controller: 'viewUserCountDetailCtrl'
        })
             .state('pollanswerview', {
            url: "/pollanswerview",
            templateUrl: "views/template.html",
            controller: 'pollanswerviewCtrl'
        })
            .state('pollDetail', {
            templateUrl: "views/template.html",
            url: "/pollDetail/:id",
            controller: 'pollDetailCtrl'
        })

        .state('editcountry', {
            url: "/country-edit/:id",
            templateUrl: "views/template.html",
            controller: 'EditCountryCtrl'
        })

        .state('schema-creator', {
            url: "/schema-creator",
            templateUrl: "views/template.html",
            controller: 'SchemaCreatorCtrl'
        })

        .state('excel-upload', {
            url: "/excel-upload/:model",
            templateUrl: "views/template.html",
            controller: 'ExcelUploadCtrl'
        })

        .state('jagz', {
            url: "/jagz",
            templateUrl: "views/jagz.html",
            controller: 'JagzCtrl'
        });

    // $urlRouterProvider.otherwise("/dashboard");
     $urlRouterProvider.otherwise("/page/viewUser//");
    
    $locationProvider.html5Mode(isproduction);
});

myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});