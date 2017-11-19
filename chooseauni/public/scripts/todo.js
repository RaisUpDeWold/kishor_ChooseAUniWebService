var app = angular.module('todoApp', ["ngTable"]);
app.controller('TodoListController', ['$scope', '$http', 'NgTableParams', function ($scope, $http, NgTableParams) {
    $scope.tableParams = new NgTableParams({}, { dataset: [] });
    $http({
        method: 'GET',
        url: '/api/search'
    }).then(function success(response) {
        var data = [
            {name: response.data, age: 50}
        ];
        $scope.tableParams = new NgTableParams({}, { dataset: data });
    }, function error(response) {});

    $scope.todos = [
        {text: 'learn AngularJS', done: true},
        {text: 'build an AngularJS app', done: true}
    ];

    $scope.addTodo = function() {
        $scope.todos.push({text: $scope.todoText, done: false});
        $scope.todoText = '';
    }

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    }

    $scope.archive = function() {
        var oldTodos = todoList.todos;
        todoList.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
    };
}]);
