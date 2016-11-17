(function() {
  angular
    .module('BackyardApp', ['ui.router'])
    .config(MainRouter);

    MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('blank', {
      url: '/',
      templateUrl: 'blank.html'  //this shows up at the beginning -- change it if applicable
    })
    .state('login', {
     url: '/login',
     templateUrl: 'login.html'
   })
   .state('signup', {
      url: '/signup',
      templateUrl: 'signup.html'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'home.html'
    });
    $urlRouterProvider.otherwise('/');

     $locationProvider.html5Mode({
       enabled: true,
       requireBase: false
     })
} //MainRouter

})() // end IIFE
