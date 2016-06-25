var expect = chai.expect

describe('json param is an object value', function () {
	var o = {
		obj: {
			str: 'string',
			num: 0,
			arr: [1, 'string', [1, 2, 3]]
		},
		str: 'string',
		num: 1,
		arr: [1, 'string', [1, 2, 3]]
	};

	var j;

	beforeEach(function () {
		j = J(o);
	});

	describe('#get', function () {
		it('`obj.str` field should be equal to `string`', function () {
			expect(j.get('obj.str')).to.equal('string');
		});
		it('`num` field should be equal to 1', function () {
			expect(j.get('num')).to.equal(1);
		});
		it('`obj.arr.1` field should be equal to `string`', function () {
			expect(j.get('obj.arr.1')).to.equal('string');
		});
		it('`undefined` field should be equal to undefined', function () {
			expect(j.get('undefined')).to.equal(undefined);
		});
	});

	describe('#getString', function () {
		it('`obj.num` field should be equal to equal to `0`', function () {
			expect(j.getString('obj.num')).to.equal('0');
		});
		it('`undefined` field should be equal to ``', function () {
			expect(j.getString('undefined')).to.equal('');
		});
		it('`undefined.undefined` field should be equal to ``', function () {
			expect(j.getString('undefined.undefined')).to.equal('');
		});
	});

	describe('#getNumber', function () {
		it('`obj.str` field should be equal to equal to 0', function () {
			expect(j.getNumber('obj.num')).to.equal(0);
		});
		it('`obj.arr.2.1` field should be equal to 2', function () {
			expect(j.getNumber('obj.arr.2.1')).to.equal(2);
		});
		it('`undefined.undefined` field should be equal to 0', function () {
			expect(j.getNumber('undefined.undefined')).to.equal(0);
		});
	});

	describe('#equal', function () {
		it('`obj.num` field should be equal to 0', function () {
			expect(j.equal('obj.num', 0)).to.be.true;
		});
		it('`undefined.undefined` field should be equal to ``', function () {
			expect(j.equal('undefined.undefined', undefined)).to.true;
		});
		it('`obj.arr` field should not be equal to [1, `string`, [1, 2, 3]]', function () {
			expect(j.equal('obj.arr', [1, 'string', [1, 2, 3]])).to.false;
		});
	});
	
	describe('#deepEqual', function () {
		it('`obj.num` field should be deeply equal to 0', function () {
			expect(j.deepEqual('obj.num', 0)).to.be.true;
		});
		it('`undefined.undefined` field should be deeply equal to ``', function () {
			expect(j.deepEqual('undefined.undefined', undefined)).to.true;
		});
		it('`obj.arr` field should be deeply equal to [1, `string`, [1, 2, 3]]', function () {
			expect(j.deepEqual('obj.arr', [1, 'string', [1, 2, 3]])).to.true;
		});
	});

	describe('#set', function () {
		it('set `num` field to be 11', function () {
			j.set('num', 11);

			var oo = j.get();
			expect(oo.num).to.equal(11);
		});
		it('can not set `obj.num.num` when `cover` argument is false value', function () {
			j.set('num.num', 0);
			
			var oo = j.get();
			expect(oo.num).to.equal(1);
		});
		it('set `obj.num.num` to be 0 when `cover` argument is true value', function () {
			j.set('num.num', 0, true);
			
			var oo = j.get();
			expect(oo.num.num).to.equal(0);
		});
	});

	describe('#delete', function () {
		it('delete `num` field', function () {
			j.delete('num');

			expect(j.get('num')).to.equal(undefined);
		});
		it('delete `arr.0`', function () {
			j.delete('arr.0');

			expect(j.get('arr')[0]).to.equal('string');
			expect(j.get('arr').length).to.equal(2);
		});
	});

	describe('#has', function () {
		it('`num` field exists', function () {
			expect(j.has('num')).to.true;
		});
		it('`obj.arr.0` field exists', function () {
			expect(j.has('obj.arr.0')).to.true;
		});
		it('`undefined.undefined` field does not exist', function () {
			expect(j.has('undefined.undefined')).to.false;
		});
	});

	describe('#isEmpty', function () {
		it('`{}` is empty', function () {
			expect(J({}).isEmpty()).to.true;
		});
		it('`[]` is empty', function () {
			expect(J([]).isEmpty()).to.true;
		});
		it('`{a:1}` is not empty', function () {
			expect(J({a:1}).isEmpty()).to.false;
		});
		it('`[1]` is empty', function () {
			expect(J([1]).isEmpty()).to.false;
		});
	});

	describe('#empty', function () {
		it('{a:1}`s empty style is `{}`', function () {
			var j = J({a:1});
			j.empty();
			expect(j.get()).to.deep.equal({});
		});
		it('[1,2,3]`s empty style is `[]`', function () {
			var j = J([1,2,3]);
			j.empty();
			expect(j.get()).to.deep.equal([]);
		});
	});

	describe('#store', function () {
		it('store json to localStorage', function () {
			var j = J({a:1});
			var key = '__' + Date.now() + '__';

			j.store(localStorage, key);
			expect(localStorage.getItem(key)).to.equal(JSON.stringify({a:1}));
			localStorage.removeItem(key);
		});
		it('store json to sessionStorage', function () {
			var j = J({a:1});
			var key = '__' + Date.now() + '__';

			j.store(sessionStorage, key);
			expect(sessionStorage.getItem(key)).to.equal(JSON.stringify({a:1}));
			sessionStorage.removeItem(key);
		});
	});
});
