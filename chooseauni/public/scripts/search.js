var app = angular.module("searchApp", ["ngTable", "ngResource"]);

var SearchController = function($scope, $http, $resource, NgTableParams) {
    var data = [];
    $scope.resizeMode = "FixedResizer";
    var searchApi = $resource("/api/search");
    var searchCountApi = $resource("/api/search/count");
    $scope.searchResult = new NgTableParams({}, {
        getData: function(params) {
            return searchKisCourse();
        }
    });

    $scope.searchText = searchText;

    function searchText() {
        $scope.searchResult.reload();
    }

    function searchKisCourse() {
        var params = $scope.searchResult;
        var search_text = $("#chooseauni_search").val();
        var searchCountApiParams = {
            search: search_text
        };
        return searchCountApi.get(searchCountApiParams).$promise.then(function(totalCount) {
            params.total(totalCount.total);
            
            var page = params.page(),
            count = params.count(),
            sorting = params.sorting();
            var searchApiParams = {
                page: page,
                count: count,
                sorting: sorting,
                search: search_text
            };
    
            return searchApi.query(searchApiParams).$promise.then(function(data) {
                return data;
            });
        });
    }
};

SearchController.$inject = ["$scope", "$http", "$resource", "NgTableParams"];
app.controller("SearchController", SearchController);