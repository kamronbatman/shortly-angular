angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links, Auth) {
  $scope.links = Links.links;

  $scope.signout = function() {
    Auth.signout();
  };

  $scope.getLinks = function() {
    return Links.getLinks()
    .then(function(data){
      console.log('getLinks data!');
      console.log(data);
    });
  };

  $scope.shortenURL = function(){
    Links.createLink($scope.urlToShorten)
    .then(function (data){
      $scope.urlToShorten = '';
      return $scope.getLinks();
    })
    .catch(function(error){
      console.log(error);
    });
  };

  $scope.getLinks();
});
