angular
  .module( 'app' )
  .directive( 'mxOHeader', mxOHeader );

function mxOHeader() {
  return {
    restrict: 'A',
    templateUrl: 'organisms/header/template.html',
    scope: {
      mxMenuItems: '<',
      mxTemplate: '@',
    },
  };
}
