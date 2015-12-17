angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPopup, $auth) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    $scope.authenticate = function (provider) {
        $auth.authenticate(provider).then(function () {
                $ionicPopup.alert({
                    title: 'Success',
                    content: 'You have logged in successfully'
                });
            })
            .catch(function (response) {
                $ionicPopup.alert({
                    title: 'error',
                    content: response.data ? response.data || response.data.message : response
                });
            });
    };

    $scope.isAuthenticated = function () {
        return $auth.isAuthenticated();
    };

    $scope.logout = function () {
        return $auth.logout();
    };

})