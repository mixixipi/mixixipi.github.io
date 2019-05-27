/*$(function () {
	$('.member_menu').hover(function () {
		$('.member_menu ul').show().animate({
			attr : 'o',
			target : 100,
			step : 2,
			t : 30
		});
	},function () {
		$('.member_menu ul').animate({
			attr : 'o',
			target : 0
		}).hide();
	});

	var move = $('.login_move').first();
	$('.login_menu').click(function () {
		$('#screen').lock().animate({
			attr : 'o',
			target : 40,
			step : 10,
			t : 30
		});
		$('#login').show().center(350,350).resize().drag(move);
	});
	$('.login_close').click(function () {
		$('#screen').animate({
			attr : 'o',
			target : 0
		}).unlock();
		$('#login').hide();
	});

	$('#share').hover(function () {
		$('#share').animate({
			attr : 'x',
			target : 0
		});
	},function () {
		$('#share').animate({
			attr : 'x',
			target : -212
		});
	});
});*/

$(function () {
	$('#btn').click(function () {
		$('#box').animate({
			attr : 'left',
			step : 7,
			start : 100,
			target : 300,
			speed : 5
		});
	});
});