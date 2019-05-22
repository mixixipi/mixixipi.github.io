$().extend('drag',function (obj) {
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
});