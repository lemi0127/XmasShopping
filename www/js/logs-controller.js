angular.module('starter.controllers', [])
.controller('LogsCtrl', function ($scope, LocalStorageService) {
    $scope.logs = LocalStorageService.getAll();
})