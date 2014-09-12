(function (){

	if(!window.jslib){		
		window.jslib={};
	}

	//可以传入一个或者多个id，返回一个Element对象或者一个对象数组
	function $(){

		var elements = [];
		for (var i = 0; i < arguments.length; i++) {
			var element = arguments[i];
			if(typeof element =="string"){
				element = document.getElementById(element);
			}
			if(arguments.length ==1){
				return element;
			}
			elements.push(element);
		};
		return elements;
	}
	jslib.$ = $;

	//为DOM对象添加事件监听器
	function addEvent(node,type,listener){
		if(!(node = $(node))) return false;
		if(node.addEventListener){
			node.addEventListener(type,listener,false);
			return true;
		}
		if(node.attachEvent){
			node.attachEvent('on' + type,listener);
			return  true;
		}
		return  false;
	}
	jslib.addEvent = addEvent;

	//移除监听器
	function removeEvent(node,type,listener){
		if(!(node = $(node))) return false;
		if(node.removeEventListener){
			node.removeEventListener(type,listener);
			return true;
		}
		if(node.detechEvent){
			node.detechEvent('on' + type,listener);
			return  true;
		}
		return false;
	}
	jslib.removeEvent = removeEvent;

	//通过类名找到元素对象
	function getElementsByClassName(className,tag,parent){
		parent = parent  || document;
		if(!(parent=$(parent))) return  false;  
		var allTags = ((tag == '*') && parent.all) ? parent.all : parent.getElementsByTagName(tag);		
		var elements = [];

		className = className.replace('/\-/g','\\-');
		var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");

		for (var i = 0; i < allTags.length; i++) {
			var  element = allTags[i];
			if(regex.test(element.className)){
				elements.push(element);
			}
		};
		return elements;
	}
	jslib.getElementsByClassName = getElementsByClassName;
	

	function insertAfter(node,refer){
		if(!(node=$(node))) return false;
		if(!(refer = $(refer))) return false;
		return refer.parentNode.insertBefore(node,refer.nextSibling);
	}
	jslib.insertAfter = insertAfter;

	function  removeChildren(node){
		if(!(node = $(node))) return false;
		while(node.firstChild){
			node.removeChild(node.firstChild);
		}
		return node;
	}
	jslib.removeChildren = removeChildren;

	function prependChild (node,parent) {
		if(!(node = $(node))) return false;
		if(!(parent = $(parent))) return false;
		if(parent.firstChild){
			parent.insertBefore(node,parent.firstChild);
		}else{
			parent.appendChild(node);
		}
		return parent;
	}
	jslib.prependChild = prependChild;

	function setStyleById(element,styles){
		if(!(element = $(element))) return false;
		for(var key in styles){
			if(!(styles.hasOwnProperty(key)))  continue;
			if(element.style.setProperty){
				element.style.setProperty(uncamelize(key,'-'),styles[key]);
			}else{
				element.style.camelize(key)=styles[key];
			}

		}
		return true;
	}
	jslib.setStyleById = setStyleById;

	function  setStyleByClassName(className,tag,parent,styles){
		if(!(parent = $(parent)))  return false;
		var elements = getElementsByClassName(className,tag,parent);
		for (var i = 0; i < elements.length; i++) {
			setStyleById(elements[i],styles);
		};
		return true;
	}
	jslib.setStyleByClassName = setStyleByClassName;

	function  getClassName(element){
		if(!(element = $(element))) return false;
		return element.className.replace(/\s+/g,' '),split(' ');
	}
	jslib.getClassName = getClassName;

	function hasClassName(element,className){
		if(!(element = $(element))) return  false;
		var classes = getClassName(element);
		for (var i = 0; i < classes.length; i++) {
			if(className === classes[i]) return true;
		};
		return false;
	}
	jslib.hasClassName = hasClassName;

	function removeClassName(element,className){
		if(!(element = $(element))) return false;
		var classes =getClassName(element);
		var length = classes.length;
		for (var i = 0; i < length; i++) {
			if(className ===classes[i]){ classes.splice(i,1)}
		};
		elementl.className = classes.join(' ');
		return (length == classes.length) ? false : true;
	}

	function getStyleSheets(url,media){
		var sheets = [],
			arr = [];
		if(!url || !media)  return  sheets;
		for (var i = 0, sheets = document.styleSheets; i < sheets.length; i++) {
			var sheetshref = document.styleSheets[i].href;
			if(!sheetshref  ||  sheetshref.indexOf(url) == -1) continue;
			if(media){
				media = media.replace(/,\s*/g,',');
				var sheetMedia;
				if(sheets[i].media.mediaText){
					sheetMedia = sheets[i].media.mediaText.replace(/,\s*/g,',');
				}else{
					sheetMedia = sheets[i].media.replace(/,\s*/g,',');
				}
				if(sheetMedia != media)  continue;

			}
			arr.push(sheets[i]);
		};
		return arr;
	}
	jslib.getStyleSheets = getStyleSheets;

	//url不仅可以接收真实的url，还可以接收cssstylesheet数组
	function editCssRule(url,media,selector,styles){
		var  sheets = ((typeof url == array) ? url : getStyleSheets(url,media));
		for (var i = 0; i < sheets.length; i++) {
			var rules = sheets[i].cssRules || sheets[i].rules;
			if(!rules) continue;

			selector = selector.toUpperCase();
			for (var i = 0; i < rules.length; i++) {
				if(selector == rules[i].selectorText.toUpperCase()){
					for(var key in styles){
						if(!(styles.hasOwnProperty(key))) {continue;}
						rules.style.camelize(key) = styles[key];
					}
				}
			};
		};
	}

	function  createXHR(){
		if(typeof XMLHttpRequest != "undefined"){
			return  new XMLHttpRequest();
		}else  if(typeof ActiveXObject != "undefined"){
			if(typeof arguments.callee.activeXString != 'string'){
				var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
				for (var i = 0; i < versions.length; i++) {
					try{	
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					}catch(e){

					}
				};
			}
			return  new ActiveXObject(arguments.callee.activeXString);
		}else{
			throw  new Error('no XHR is created');
		}
	}
	jslib.createXHR = createXHR;

	
	function bindFunction(func,obj) {
	    return function() {
	        func.apply(obj,arguments);    
	    };
	};
	jslib.bindFunction = bindFunction;


	function toggleDisplay(node,value){
		if(!(node = $(node))) return false;
		if(node.style.display != 'none'){
			node.style.display = 'none';
		}else{
			node.style.display = value || '';
		}
		return  true;
	}	
	jslib.toggleDisplay = toggleDisplay;

	function  camelize(str){
		return  str.replace(/-(\w)/g,function(matchStr,p1){
			return  p1.toUpperCase();
		})
	}
	jslib.camelize = camelize;

	function  uncamelize(str,sep){
		return  str.replace(/([a-z])([A-Z])/g,function(matchStr,p1,p2){
			return  p1 + sep + p2.toUpperCase();
		})
	}
	jslib.uncamelize = uncamelize;

	function getRequestObject(url,options) {
    
	    // Initialize the request object
	    var req = false;
	    if(window.XMLHttpRequest) {
	        var req = new window.XMLHttpRequest();
	    } else if (window.ActiveXObject) {
	        var req = new window.ActiveXObject('Microsoft.XMLHTTP');
	    }
	    if(!req) return false;
	    
	    // Define the default options
	    options = options || {};
	    options.method = options.method || 'GET';
	    options.send = options.send || null;

	    // Define the various listeners for each state of the request
	    req.onreadystatechange = function() {
	        switch (req.readyState) {
	            case 1:
	                // Loading
	                if(options.loadListener) {
	                    options.loadListener.apply(req,arguments);
	                }
	                break;
	            case 2:
	                // Loaded
	                if(options.loadedListener) {
	                    options.loadedListener.apply(req,arguments);
	                }
	                break;
	            case 3:
	                // Interactive
	                if(options.ineractiveListener) {
	                    options.ineractiveListener.apply(req,arguments);
	                }
	                break;
	            case 4:
	                // Complete
	                // if aborted FF throws errors
	                try { 
	                if (req.status && req.status == 200) {
	                    
	                    // Specific listeners for content-type
	                    // The Content-Type header can include the charset:
	                    // Content-Type: text/html; charset=ISO-8859-4
	                    // So we'll use a match to extract the part we need.
	                    var contentType = req.getResponseHeader('Content-Type');
	                    var mimeType = contentType.match(/\s*([^;]+)\s*(;|$)/i)[1];
	                                        
	                    switch(mimeType) {
	                        case 'text/javascript':
	                        case 'application/javascript':
	                            // The response is JavaScript so use the 
	                            // req.responseText as the argument to the callback
	                            if(options.jsResponseListener) {
	                                options.jsResponseListener.call(
	                                    req,
	                                    req.responseText
	                                );
	                            }
	                            break;
	                        case 'application/json':
	                            // The response is json so parse   
	                            // req.responseText using the an anonymous functions
	                            // which simply returns the JSON object for the
	                            // argument to the callback
	                            if(options.jsonResponseListener) {
	                                try {
	                                    var json = parseJSON(
	                                        req.responseText
	                                    );
	                                } catch(e) {
	                                    var json = false;
	                                }
	                                options.jsonResponseListener.call(
	                                    req,
	                                    json
	                                );
	                            }
	                            break;
	                        case 'text/xml':
	                        case 'application/xml':
	                        case 'application/xhtml+xml':
	                            // The response is XML so use the 
	                            // req.responseXML as the argument to the callback
	                            // This will be a Document object
	                            if(options.xmlResponseListener) {
	                                options.xmlResponseListener.call(
	                                    req,
	                                    req.responseXML
	                                );
	                            }
	                            break;
	                        case 'text/html':
	                            // The response is HTML so use the 
	                            // req.responseText as the argument to the callback
	                            if(options.htmlResponseListener) {
	                                options.htmlResponseListener.call(
	                                    req,
	                                    req.responseText
	                                );
	                            }
	                            break;
	                    }
	                
	                    // A complete listener
	                    if(options.completeListener) {
	                        options.completeListener.apply(req,arguments);
	                    }

	                } else {
	                    // Response completed but there was an error
	                    if(options.errorListener) {
	                        options.errorListener.apply(req,arguments);
	                    }
	                }
	                

	                } catch(e) {
	                    //ignore errors
	                    //alert('Response Error: ' + e);
	                }
	                break;
	        }
	    };
	    // Open the request
	    req.open(options.method, url, true);
	    // Add a special header to identify the requests
	    req.setRequestHeader('X-ADS-Ajax-Request','AjaxRequest');
	    return req;
	}
	jslib.getRequestObject = getRequestObject;


	function ajaxRequest(url,options) {
	    var req = getRequestObject(url,options);
	    return req.send(options.send);
	}
	jslib.ajaxRequest = ajaxRequest;
	
})();