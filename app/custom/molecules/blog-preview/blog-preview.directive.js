angular
  .module( 'app' )
  .directive( 'mxMBlogPreview', mxMBlogPreview );

function mxMBlogPreview() {
  return {
    restrict: 'A',
    templateUrl: 'molecules/blog-preview/template.html',
    scope: {
      mxTitle: '@',
      mxExcerpt: '@',
      mxDate: '@',
      mxLink: '@',
    },
  };
}
