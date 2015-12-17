angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, $auth, $ionicPopup, $ionicModal, $http, $window, StorageService){
    
    $scope.logInGuest = function(username, password) {
        if(username != "guest"){
            $ionicPopup.alert({
            title: 'Error',
            content: 'Username must be guest'
          });
        StorageService.add("Username Error: set to guest");
        } else if (password.length <= 5){
             
            $ionicPopup.alert({
            title: 'Error',
            content: 'Password must be longer than 5 characters'
          });  
                   StorageService.add("Password Error: shorter than 5 characters"); 
        } else if (password.length >= 5 || username == "guest"){
                        $ionicPopup.alert({
            title: 'Welcome' + ' ' + username,
            content: 'In order to keep this window closed on further login, you must log in to facebook'
          });
            $scope.closeLogin();
        }    
    };
    
    
    
    $scope.authenticate = function(provider) {
        console.log(provider.name);
    $auth.authenticate(provider)
        .then(function(result) {
        var fields = ['first_name', 'last_name'];
        var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
        $http.get(graphApiUrl).then(function(response) {
            $scope.name = response.data.first_name;
          $ionicPopup.alert({
            title: 'Success',
            content: 'Welcome ' + response.data.first_name + ' ' + response.data.last_name
          });
          $scope.modal.hide();
        });
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          })
        StorageService.add("Login Error: " + response.data.message);
        });
  };
    $scope.logout = function() {
    $auth.logout();
  };
    $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
    
    $ionicModal.fromTemplateUrl('templates/Facebook.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
    if(!$scope.isAuthenticated()){
        $scope.modal.show();
    }
  })
$scope.closeLogin = function() {
    $scope.modal.hide();
  };
    $scope.showModal = function() {
    $auth.logout();    
    $scope.modal.show();  
};
    

})
