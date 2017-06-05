const assert = require('assert');
const CommitsFetcher = require('../../src/commitFetcher');

describe('commitsFetcher', () => {

  it('should fetch the git commits', () => {
    const since = '5 weeks ago';
    const commitsFetcher = new CommitsFetcher(since);
    const commits = commitsFetcher.fetch();
    assert.ok(commits.length > 1);
    assert.equal(commits[commits.length - 1], '619e821 Initial commit');
  });

});