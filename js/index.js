addEvent(window,'load',function () {
	$('.member_menu').hover(function () {
		$('.member_menu ul').show();
	},function () {
		$('.member_menu ul').hide();
	});

	var move = $('.login_move').element(0);
	$('.login_menu').click(function () {
		$('#screen').lock();
		$('#login').show().center(350,350).resize().drag(move);
	});
	$('.login_close').click(function () {
		$('#screen').unlock();
		$('#login').hide();
	});
});
