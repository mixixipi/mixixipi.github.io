function addEvent(obj,type,fn) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type,fn,false);
	} else {
		if (!obj.events) obj.events = {};
		if (!obj.events[type]) {
			obj.events[type] = [];
		} else {
			if (addEvent.equal(obj.events[type],fn)) return false;
		}
		obj.events[type][addEvent.id++] = fn;
		obj['on'+type] = addEvent.exec;
	}
}

addEvent.id = 0;

addEvent.exec = function () {
	var e = addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this,e);
	}
};

addEvent.equal = function (es,fn) {
	for (var i in es) {
		if (es[i] == fn) return true;
	}
	return false;
};

addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
};

addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;
};

addEvent.fixEvent.stopPropagation = function () {
	this.cancelBubble = true;
};

function removeEvent(obj,type,fn) {
	if (typeof obj.removeEventListener != 'undefined') {
		obj.removeEventListener(type,fn,false);
	} else {
		if (obj.events) {
			var es = obj.events[type];
			for (var i in es) {
				if (es[i] == fn) {
					delete es[i];
				}
			}
		}
	}
}

/**************************************************************************/

function addDomLoaded(fn) {
	var timer = null;
	var isready = false;
	function doReady() {
		if (timer) clearInterval(timer);
		if (isready) return;
		isready = true;
		fn();
	}
	if (document.addEventListener != undefined) {
		addEvent(document,'DOMContentLoaded',function () {
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	} else {
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (e) {}
		},1);
	}
}

function inner() {
	if (typeof window.innerWidth != 'undefined') {
		return {
			width:window.innerWidth,
			height:window.innerHeight
		};
	} else {
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}
}

function offset() {
	if (typeof document.body.offsetHeight != 'undefined') {
		return {
			width:document.body.offsetWidth,
			height:document.body.offsetHeight
		};
	} else if (typeof document.body.scrollHeight != 'undefined') {
		return {
			width:document.body.scrollWidth,
			height:document.body.scrollHeight
		};
	}
}

function getStyle(ele,attr) {
	if (typeof window.getComputedStyle != 'undefined') {
		return window.getComputedStyle(ele,null)[attr];
	} else if (typeof ele.currentStyle != 'undefined') {
		return ele.currentStyle[attr];
	}
}

function hasClass(ele,cname) {
	var regexp = new RegExp('(\\s|^)' + cname + '(\\s|$)');
	return ele.className.match(regexp);
}

function insertRule(sheet,selectorText,cssText,position) {
	if (typeof sheet.insertRule != 'undefined') {
		sheet.insertRule(selectorText + '{' + cssText + '}',position);
	} else if (typeof sheet.addRule != 'undefined') {
		sheet.addRule(selectorText,cssText,position);
	}
}

function deleteRule(sheet,index) {
	if (typeof sheet.deleteRule != 'undefined') {
		sheet.deleteRule(index);
	} else if (typeof sheet.removeRule != 'undefined') {
		sheet.removeRule(index);
	}
} 

function trim(str) {
	return str.replace(/\s*/g,'');
}