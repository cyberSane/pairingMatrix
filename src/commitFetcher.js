var shell = require('shelljs');

function CommitFetcher(since) {
	this.since = since;
}

CommitFetcher.prototype.fetch = function() {
	var commitsString = shell.exec("git log --oneline --since='" + this.since + "'", {silent: true}).stdout;
	var commits = commitsString.split('\n');
	commits.pop();
	return commits;
}

module.exports = CommitFetcher;