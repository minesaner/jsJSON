var utils = require('./utils.js');
var Public = require('./public.js');
var public = new Public();

function Pack(obj) {
	this.type = utils.type(obj);
	this.obj = this.type === 'string' ? JSON.parse() : obj;
}

Pack.prototype.get = function (field) {
	return public.get(this.obj, field);
};

/**
 * 获取字段的数字表示
 */
Pack.prototype.getNumber = function (field) {
	return public.getNumber(this.obj, field);
};

/**
 * 获取字段的字符串表示
 */
Pack.prototype.getString = function (field) {
	return public.getString(this.obj, field);
};

Pack.prototype.isEmpty = function () {
	return public.isEmpty(this.obj);
};

Pack.prototype.empty = function () {
	if (this.type === 'array') {
		obj = [];
	} else if (this.type === 'object') {
		obj = {};
	}
};

Pack.prototype.has = function (field) {
	return public.has(this.obj, field);
};

Pack.prototype.createField = function (field, value) {
	public.createField(this.obj, field, value);
};

Pack.prototype.set = function (field, value) {
	public.set(this.obj, field, value);
};

module.exports = function (obj) {
	return new Pack(obj);
};
