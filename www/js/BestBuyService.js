angular.module('starter')
.factory('BestBuyService', function($http){
    var bestBuyAPI = 'http://api.bestbuy.com/v1';
    var key = 'sp9e3rv26ua2zch6s79ktekb';
    
return {
    search: function(term){
        return $http.get(bestBuyAPI + '/products((search=' + term + '))?show=name,sku,salePrice,image&format=json&apiKey=' + key);
    },
        getStores : function(){
            return;
        }
    };
});