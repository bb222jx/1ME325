window.onload = function(event) {
	var windows = document.getElementsByClassName("window");
	var drag = new DragnDrop();
	for (var i = 0; i < windows.length; i++) {
		var x = drag.add(windows[i], windows[i].getElementsByClassName("menu")[0]);
	}
};