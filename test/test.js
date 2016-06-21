var expect = chai.expect

describe('jsObject', function () {
	var obj = {
		strings: {
			one: '1',
			two: '2'
		},
		number: 1,
		arr: [1, 2, 3, 4],
		fun: function () {
			return 1;
		}
	};

	it('#getNumber', function () {
		expect(O.getNumber(obj, 'strings.one')).to.equal(1);
	});

	it('#getString', function () {
		expect(O.getString(obj, 'number')).to.equal('1');
	});

	it('#isEmpty', function () {
		var empty = {};
		
		expect(O.isEmpty(obj)).to.equal(false);
		expect(O.isEmpty(empty)).to.equal(true);
	});

	it('#createField', function () {
		O.createField(obj, 'a.b.c', 1);
		expect(obj.a.b.c).to.equal(1);
	});
});
