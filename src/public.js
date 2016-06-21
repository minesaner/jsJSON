var utils = require('./utils.js');

function parseField(obj, field) {
	return 'obj' + utils.es(field);
}

function get(obj, field) {
	if (!field) {
		return obj;
	}

	try {
		return eval(parseField(obj, field));
	} catch(e) {
		return undefined;
	}
}

/**
 * 获取字段的数字表示
 */
function getNumber(obj, field) {
	return utils.parseNumber(get(obj, field));
}

/**
 * 获取字段的字符串表示
 */
function getString(obj, field) {
	return get(obj, field) !== undefined ? (get(obj, field) + '').trim() : '';
}

function isEmpty(obj) {
	if (utils.type(obj) === 'object') {
		return JSON.stringify(obj) === '{}';
	} else if (utils.type(obj) === 'array') {
		return JSON.stringify(obj) === '[]';
	} else {
		return false;
	}
}

function has(obj, field) {
	return get(obj, field) !== undefined;
}

function createField(obj, field, value) {
	var fieldParts = field.split('.');
	var partsLength = fieldParts.length;
	var _fieldParts = [];
	var _field = '';
	
	for (var i = 0; i < partsLength - 1; i++) {
		_fieldParts.push(fieldParts[i]);
		_field = _fieldParts.join('.');

		if (!has(obj, _field)) {
			set(obj, _field, utils.createObject(field.substring(_field.length + 1), value));
			return;
		}
	}
}

function set(obj, field, value) {
	var str = parseField(obj, field);
	var originalValue = value;
	var isDel;

	if (value === undefined) {
		isDel = true;
		str = 'delete ' + str;
	} else {
		value = JSON.stringify(value);
		str = str + '=' + value;
	}

	try {
		eval(str);
	} catch(e) {
		if (!isDel) {
			createField(obj, field, originalValue);
		}
	}
}

function Public() {}

Public.prototype = {
	getNumber: getNumber,
	getString: getString,
	isEmpty: isEmpty,
	has: has,
	createField: createField,
	set: set,
	get: get
};

module.exports = Public;
