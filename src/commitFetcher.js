const shell = require('shelljs');

class CommitFetcher {
  constructor(since) {
    this.since = since;
  }

  fetch() {
    const commitsString = shell.exec("git log --oneline --since='" + this.since + "'", {silent: true}).stdout;
    const commits = commitsString.split('\n');
    commits.pop();
    return commits;
  }
}

module.exports = CommitFetcher;