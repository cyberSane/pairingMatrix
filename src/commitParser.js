const _ = require('lodash');

class CommitsParser {
  constructor(regex) {
    this.regex = regex;
  }

  parse(messages) {
    const pairs = this.getPairs(messages);
    return {
      individuals: getIndividuals(pairs),
      validPairs: parseCommitPairsWithTotalCommits(pairs),
      committers: getAllCommitters(pairs)
    }
  }

  getPairs(messages) {
    var pairs = messages.map(extractString.bind(null, this.regex)).filter(Boolean);
    return pairs.map(function (pair) {
      return pair.split('/');
    });
  }
}

function parseCommitPairsWithTotalCommits(pairs) {
  var pairs = validPairs(pairs);
  return getCommittersWithCommits(pairs);
}

function extractString(regex, msg) {
  var match = msg.match(regex);
  return (match) ? match[0].substring(1, match[0].length - 1) : match;
}

function getIndividuals(pairs) {
  var individuals = pairs.filter(function (pair) {
    return pair.length === 1
  });
  return getCommittersWithCommits(individuals);
}

function validPairs(pairs) {
  return pairs.filter(function (pair) {
    return pair.length === 2;
  })
}

function getAllCommitters(pairs) {
  var lowerCasedPairs = _.flatten(pairs).map(function (indivisual) {
    return indivisual.toLowerCase();
  });
  return _.uniq(lowerCasedPairs);
}

function getCommittersWithCommits(pairs) {
  var pairingData = {};
  pairs.forEach(function (pair) {
    if (pairingData[JSON.stringify(pair)])
      pairingData[JSON.stringify(pair)]++;
    else
      pairingData[JSON.stringify(pair)] = 1;
  });
  return Object.keys(pairingData).map(function (pair) {
    return {pair: JSON.parse(pair), commits: pairingData[pair]};
  });
}

module.exports = CommitsParser;