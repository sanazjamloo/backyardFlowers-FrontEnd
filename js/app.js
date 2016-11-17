(function() {
  angular
    .module('BackyardApp')
    .controller('MainController', function($http, $state) {
      var self = this;
      var rootUrl = 'http://localhost:3000'
      // Or var rootUrl = 'https://backyard-flowers-back-end.herokuapp.com'

// USER FUNCTIONS

      this.signup = function(user) {
        console.log(user, 'user');
        self.signed = user;
        return $http({
          url: `${rootUrl}/users`,
          method: 'POST',
          data: {user : user}
        })
        .then(function(response) {
          console.log(response);
          if (response.data.status === 200) {
            self.success = true;
            self.login(self.signed);
          } else {
            console.log(response)
            if (response.data.user.email_address) {
            failAlert('Registration failed. Email ' + response.data.user.email_address[0]);
          } else if (response.data.user.username) {
            failAlert('Registration failed. Username '+ response.data.user.username[0]);
          }
          }
        })
        .catch(function(err) {
          console.log(err);
        })
      }


 });
})()
