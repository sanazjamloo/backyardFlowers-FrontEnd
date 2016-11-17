(function() {
  angular
    .modular('BackyardApp', ['ui.router'])
    .config(MainRouter);

    MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'index.html'
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
    })
    $urlRouterProvider.otherwise('/');

     $locationProvider.html5Mode({
       enabled: true,
       requireBase: false
     })
} //MainRouter

})() //IIFE
