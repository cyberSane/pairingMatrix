const CommitParser = require('./commitParser');

class CommitDataProvider {
  constructor(commitFetcher, regexp) {
    this.commitFetcher = commitFetcher;
    this.regexp = regexp;
  }

  provideData() {
    const commitParser = new CommitParser(this.regexp);
    return commitParser.parse(this.commitFetcher.fetch());
  }
}

module.exports = CommitDataProvider;