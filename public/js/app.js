(function() {
  angular.module('BackyardApp')
    .controller('MainController', function($http, $state, $stateParams){



      var self = this;
      var rootUrl = 'http://localhost:3000'
      // Or var rootUrl = 'https://backyard-flowers-back-end.herokuapp.com'

      self.currentUser = JSON.parse(localStorage.getItem('user'));
      self.newPassword = {};
      //this method will hit the create route in the rails api and will create a new user
      this.createUser = function(user) {
        return $http({
          url: `${rootUrl}/users`,
          method: 'POST',
          data: {user: user}
        })
        .then(function(response){
          if (response.data.status === 200) {
            console.log('success');
            self.success = true;
          }
        })
        .then(function(response){
          $state.go('home', {url: '/home'});
        })
        .catch(function(err){
          console.log(err);
        })
      } // end createUser

      // this method will hit the rails api for the login route and login the user with jwt
      this.login = function(user){
        return $http({
          url: `${rootUrl}/users/login`,
          method: 'POST',
          data: {user: user}
        })
        .then(function(response){
          self.currentUser = response.data.user
          self.id = response.data.user.id
          localStorage.setItem('token', JSON.stringify(response.data.token))
          localStorage.setItem('user', JSON.stringify(response.data.user));
          $state.go('home', {url: '/home', user: response})
        })
        .catch(function(error){
          console.log('Error', error);
        })
      } // end Login

      // this method will hit the rails api for the log out route and will log out the user
        this.logout = function(user){
        localStorage.removeItem('user');
        localStorage.removeItem('token')
        $state.go('index', {url: '/'})
      } // end this.logout



















  });

})()
