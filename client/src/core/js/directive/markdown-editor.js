export function MarkdownEditorDirective() {
  return {
    restrict: 'A',
    replace: false,
    link: function(scope, element, attrs) {
      var options = attrs.options ? scope.$eval(attrs.options) : {};
      element.markdown(options);
    },
  };
}
