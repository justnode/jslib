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
	function getElementsByClassName(classname,tag,parent){
		parent = parent  || document;
		if(!(parent=$(parent))) return  false;  
		var allTags = ((tag == '*') && parent.all) ? parent.all : parent.getElementsByTagName(tag);		
		var elements = [];

		classname = classname.replace('/\-/g','\\-');
		var regex = new RegExp("(^|\\s)" + classname + "(\\s|$)");

		for (var i = 0; i < allTags.length; i++) {
			var  element = allTags[i];
			if(regex.test(element.className)){
				elements.push(element);
			}
		};
		return elements;
	}
	jslib.getElementsByClassName = getElementsByClassName;


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

	function bindFunction(func,obj) {
	    return function() {
	        func.apply(obj,arguments);    
	    };
	};
	jslib.bindFunction = bindFunction;

	function setStyleById(element,styles){
		if(!(element = $(element))) return false;
		for(var key in styles){
			if(!(styles.hasOwnProperty(key)))  continue;
			if(element.style.setProperty()){
				element.style.setProperty(uncamelize(key,'-'),styles.key);
			}else{
				element.style.camelize(key)=styles.key;
			}

		}
		return true;
	}	

})();