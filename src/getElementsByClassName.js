// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node) {
  //search for elements with classname === className
  var elements = [];
  var node = node || document.body;
  //search first node for className
  if (node.classList.contains(className)) {
    elements.push(node);
  }
  
  for (var i = 0; i < node.children.length; i++) {
    elements = elements.concat(getElementsByClassName(className, node.children[i]));
  }
  //search through children elements for elements with className
  //return list of elements that have className
  return elements;
};
