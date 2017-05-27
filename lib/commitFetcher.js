var shell = require('shelljs');

function CommitFetcher(config) {
}

CommitFetcher.prototype.fetch = function(callback) {
	var commits = shell.exec('git log --oneline', {silent: true}).stdout;
	callback(commits)
}

module.exports = CommitFetcher;