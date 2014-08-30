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

	

})();