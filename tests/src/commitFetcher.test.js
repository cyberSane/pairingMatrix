var assert = require('assert');
var CommitsFetcher = require('../../src/commitFetcher');

describe('commitsFetcher', function() {

	it('should fetch the git commits', function() {
		var since = '1 weeks ago';
		var commitsFetcher = new CommitsFetcher(since);
		var commits = commitsFetcher.fetch();
		assert.ok(commits.length > 1);
		assert.equal(commits[commits.length - 1], '619e821 Initial commit');
	});

})