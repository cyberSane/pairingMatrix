const _ = require('lodash');

class CommitsParser {
  constructor(regex, excludedPairs=[]) {
    this.regex = regex;
    this.excludedPairs = excludedPairs;
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
    const pairs = messages.map(extractString.bind(null, this.regex)).filter(Boolean);
    const excludedPairs = this.excludedPairs;
    return _.reject(pairs.map(function(unformattedPair) {
      const pair = unformattedPair.split('/');
      return _.difference(pair, excludedPairs)
    }), _.isEmpty);
  }
}

function parseCommitPairsWithTotalCommits(pair) {
  const pairs = validPairs(pair);
  return getCommittersWithCommits(pairs);
}

function extractString(regex, msg) {
  const match = msg.match(regex);
  return (match) ? match[0].substring(1, match[0].length - 1) : match;
}

function getIndividuals(pairs) {
  const individuals = pairs.filter(function (pair) {
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
  const lowerCasedPairs = _.flatten(pairs).map(function (indivisual) {
    return indivisual.toLowerCase();
  });
  return _.uniq(lowerCasedPairs);
}

function getCommittersWithCommits(pairs) {
  const pairingData = {};
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