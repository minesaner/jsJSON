/**
 * 将给定参数解析为数字
 *
 * @param  {String|Number} num
 * @returns {Number}
 */
function parseNumber(num) {
	num = '' + num;
	num = parseFloat(num.replace(/,/g, '').match(/^[0-9]+(\.\d+)?/));

	if (isNaN(num)) {
		return 0;
	}

	return num;
}

/**
 * 将点号分隔的字段转换位中括号形式
 * 	a.b => ["a"]["b"]
 *
 * @param  {String} field
 * @returns {String}
 */
function es(field) {
	var fs = field.split('.');
	return '["' + fs.join('"]["') + '"]';
}

/**
 * 创建一个包含知道键值的对象
 * 
 * @param {String} field
 * @param {Object} value
 * @returns {Object}
 */
function createObject(field, value) {
	var obj = {};
	if (typeof obj[])
	eval('obj' + es(field) + '=' + JSON.stringify(value));
	
	return obj;
}

function type(obj) {
	var toStr = Object.prototype.toString.call(obj);

	return toStr.replace(/^\[object\s+(\w+)\]$/, '$1').toLowerCase();
}

module.exports = {
	parseNumber: parseNumber,
	es: es,
	createObject: createObject,
	type: type
};
