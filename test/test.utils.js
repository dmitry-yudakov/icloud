'use strict';

var expect = require('chai').expect;
var icloud = require('../index.js');

describe('Apple Utils', function() {
    var instance = icloud();

    var date = new Date(2016, 11, 6, 12, 45);
    var appleDate = [ 20161206, 2016, 12, 6, 12, 45, 765 ];

    it('decodes apple date', function() {
        expect( instance.parseDate(appleDate) ).to.deep.equal(date);    
    });
    
    it('generates apple date', function() {
        expect( instance.generateDate(date) ).to.deep.equal(appleDate);    
    });
});