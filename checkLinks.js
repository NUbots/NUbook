//Gets the mdx files in NUbook and stores in an array 'files'
require('events').EventEmitter.defaultMaxListeners = Infinity; 
var fs = require('fs');
var path = require('path');
 
var searchRecursive = function(dir, pattern) { //https://stackoverflow.com/a/47886550
  var results = [];
  fs.readdirSync(dir).forEach(function (dirInner) {
   
    dirInner = path.resolve(dir, dirInner);
    var stat = fs.statSync(dirInner);
 
    if (stat.isDirectory()) {
      results = results.concat(searchRecursive(dirInner, pattern));
    }
    if (stat.isFile() && dirInner.endsWith(pattern)) {
      results.push(dirInner);
    }
  });
  return results;
};
 
var files = searchRecursive('./src/book', '.mdx');
var externalLinksList = [];
//console.log(files);
 
//Looping through the mdx files to find all links
let count = 0;
for (var j = 0; j < files.length; j++) {
	//Have array of .mdx files, as 'files'
	//Search through a file and find URLs using regex -> add to list
 
	var fs = require('fs');
	var array = fs.readFileSync(files[j]).toString().split("\n");
	//array is a mdx file
 
	//check file for URLs
	var reBrackets = /\((.*?)\)/g;
	var listOfText = [];
 
	var found;
 
	for(i in array) { //for each file in the array
		while(found = reBrackets.exec((array[i]))) { //gets text in brackets
 
			var t = found[1].split(" ", 1)[0];
			if (t.includes("/")){ //check if stuff in brackets contains a link & whether external/internal
				//count++;
				//listOfText.push(t); //holds the links in the page
				//console.log(t + " file" + j);
				if (t.charAt(0) == ("h")){ //Put into list of only external links
					//console.log(t + " external link");
					count++;			
					//Add to a list of external links
					externalLinksList.push(t);
				}
				else if (t.charAt(0) == (".") || t.charAt(0) == "/"){
					//console.log(t + " internal link");
					//count++;
					//listOfText.push(t); //holds the links in the page
				}
				else{ //bugs
					//console.log(t + " file: " + j);
					//count++;	
				}
			}
		}
	}
}
const request = require('request');
request.ab
  
function sendHTTPRequest(linkURL) {
  request.head(linkURL, {timeout: 15000}, (error, res) => {
  const exists = !error && res.statusCode.toString().startsWith(2);
  
  if (!exists){
	 console.log(exists + " " + linkURL);
  }
  
  return exists;  
});
 
}
 
for (var i = 0; i < externalLinksList.length; i++){
  var link = externalLinksList[i];
  sendHTTPRequest(link);
}
 
console.log('External Links found: ' + count);