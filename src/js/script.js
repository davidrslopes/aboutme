function Preload(arrayOfImages) {
	$(arrayOfImages).each(function(){
		$('<img/>')[0].src = this;
	});
}
function Background(){
	var imgs = [
			"assets/img/bg_ollie_2.jpg",
			"assets/img/bg_ollie_3.jpg",
			"assets/img/bg_ollie_1.jpg"
		],
		len = imgs.length,
		idx = -1;
	Preload(imgs);
	setInterval(function(){
		idx = (idx+1)%len;
		$.backstretch(imgs[idx], {speed: 500});
	}, 5000);
}
jQuery.fn.center = function () {
	this.css("position","absolute");
	this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
	this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
	return this;
}
$(function() {
	$('.container').center();
	$(window).resize(function(){
		$('.container').center();
	});
	Background();
});
