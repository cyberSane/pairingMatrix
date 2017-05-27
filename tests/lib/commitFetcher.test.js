var assert = require('assert');
var CommitsFetcher = require('../../lib/commitFetcher');

describe('commitsFetcher', function() {

	it('should fetch the git commits', function() {
		var commitsFetcher = new CommitsFetcher();
		var commits = commitsFetcher.fetch();

		assert.ok(commits.length > 1);
		assert.equal(commits[commits.length - 1], '619e821 Initial commit');
	});

})