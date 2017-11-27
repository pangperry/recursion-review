// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var getByType = function(json) {    
  var char = json.charAt(0);
  //look at first character
  if (char === '\"') {
    //MOVE INDEX FORWARD BY LENGTH OF STRING
    //RETURN STRING
    console.log('string');
    return getString(json.slice(1));
  }
  if (/\d/.test(char)) {
    //move index forward the length of the number
    //return number
    return getNumber(json);
  }
  if (char === '{') {
    console.log('object');
    //move index forward the length of the number
  }
  if (char === '[') {
    //THIS needs to move the INDEX forward by the length of the 
    //formerly stringified ARRAY
    return getArray(json.slice(1));
  }
  if (char === 't') {
    return getBoolean(json);
    console.log('true');
  }
  if (char === 'f') {
    return getBoolean(json);
    console.log('false');
  }
  if (char === 'n') {
    return getNull(json);
  }
};

var getElements = function(json) {
  var index = 0;
  var elements = [];
  elements.push(getByType(json).value);
  var endIndex = getByType(json).newIndex;
  
  if (json.charAt(endIndex) === ',') {
    // console.log(json[endIndex+2]);
    elements = elements.concat(getElements(json.slice(endIndex + 1)).value);
  }
  console.log(json.charAt(endIndex));
  if (json.charAt(endIndex) === ']') {
    return {
      newIndex: endIndex + 1,
      value: elements
    };
  }
  //NEED move json forward by the length of this formerly stringified value
  //then we can test 
    //if next char in json is ','
      //elements = elements.concat(elements);      
    //if next char is ']' 
  return {
    newIndex: endIndex + 1,
    value: elements
  };
  //check if it's the end of the array or a comma?
  //if it's ']'
    // return [];
  // if it's comma, get more items?
    //move index forward(slice), recusively get get elements
    // elements.concat(getElements(json.slice....))
  //return elements as an array
};

var getString = function(json) {
  return {
    newIndex: json.indexOf('"') + 2,
    value: json.slice(0, json.indexOf('"'))
  };
};

var getNumber = function(json) {
  return {
    newIndex: json.search(/[^\d]/),
    value: Number(json.slice(0, json.search(/[^\d]/)))
  };
};

var getBoolean = function(json) {
  if (json[0] === 't') {
    return { 
      newIndex: 4, 
      value: true
    }
  } else if (json[0] === 'f') {
    return { 
      newIndex: 5, 
      value: false
    }
  } 
};

var getNull = function(json) {
  return { 
      newIndex: 4, 
      value: null
    }
};

var getArray = function(json) {
  if (json.charAt(0) === ']') {
    return [];
  }
  var index = 0;
  var elements = getElements(json);
  return {
    newIndex: elements.newIndex + 1,
    value: elements.value
  };
};

var parseJSON = function(json) {
  return getByType(json);
};
