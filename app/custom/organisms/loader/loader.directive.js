angular.
  module('app').
  directive('lnCmsLoader', lnCmsLoader);

function lnCmsLoader() {
  return {
    restrict: 'E',
    templateUrl: 'organisms/loader/template.html',
  };
}
