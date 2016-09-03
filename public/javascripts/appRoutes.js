/**
 * Created by Sergei on 18.03.2016.
 */
var route = angular.module('route', ['ngRoute']);

route.config(function ($routeProvider, $locationProvider)
{
  /*
  * Routing for the front-end part. .html pages are
  * being loaded into 'ng-view', that can be found
  * in 'index.ejs' file
  * */
  $routeProvider
        .when('/getIMOlist', {
          templateUrl: 'javascripts/getIMOlist/imoListTemplate.html',
          controller: 'imoListTemplateController',
        })

        .when('/', {
          templateUrl: 'javascripts/mainPage/mainPage.html',
          controller: 'mainPageController',
        })

        .otherwise({ redirectTo: '/' });
});
