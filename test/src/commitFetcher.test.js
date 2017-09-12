const assert = require('assert');
const CommitsFetcher = require('../../src/commitFetcher');
const sinon = require('sinon');
const shell = require('shelljs');

describe('commitsFetcher', () => {

  it('should fetch the git commits', () => {
    const since = '1 weeks ago';
    const commitsFetcher = new CommitsFetcher(since);
    const mockedShell = sinon.mock(shell)
    const execCommand = "git log --oneline --since='1 weeks ago'"
    const execOutput = {stdout: 'Commit1\nCommit2\nCommit3\n'}

    mockedShell.expects('exec').withExactArgs(execCommand, {silent: true}).returns(execOutput);

    const commits = commitsFetcher.fetch();
    
    mockedShell.verify();
    assert.deepEqual(commits, ['Commit1', 'Commit2', 'Commit3']);
  });

});