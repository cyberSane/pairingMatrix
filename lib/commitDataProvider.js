var CommitFetcher = require('./commitFetcher');
var CommitParser = require('./commitParser');

function CommitDataProvider(commitFetcher, regexp) {
	this.commitFetcher = commitFetcher;
	this.regexp = regexp;
}

CommitDataProvider.prototype.provideData = function() {
	var commitParser = new CommitParser(this.regexp);
	return commitParser.parse(this.commitFetcher.fetch());
}

module.exports = CommitDataProvider;