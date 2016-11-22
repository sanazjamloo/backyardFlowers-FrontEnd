(function() {
  angular.module('BackyardApp')
    .controller('MainController', function($http, $state, $stateParams){


      var self      = this;
      var rootUrl   = 'http://localhost:3000'
      // var rootUrl = 'https://backyardflowers-api.herokuapp.com';
//====================================================
// keeping track of editing and creating states
      this.isCreating   = false;
      this.isEditing    = false;
      this.editedFlower = null;
      self.editFlower   = true;

      function startCreating() {
        this.isCreating = true;
        this.isEditing  = false;
      }

      function startEditing() {
        this.isCreating = false;
        this.isEditing  = true;
        console.log(this.editedFlower);
      }
      function setFlowerToEdit(flower){
        this.editedFlower = flower;
        // this.editFlower   = true;

        console.log('edited flower sucess :'+flower.id);
      }
      function reset(flower) {
        this.isCreating  = false;
        this.isEditing   = false;
      }
      // this.isCreating    = true;
      // this.isEditing     = true;
      // this.startCreating = true;
//=======================================================
//CRUD logic

  //User Sign up
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
            self.login(user);
          }
        })
        .then(function(response){
          $state.go('home', {url: '/home'});
        })
        .catch(function(err){
          console.log(err);
        })
      } // end createUser

      // User Log In through jwt
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
            console.log('it looks like this when login:'+response+'and the use is ' + self.id);
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
      // Delete a flower
      this.deleteFlower = function(user_id, newFlower) {
      console.log('user:', self.id, 'flower_id:', newFlower);
      console.log('flower deleted');
      var index = self.flowers.findIndex(function(element){  // find the index # of flower here
          return element.id === newFlower;
      })
      console.log('newFlower is ', newFlower);
      console.log('array[index] is ', self.flowers[index]);
      self.flowers.splice(index, 1);
      return $http({
        url: `${rootUrl}/users/${self.id}/flowers/${newFlower}`,
        method: 'DELETE'
      })
      .then(function(response) {
        console.log('when deleting response is : ' + response);
        $state.go('home', {url: '/home', user: response});
        return response;
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    this.editFlower  = function(flower){
      console.log('FLOWER ===> ', flower);
      console.log('in updateFlower code user:', self.id, 'flower', flower);
      return $http({
          url: `${rootUrl}/users/${self.id}/flowers/${flower.id}`,
          method: 'PUT',
          data: {flower: flower}
        })
        .then(function(response) {
            console.log('UPDATE RESPONSE ===> ', response);
            // console.log('NO ERROR check point:'+response);
            // console.log('NO ERROR  flowers are '+self.flowers);
           $state.go('home', {url: '/home', user: response});
           return response;
           {reload: true}
        })
        .catch(function(err) {
          console.log('There is an error at 200 and it is:'+err);
        })
    }

    // this.getFlowers = function(flowers){
    //   return $http({
    //     url: `${rootUrl}/users/${self.id}/flowers`,
    //     method: 'GET',
    //     data: flowers
    //   })
    // }
    // .then(function(response){
    //   self.currentUser.flowers = response.data.flowers;
    //   console.log(response);
    // })
    // .catch(function(error){
    //   console.log(error);
    // })

      // public methods
      this.startCreating = startCreating;
      this.startEditing    = startEditing;
      this.setFlowerToEdit = setFlowerToEdit;
      //this.editFlower      = editFlower;
      this.reset           = reset;

  });
})();
