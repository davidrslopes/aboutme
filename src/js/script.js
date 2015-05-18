function Preload(arrayOfImages) {
	$(arrayOfImages).each(function(){
		$('<img/>')[0].src = this;
	});
}
function Background(){
	var imgs = [
			"../assets/img/bg_ollie_2.jpg",
			"../assets/img/bg_ollie_3.jpg",
			"../assets/img/bg_ollie_1.jpg"
		],
		len = imgs.length,
		idx = -1;
	Preload(imgs);
	setInterval(function(){
		idx = (idx+1)%len;
		$("body").css("background-image", "url("+imgs[idx]+")");
	}, 10000);
}

$(function() {
	Background();
});
