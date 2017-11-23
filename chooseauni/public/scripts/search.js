var app = angular.module("searchApp", ["ngResource", "ui.grid", "ui.grid.resizeColumns", "ui.grid.pagination"]);

var SearchController = function($scope, $http, $resource, uiGridConstants) {
    var searchApi = $resource("/api/search");
    var searchCountApi = $resource("/api/search/count");
    var searchApiParams = {
        page: 1,
        count: 10,
        sorting: {},
        search: "",
        filters: ""
    }
    var searchCountApiParams = {
        search: "",
        filters: ""
    };
    $scope.search_text = "";
    $scope.searchGrid = {
        enableSorting: true,
        useExternalSorting: true,
        enableFiltering: true,
        useExternalFiltering: true,
        useExternalPagination: true,
        fastWatch: true,
        paginationPageSizes: [10, 25, 50, 100],
        paginationPageSize: 10,
        columnDefs: [
            { name: "Uni/Course", field: "uniName", width: 200 },
            { name: "Course", field: "courseName", width: 200 },
            { name: "UCAS Code", field: "courseCode", width: 100 },
            { name: "Qual", field: "courseQualification", width: 100 },
            { name: "Years", field: "courseDuration", width: 100 },
            {
                name: "Mode", field: "courseStudyMode", width: 100,
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: [
                        { value: "Full Time", label: "Full Time" }, 
                        { value: "Part Time", label: "Part Time" }, 
                        { value: "Full or Part Time", label: "Full or Part Time" }
                    ]
                }
            },
            { name: "Typical Offer", field: "courseTypialOffer", width: 100 },
            {
                name: "Study Abroad", field: "courseStudyAbroad", width: 100,
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: [
                        { value: "Year Abroad: Optional", label: "Year Abroad: Optional" },
                        { value: "Year Abroad: Compulsory", label: "Year Abroad: Compulsory" }
                    ]
                }
            },
            {
                name: "Work Placement", field: "courseSandwich", width: 100,
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: [
                        { value: "Sandwich: Optional", label: "Sandwich: Optional" },
                        { value: "Sandwich: Compulsory", label: "Sandwich: Compulsory" }
                    ]
                }
            },
            { name: "UK Uni Ranking", field: "uniNationalRanking", enableSorting: true, width: 100 },
            { name: "World Uni Ranking", field: "uniWorldRanking", enableSorting: true, width: 100 },
            { name: "Group", field: "uniGroup", width: 100 },
            { name: "Exam%", field: "courseExams", enableSorting: true, width: 100 },
            { name: "CourseWork%", field: "courseCoursework", enableSorting: true, width: 100 },
            { name: "Contact%", field: "courseContact", enableSorting: true, width: 100 },
            { name: "Success", field: "courseSuccessScore", enableSorting: true, width: 100 },
            {
                name: "Satisfaction", field: "courseSatisfactionLevel", enableSorting: true, width: 150,
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: [
                        { value: "Satisfaction: Very High", label: "Satisfaction: Very High" },
                        { value: "Satisfaction: High", label: "Satisfaction: High" },
                        { value: "Satisfaction: Medium", label: "Satisfaction: Medium" },
                        { value: "Satisfaction: Low", label: "Satisfaction: Low" },
                        { value: "Satisfaction: Very Low", label: "Satisfaction: Very Low" }
                    ]
                }
            },
            {
                name: "Entry Standards", field: "courseEntryStandardsLevel", enableSorting: true, width: 180,
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: [
                        { value: "Entry Standard: Very High", label: "Entry Standard: Very High" },
                        { value: "Entry Standard: High", label: "Entry Standard: High" },
                        { value: "Entry Standard: Medium", label: "Entry Standard: Medium" },
                        { value: "Entry Standard: Low", label: "Entry Standard: Low" },
                        { value : "Entry Standard: Very Low", label: "Entry Standard: Very Low" }
                    ]
                }
            },
            { name: "CAU Rating", field: "courseCauRating", width: 100 }
        ],
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                searchApiParams.page = newPage;
                searchApiParams.count = pageSize;
                $scope.searchKisCourse();
            });
            gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                if (sortColumns != 0) {
                    var field = sortColumns[0].field;
                    var direction = sortColumns[0].sort.direction;
                    var sorting = new Object();
                    sorting[field] = direction;
                    searchApiParams.sorting = sorting;
                    $scope.searchKisCourse();
                }
            });
            gridApi.core.on.filterChanged($scope, function () {
                var grid = this.grid;
                var filters = [];
                for (var i = 0; i < grid.columns.length; i ++) {
                    if (grid.columns[i].filters[0].term) {
                        var filterObj = new Object();
                        var field = grid.columns[i].field;
                        var filter = grid.columns[i].filters[0].term;
                        filterObj[field] = filter;
                        filters.push(filterObj);
                    }
                }
                searchApiParams.filters = JSON.stringify(filters);
                searchCountApiParams.filters = JSON.stringify(filters);
                $scope.searchKisCourse();
            });
        }
    };

    $scope.searchKisCourse = function() {
        searchApiParams.search = $scope.search_text;
        searchApi.query(searchApiParams).$promise.then(function(data) {
            $scope.searchGrid.data = data;
            
            searchCountApiParams.search = $scope.search_text;
            searchCountApi.get(searchCountApiParams).$promise.then(function(totalCount) {
                $scope.searchGrid.totalItems = totalCount.total;
            });
        });
    }

   $scope.searchKisCourse();
    /*
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
    }*/
};

SearchController.$inject = ["$scope", "$http", "$resource", "uiGridConstants"];
app.controller("SearchController", SearchController);