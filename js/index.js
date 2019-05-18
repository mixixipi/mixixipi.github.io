window.onload = function () {
	var menu = $().byClassName('menu','header');
	var member = $().byClassName('member','header');
	member.hover(function () {
		menu.show();
	},function () {
		menu.hide();
	});

	var login = $().byId('login');
	var screen = $().byId('screen');
	var login_close = $().byClassName('close','login');
	var login_menu = $().byClassName('login_menu','header');
	login_menu.click(function () {
		screen.lock();
		login.show().center(350,350).drag().resize();
	});
	login_close.click(function () {
		screen.unlock();
		login.hide();
	});
};