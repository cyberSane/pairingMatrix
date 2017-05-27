var assert = require('assert');
var CommitsFetcher = require('../../lib/commitFetcher');

describe('commitsFetcher', function() {

	it('should call the callBack provided as it gets commits', function() {
		var commitsFetcher = new CommitsFetcher();
		var callbackCalled = false;

		var callback = function(commits) {
			callbackCalled = true;
		}

		commitsFetcher.fetch(callback);
		assert.equal(callbackCalled, true);
	});

})