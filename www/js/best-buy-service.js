angular.module('starter.services', [])
.factory('BestBuyService', function($http){
    var bestBuyAPI = 'http://api.bestbuy.com/v1';
    var key = 'sp9e3rv26ua2zch6s79ktekb';
    
return {
    search: function(term){
        return $http.get(bestBuyAPI + '/products((search=' + term + '))?show=name,sku,salePrice,image&format=json&apiKey=' + key);
    },
        getStores : function(lat, long){
            return $http.get(bestBuyAPI + '/stores(area(' + lat + ',' + long + ',100000))?format=json&apiKey=' + key + '&show=longName,City,address,phone,hours');
        },
        getStoresCity : function(store){
         return $http.get(bestBuyAPI +  '/stores(city=' + store + ')?format=json&apiKey=' + key);
        }
    };
});

