function parseNumber(num) {
	num = '' + num;
	num = parseFloat(num.replace(/,/g, '').match(/^[0-9]+(\.\d+)?/));

	if (isNaN(num)) {
		return 0;
	}

	return num;
}

function type(obj) {
	var toStr = Object.prototype.toString.call(obj);

	return toStr.replace(/^\[object\s+(\w+)\]$/, '$1').toLowerCase();
}

function isSimple(val) {
	var t = type(val);

	return t === 'string' ||
		t === 'number' ||
		t === 'boolean' ||
		t === 'undefined';
}

function isNoU(val) {
	var t = type(val);

	return t === 'null' ||
		t === 'undefined';
}

function deepEqual(a, b) {
	if (a === b) {
		return true;
	}
	
	var typeA = type(a);
	var typeB = type(b);

	if (typeA !== typeB) {
		return false;
	}

	if (isNoU(a) || isNoU(b)) {
		return true;
	}

	if (typeA === 'number' && isNaN(a) && isNaN(b)) {
		return true;
	}

	if (isSimple(a)) {
		return a.toString() === b.toString();
	}
	
	if (typeA === 'date') {
		return a.getTime() === b.getTime();
	}

	if (typeA === 'array') {
		if (a.length !== b.length) {
			return false;
		}

		for (var i = 0; i < a.length; i++) {
			if (!deepEqual(a[i], b[i])) {
				return false;
			}
		}

		return true;
	}

	if (typeA === 'object') {
		for (var p in a) {
			if (!deepEqual(a[p], b[p])) {
				return false;
			}
		}

		return true;
	}

	return a === b;
}

module.exports = {
	parseNumber: parseNumber,
	type: type,
	deepEqual: deepEqual,
	isSimple: isSimple,
	isNoU: isNoU
};
