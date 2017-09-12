const CommitParser = require('./commitParser');

class CommitDataProvider {
  constructor(commitFetcher, regexp, excludedPairs) {
    this.commitFetcher = commitFetcher;
    this.regexp = regexp;
    this.excludedPairs = excludedPairs;
  }

  provideData() {
    const commitParser = new CommitParser(this.regexp, this.excludedPairs);
    return commitParser.parse(this.commitFetcher.fetch());
  }
}

module.exports = CommitDataProvider;