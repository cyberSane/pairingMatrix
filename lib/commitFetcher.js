var shell = require('shelljs');

function CommitFetcher(config) {
}

CommitFetcher.prototype.fetch = function(callback) {
	var commitsString = shell.exec('git log --oneline', {silent: true}).stdout;
	var commits = commitsString.split('\n');
	commits.pop();
	callback(commits)
}

module.exports = CommitFetcher;