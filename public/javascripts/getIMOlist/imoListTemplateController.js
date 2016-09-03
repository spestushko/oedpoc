app.controller('imoListTemplateController', function($rootScope, $scope, $http, $location){
  console.log('[imoListTemplateController.js] - (imoListTemplateController) - Scope is up!');

  /**
  * @desc Make a call to the server to get list of IMO
  */
  $scope.imoList = {};
  $http.get('/getIMOlist/imo').success(function(data){
    if (data.state == 'SUCCESS'){
      console.log('To be displayed IMO');
      $scope.imoList  = data.dataArray;
      $scope.shipList = data.dataShipArray; 
    }
    else
      console.log('ERROR');
  });

});
