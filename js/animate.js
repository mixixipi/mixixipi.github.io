$().extend('animate',function (obj) {
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
});