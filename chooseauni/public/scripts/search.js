var app = angular.module("searchApp", ["ngTable"]);
var SearchController = function($scope, $http, NgTableParams) {
    var data = [];
    $scope.resizeMode = "FixedResizer";
    $scope.searchResult = new NgTableParams({}, { dataset: [] });
    $http({
        method: 'GET',
        url: '/api/search'
    }).then(function success(response) {
        data = response.data;
        if (!data.length) data = [data];
        $scope.searchResult = new NgTableParams({}, { dataset: data });
    }, function error(response) {});
};

SearchController.$inject = ['$scope', '$http', 'NgTableParams'];
app.controller('SearchController', SearchController);