angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $log, BestBuyService){
    $scope.data = {
        search : ''
    }
    
    $scope.search = function(term){
        if(term){
            BestBuyService.search(term)
            .success(function(data){
                $scope.products = data.products;
                $log.info(data);
            })
            .error(function(error){
                $log.error('Best Buy API Search Error!');
            });
        } else {
            $log.error('Search Term is empty!');
        }
    }
})

.controller('StoresCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('LogsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
