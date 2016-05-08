angular
  .module('app')
  .directive('mxOFooter', mxOFooter);

function mxOFooter() {
  return {
    restrict: 'A',
    templateUrl: 'organisms/footer/template.html',
  };
}
