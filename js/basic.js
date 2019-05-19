(function (window,undefined) {
	window.$ = function (str) {
		return new Base(str);
	};

	function Base(str) {
		this.ele = [];
		//var a, b;
		//a = str.charAt(0);
		//b = str.substr(1);
	}

	Base.prototype.find = function (str) {
		//var a, b;
		//a = str.charAt(0);
		//b = str.substr(1);
		return this;
	};

	Base.prototype.byId = function (str) {
		this.ele.push(document.getElementById(str));
		return this;
	};

	Base.prototype.byName = function (str,father) {
		var node = null;
		if (arguments.length == 2) {
			node = document.getElementById(father);
		} else {
			node = document;
		}
		var arr = node.getElementsByName(str);
		for (var i = 0; i < arr.length; i++) {
			this.ele.push(arr[i]);
		}
		return this;
	};

	Base.prototype.byTagName = function (str,father) {
		var node = null;
		if (arguments.length == 2) {
			node = document.getElementById(father);
		} else {
			node = document;
		}
		var arr = node.getElementsByTagName(str);
		for (var i = 0; i < arr.length; i++) {
			this.ele.push(arr[i]);
		}
		return this;
	};

	Base.prototype.byClassName = function (str,father) {
		var node = null;
		if (arguments.length == 2) {
			node = document.getElementById(father);
		} else {
			node = document;
		}
		if (typeof node.getElementsByClassName != 'undefined') {
			var arr = node.getElementsByClassName(str);
			for (var i = 0; i < arr.length; i++) {
				this.ele.push(arr[i]);
			}
		} else {
			var arr = node.getElementsByTagName('*');
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].className == str) {
					this.ele.push(arr[i]);
				}
			}
		}
		return this;
	};

	Base.prototype.css = function (attr,value) {
		if (arguments.length == 1) {
			var arr = [];
			for (var i = 0; i < this.ele.length; i++) {
				arr.push(getStyle(this.ele[i],attr));
			}
			return arr;
		} else {
			for (var i = 0; i < this.ele.length; i++) {
				this.ele[i].style[attr] = value;
			}
		}
		return this;
	};

	Base.prototype.html = function (value) {
		if (arguments.length == 0) {
			var arr = [];
			for (var i = 0; i < this.ele.length; i++) {
				arr.push(this.ele[i].innerHTML);
			}
			return arr;
		} else {
			for (var i = 0; i < this.ele.length; i++) {
				this.ele[i].innerHTML = value;
			}
		}
		return this;
	};

	Base.prototype.addClass = function (value) {
		for (var i = 0; i < this.ele.length; i++) {
			if (this.ele[i].className == '') {
				this.ele[i].className = value;
			} else {
				var regexp = new RegExp('(^|\\s)' + value + '(\\s|$)');
				if (!this.ele[i].className.match(regexp)) {
					this.ele[i].className += ' ' + value;
				}
			}
		}
		return this;
	};

	Base.prototype.removeClass = function (value) {
		for (var i = 0; i < this.ele.length; i++) {
			var regexp1 = new RegExp('^' + value + '$');
			var regexp2 = new RegExp('^' + value + '\\s');
			var regexp3 = new RegExp('\\s' + value + '$');
			var regexp4 = new RegExp('\\s' + value + '\\s');
			if (this.ele[i].className.match(regexp1)) {
				this.ele[i].className = this.ele[i].className.replace(regexp1,'');
			} else if (this.ele[i].className.match(regexp2)) {
				this.ele[i].className = this.ele[i].className.replace(regexp2,'');
			} else if (this.ele[i].className.match(regexp3)) {
				this.ele[i].className = this.ele[i].className.replace(regexp3,'');
			} else if (this.ele[i].className.match(regexp4)) {
				this.ele[i].className = this.ele[i].className.replace(regexp4,' ');
			}
			if (this.ele[i].className == '') {
				this.ele[i].removeAttribute('class');
			}
		}
		return this;
	};

	Base.prototype.hover = function (over,out) {
		for (var i = 0; i < this.ele.length; i++) {
			addEvent(this.ele[i],'mouseover',over);
			addEvent(this.ele[i],'mouseout',out);
		}
		return this;
	};

	Base.prototype.click = function (fn) {
		for (var i = 0; i < this.ele.length; i++) {
			addEvent(this.ele[i],'click',fn);
		}
		return this;
	};

	Base.prototype.show = function () {
		for (var i = 0; i < this.ele.length; i++) {
			this.ele[i].style.display = 'block';
		}
		return this;
	};

	Base.prototype.hide = function () {
		for (var i = 0; i < this.ele.length; i++) {
			this.ele[i].style.display = 'none';
		}
		return this;
	};

	Base.prototype.lock = function () {
		var height = document.documentElement.scrollHeight;
		for (var i = 0; i < this.ele.length; i++) {
			this.ele[i].style.height = height + 'px';
			this.ele[i].style.display = 'block';
		}
		return this;
	};

	Base.prototype.unlock = function () {
		for (var i = 0; i < this.ele.length; i++) {
			this.ele[i].style.height = 0;
			this.ele[i].style.display = 'none';
		}
		return this;
	};

	Base.prototype.resize = function () {
		for (var i = 0; i < this.ele.length; i++) {
			var ele = this.ele[i];
			addEvent(window,'resize',function () {
				var left = inner().width - ele.offsetWidth;
				var top = inner().height - ele.offsetHeight;
				if (ele.offsetLeft > left) {
					ele.style.left = left + 'px';
				}
				if (ele.offsetTop > top) {
					ele.style.top = top + 'px';
				}
			});
		}
		return this;
	};

	Base.prototype.center = function (width,height) {
		var left = (document.documentElement.clientWidth - width) / 2;
		var top = (document.documentElement.clientHeight - height) / 2;
		for (var i = 0; i < this.ele.length; i++) {
			this.ele[i].style.position = 'fixed';
			this.ele[i].style.left = left + 'px';
			this.ele[i].style.top = top + 'px';
		}
		return this;
	};

	Base.prototype.drag = function () {
		for (var i = 0; i < this.ele.length; i++) {
			var ele = this.ele[i];
			addEvent(ele,'mousedown',function (e) {
				var mx = e.clientX - ele.offsetLeft;
				var my = e.clientY - ele.offsetTop;
				if (e.target.tagName == 'H2') {
					addEvent(document,'mousemove',move);
					addEvent(document,'mouseup',up);
				} else {
					removeEvent(document,'mousemove',move);
					removeEvent(document,'mouseup',up);
				}
				function move(e) {
					var width = inner().width - ele.offsetWidth;
					var height = inner().height - ele.offsetHeight;
					var left = e.clientX - mx;
					var top = e.clientY - my;
					if (left < 0) {
						ele.style.left = 0;
					} else if (left > width) {
						ele.style.left = width + 'px';
					} else {
						ele.style.left = left + 'px';
					}
					if (top < 0) {
						ele.style.top = 0;
					} else if (top > height) {
						ele.style.top = height + 'px';
					} else {
						ele.style.top = top + 'px';
					}
					if (typeof ele.setCapture != 'undefined') {
						ele.setCapture();
					}
				}
				function up() {
					removeEvent(document,'mousemove',move);
					removeEvent(document,'mouseup',up);
					if (typeof ele.releaseCapture != 'undefined') {
						ele.releaseCapture();
					}
				}
			});
		}
		return this;
	};
})(window);

/**************************************************************************/

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

function inner() {
	if (typeof window.innerWidth != 'undefined') {
		return {
			width : window.innerWidth,
			height : window.innerHeight
		};
	} else {
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
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

function getEvent(event) {
	return event || window.event;
}

function preDef(e) {
	if (typeof e.preventDefault != 'undefined') {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}

function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
