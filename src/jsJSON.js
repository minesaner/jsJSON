var utils = require('./utils.js');

function J(json) {
	if (typeof json === 'string') {
		this.jsonObject = JSON.parse(json);
	} else {
		this.jsonObject = JSON.parse(JSON.stringify(json));
	}

	this.type = utils.type(this.jsonObject);
	this.isSimple = utils.isSimple(this.jsonObject);
	this.storeKey = null;
	this.storage = null;
}

J.prototype.get = function (field) {
	if (!field || this.isSimple) {
		return this.jsonObject;
	}
	
	var fields = field.split('.');
	var o = this.jsonObject;

	for (var i = 0; i < fields.length - 1; i++) {
		try {
			o = o[fields[i]];
		} catch(e) {
			return undefined;
		}
	}

	if (utils.isSimple(o)) {
		return undefined;
	} else {
		return o[fields[i]]
	}
};

J.prototype.getString = function (field) {
	if (!field) {
		return this.toJSON();
	}
	
	var value = this.get(field);

	if (utils.isNoU(value)) {
		return '';
	} else {
		return '' + value;
	}
};

J.prototype.toJSON = function () {
	return JSON.stringify(this.jsonObject);
};

J.prototype.getNumber = function (field) {
	return utils.parseNumber(this.get(field));
};

J.prototype.equal = function (field, value) {
	return this.get(field) === value;
};

J.prototype.deepEqual = function (field, value) {
	return utils.deepEqual(this.get(field), value);
};

J.prototype.set = function (field, value, cover) {
	if (this.isSimple) {
		return;
	}
	
	var fields = field.split('.');
	var o = this.jsonObject;

	for (var i = 0; i < fields.length - 1; i++) {
		if (typeof o[fields[i]] === 'undefined') {
			o = o[fields[i]] = {};
		} else {
			if (utils.isSimple(o[fields[i]])) {
				if (cover) {
					o = o[fields[i]] = {};
				} else {
					return;
				}
			} else {
				o = o[fields[i]];
			}
		}
	}

	o[fields[i]] = value;
};

J.prototype.delete = function (field) {
	if (!field) {
		return;
	}

	var fields = field.split('.');

	if (fields.length === 1) {
		if (this.type === 'array') {
			this.jsonObject.splice(utils.parseNumber(field), 1);
			return;
		}
	} else {
		var preField = fields.slice(0, fields.length - 1).join('.');
		var arrValue = this.get(preField);
		
		if (utils.type(arrValue) === 'array') {
			arrValue.splice(utils.parseNumber(fields.pop()), 1);

			this.set(preField, arrValue);
			return;
		}
	}
	
	var f = new Function('delete this.jsonObject.' + field).bind(this);

	try {
		f();
	} catch(e) {}
};

J.prototype.has = function (field) {
	return this.get(field) !== undefined;
};

J.prototype.isEmpty = function () {
	var jsonString = JSON.stringify(this.jsonObject);

	if (utils.isSimple(this.jsonObject)) {
		return this.jsonObject.toString() === '';
	}

	return jsonString === '{}' || jsonString === '[]';
};

J.prototype.empty = function () {
	if (this.type === 'array') {
		this.jsonObject = [];
	} else if (this.type === 'object') {
		this.jsonObject = {};
	} else {
		this.jsonObject = '';
	}
};

J.prototype.store = function (storage, key) {
	if (storage instanceof Storage) {
		this.storage = storage;
		this.storeKey = key;
		storage.setItem(key, JSON.stringify(this.jsonObject));
	} else {
		return false;
	}
};

J.prototype.unstore = function () {
	this.storage && this.storage.removeItem(this.storeKey);
};

module.exports = function (json) {
	return new J(json);
};
