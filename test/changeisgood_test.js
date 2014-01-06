'use strict';

var changeisgood = require('../lib/changeisgood.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['awesome'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.equal(changeisgood.maxPartitions(), 'awesome', 'should be awesome.');
    test.done();
  },
  'should return number of ways to make change': function(test) {
    test.expect(3);
    // tests here
    test.equal(changeisgood.maxPartitions(1), 1, 'should return 1 way when amount is 1 cent');
    test.equal(changeisgood.maxPartitions(5), 2, 'should return 2 ways when amount is 5 cents');
    test.equal(changeisgood.maxPartitions(10), 4, 'should return 4 ways when amount is 10 cents');
    test.done();
  }
};
