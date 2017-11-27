// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // return String pass in object
  // test for array
  if (Array.isArray(obj)) {
    var items = [];   
    // if array iterate through and stringify items
    for (let i = 0; i < obj.length; i++) {
      items.push(stringifyJSON(obj[i]));
    }
    // join items and return bracketed array with stringify items
    return '[' + items.join(',') + ']'; 
    // return stringified array
  }
  // test for object and not null
  if (obj && typeof obj === 'object') {
    var pairs = [];
    // iterate through pairs and stringify pairs
    for (let key in obj) {
      if (stringifyJSON(obj[key]).length > 0) {
        pairs.push(stringifyJSON(key) + ':' + stringifyJSON(obj[key]));
      }
    }
    // join pairs and return curly brace string concat pairs
    return '{' + pairs.join(',') + '}';  
  }
  
  //test for function
  if (typeof obj === 'function') {
    return '';
  }
  //test for undefined
  if (typeof obj === 'undefined') {
    return '';
  }

  if (typeof obj === 'string') {
    return '\"' + String(obj) + '\"';
  }

  return String(obj);
};
