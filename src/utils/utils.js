
export const getWeek = function () {
	var week = "星期"+"天一二三四五六".charAt(new Date().getDay());
	return week;
}

export const getNewDay = function () {
	return new Date().format("yyyy/MM/dd");
}

export const getDay = function () {
	return new Date().format("dd");
}
