(function() {
  angular.module('BackyardApp')
    .controller('MainController', function($http, $state, $stateParams){



      var self = this;
      var rootUrl = 'http://localhost:3000'
      // Or var rootUrl = 'https://backyard-flowers-back-end.herokuapp.com'

      this.isCreating = true;
      this.isEditing  = true;
      this.startCreating = true;

      self.currentUser = JSON.parse(localStorage.getItem('user'));
      self.newPassword = {};
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

      // Log in through jwt
      this.login = function(user){
        return $http({
          url: `${rootUrl}/users/login`,
          method: 'POST',
          data: {user: user}
        })
        .then(function(response){
          console.log(response, 'login');
          self.currentUser = response.data.user
          self.id = response.data.user.id
          localStorage.setItem('token', JSON.stringify(response.data.token))
          localStorage.setItem('user', JSON.stringify(response.data.user));
          $state.go('home', {url: '/home', user: response})
        })
          .then(function(response) {
            return $http({
              url: `${rootUrl}/users/${self.id}/flowers`,
              method: 'GET'
            })
          })
          .then(function(response) {
            console.log(response);
            self.flowers = response.data.flowers;
          })
        .catch(function(error){
          console.log('Error', error);
        })
      } // end Login

      // Log out
        this.logout = function(user){
        localStorage.removeItem('user');
        localStorage.removeItem('token')
        $state.go('blank', {url: '/'})
      } // end logout

      //add a new flower to a user
      this.addFlower = function(newFlower, user_id) {
        console.log('add a flower');
        return $http({
          url: `${rootUrl}/users/${self.id}/flowers`,
          method: 'POST',
          data: {flower: newFlower}
        })
        .then(function(response){
          console.log('response');
          console.log('newFlower', newFlower);
          self.flowers.push(newFlower);
          self.newFlower = '';
        })
        .catch(function(err){
          console.log(err);
        })
      }


















  });

})()
