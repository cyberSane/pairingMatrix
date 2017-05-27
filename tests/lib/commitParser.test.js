var assert = require('assert');
var CommitsParser = require('../../lib/commitParser');

function contains(element, elements) {
	return elements.indexOf(element) >= 0;
}

describe('commitsParser', function() {

	var messages = [];

	before(function() {
		messages = [
					'b3e567y [Abhikur]: first commit',
					'4ega564 [Abhikur/Abhishek]: second message',
					'2e67s88 [Abhi/Abhishek]: third commit',
					'3b342d4 [Abhi/Abhishek]: fourth commit'
					];
	})

	it('should get all the pairs including non valid', function() {
		var regex = /\[\w*\/\w*\]|\[\w*\]/gi;
		var commitsParser = new CommitsParser(regex);
		var allPairs = commitsParser.getPairs(messages);

		assert.equal('Abhikur', allPairs[0][0])
		assert.equal('Abhishek', allPairs[1][1])
		assert.equal('Abhi', allPairs[2][0])	
	});

	it('should get indivisuals with commits', function() {
		var regex = /\[\w*\/\w*\]|\[\w*\]/gi;
		var commitsParser = new CommitsParser(regex);
		var parsedData = commitsParser.parse(messages);

		assert.equal(parsedData.indivisuals.length, 1);
		assert.equal(parsedData.indivisuals[0].pair.length, 1)
		assert.equal(parsedData.indivisuals[0].commits, 1)
		assert.equal(parsedData.indivisuals[0].pair[0], 'Abhikur');
	});

	it('should get only valid pairs along with total number of commits', function() {
		var regex = /\[\w*\/\w*\]|\[\w*\]/gi;
		var commitsParser = new CommitsParser(regex);
		var validPairs = commitsParser.parse(messages).validPairs;

		assert.equal(validPairs[0].pair[0], 'Abhikur')
		assert.equal(validPairs[0].pair[1], 'Abhishek')
		assert.equal(validPairs[1].pair[0], 'Abhi')
		assert.equal(validPairs[1].pair[1], 'Abhishek')
		assert.equal(validPairs[0].commits, 1)
		assert.equal(validPairs[1].commits, 2)
	});

	it('should get all committers in the repo', function() {
		var regex = /\[\w*\/\w*\]|\[\w*\]/gi;
		var commitsParser = new CommitsParser(regex);
		var committers = commitsParser.parse(messages).committers;

		assert.equal(committers.length, 3);
		assert.ok(contains('Abhikur', committers));		
		assert.ok(contains('Abhi', committers));		
		assert.ok(contains('Abhishek', committers));		
	})

})