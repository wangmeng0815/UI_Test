/**
 * 自定义弹出窗口
 * @param title 提示内容
 * @param width 提示框宽度
 * @param bg 提示框背景颜色
 * @param target 目标top值
 * @param time 动画时间
 * @param color 字体颜色
 */

;
(function($) {
	$.fn.tip = function(settings) {
		settings = jQuery.extend({
			'title': "信息主标题",
			'width': '200px',
			"bg": "#c3c3c3",
			"borderRadius": '10px',
			'height': '40px',
			'color': '#fff',
			"top": '-10px',
			'right': '100px',
			'time': 300,
			'center': 'center'
		}, settings);
		var container = $('<div></div>');
		container.css({
			'width': settings.width,
			"top": settings.top,
			'right': settings.right,
			'position': 'fixed',
			"textAlign": settings.center,
			'display': 'none'
		});
		var n = 0;
		var i = 2;
		$('body').append(container)
		$(this).click(function() {
			container.css('display', 'block')
			var tip = $("<div id='" + n + "'>" + "</div>");
			n = n + 1;
			tip.html(settings.title)
			tip.css({
				'width': settings.width,
				"borderRadius": settings.borderRadius,
				"borderRadius": '10px',
				'height': settings.height,
				"lineHeight": settings.height,
				"backgroundColor": settings.bg,
				"marginTop": "20px",
				'color': settings.color
			});

			container.append(tip);
			var add = parseInt(settings.height) + parseInt(tip.css("marginTop"))
			var speed = parseInt(settings.height) + parseInt(tip.css("marginTop"))
			var timer = setInterval(function() {
				container.animate({
					'top': -speed + 'px'
				})
				speed = speed + add;
				i++;
				if (container.css('top') == -container.find('div').length * add + 'px') {
					clearInterval(timer);
					container.remove()
				}
			}, settings.time);

		});
	}
})
(jQuery);