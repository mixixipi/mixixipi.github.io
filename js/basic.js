(function (window) {
	var document = window.document;
	var docele = document.documentElement;

	window.$ = function (selector) {
		return new Base(selector);
	};

	function Base(selector) {
		this.ele = [];
		if (selector != undefined) {
			if (typeof selector == 'string') {
				if (selector.indexOf(' ') == -1) {
					switch (selector.charAt(0)) {
						case '#':
							this.ele.push(this.idname(selector.substr(1)));
							break;
						case '.':
							this.ele = this.classname(selector.substr(1));
							break;
						default:
							this.ele = this.tagname(selector);
					}
				} else {
					var temp = [];
					var child = [];
					var father = [];
					var arr = selector.split(' ');
					for (var i = 0; i < arr.length; i++) {
						if (father.length == 0) {
							father.push(document);
						}
						switch (arr[i].charAt(0)) {
							case '#':
								child = [];
								child.push(this.idname(arr[i].substr(1)));
								father = child;
								break;
							case '.':
								child = [];
								for (var j = 0; j < father.length; j++) {
									temp = this.classname(arr[i].substr(1),father[j]);
									for (var k = 0; k < temp.length; k++) {
										child.push(temp[k]);
									}
								}
								father = child;
								break;
							default:
								child = [];
								for (var j = 0; j < father.length; j++) {
									temp = this.tagname(arr[i],father[j]);
									for (var k = 0; k < temp.length; k++) {
										child.push(temp[k]);
									}
								}
								father = child;
						}
					}
					this.ele = child;
				}
			} else if (typeof selector == 'function') {
				addDomLoaded(selector);
			}
		}
	}

	Base.prototype.ready = function (fn) {
		addDomLoaded(fn);
	};

	Base.prototype.find = function (selector) {
		var child = [];
		for (var i = 0; i < this.ele.length; i++) {
			switch (selector.charAt(0)) {
				case '#':
					child.push(this.idname(selector.substr(1)));
					break;
				case '.':
					var arr = this.classname(selector.substr(1),this.ele[i]);
					for (var j = 0; j < arr.length; j++) {
						child.push(arr[j]);
					}
					break;
				default:
					var arr = this.tagname(selector,this.ele[i]);
					for (var j = 0; j < arr.length; j++) {
						child.push(arr[j]);
					}
			}
		}
		this.ele = child;
		return this;
	};

	Base.prototype.idname = function (selector) {
		return document.getElementById(selector);
	};

	Base.prototype.classname = function (selector,father) {
		var child = [];
		if (father == undefined) {
			father = document;
		}
		var arr = father.getElementsByClassName(selector);
		for (var i = 0; i < arr.length; i++) {
			child.push(arr[i]);
		}
		return child;
	};

	Base.prototype.tagname = function (selector,father) {
		var child = [];
		if (father == undefined) {
			father = document;
		}
		var arr = father.getElementsByTagName(selector);
		for (var i = 0; i < arr.length; i++) {
			child.push(arr[i]);
		}
		return child;
	};

	Base.prototype.eq = function (num) {
		var obj = this.ele[num];
		this.ele = [];
		this.ele[0] = obj;
		return this;
	};

	Base.prototype.ge = function (num) {
		return this.ele[num];
	};

	Base.prototype.first = function () {
		return this.ele[0];
	};

	Base.prototype.last = function () {
		var num = this.ele.length - 1;
		return this.ele[num];
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

	Base.prototype.drag = function (obj) {
		for (var i = 0; i < this.ele.length; i++) {
			var ele = this.ele[i];
			addEvent(ele,'mousedown',function (e) {
				var mx = e.clientX - ele.offsetLeft;
				var my = e.clientY - ele.offsetTop;
				var flag = false;
				if (e.target == obj) {
					flag = true;
				}
				if (flag) {
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

	Base.prototype.animate = function (obj) {
		for (var i = 0; i < this.ele.length; i++) {
			var ele = this.ele[i];

			var attr = obj.attr != undefined ?
					   obj.attr == 'x' ? 'left' :
					   obj.attr == 'y' ? 'top' :
					   obj.attr == 'w' ? 'width' :
					   obj.attr == 'h' ? 'height' :
					   'left' : 'left';
			var start = obj.start != undefined ? obj.start : parseInt(getStyle(ele,attr));
			var alter = obj.alter != undefined ? obj.alter : 0;
			var target = obj.target != undefined ? obj.target : start + alter;
			var step = obj.step != undefined ? obj.step : 10;
			var speed = obj.speed != undefined ? obj.speed : 10;
			var buffer = obj.buffer != undefined ? obj.buffer != 0 ? true : false : false;
			var time = obj.time != undefined ? obj.time : 30;

			if (start > target) step = -step;
			ele.style[attr] = start + 'px';
			clearInterval(ele.interval);

			ele.interval = setInterval(function () {
				if (buffer) {
					var temp = (target - parseInt(getStyle(ele,attr))) / speed;
					step = step > 0 ? Math.ceil(temp) : Math.floor(temp);
				}
				if (step == 0) {
					stop();
				} else if (step > 0 && Math.abs(parseInt(getStyle(ele,attr)) - target) <= step) {
					stop();
				} else if (step < 0 && (parseInt(getStyle(ele,attr)) - target) <= Math.abs(step)) {
					stop();
				} else {
					ele.style[attr] = parseInt(getStyle(ele,attr)) + step + 'px';
				}
				document.getElementById('output').innerHTML += parseInt(getStyle(ele,attr)) + ',';
			},time);

			function stop() {
				ele.style[attr] = target + 'px';
				clearInterval(ele.interval);
			}
		}

		return this;
	};

	Base.prototype.extend = function (name,fn) {
		Base.prototype[name] = fn;
	};
})(window);