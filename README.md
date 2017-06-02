# pairingMatrix
[![Build Status](https://travis-ci.org/SARAN-thala/pairingMatrix.svg?branch=master)](https://travis-ci.org/SARAN-thala/pairingMatrix)  [![npm](https://img.shields.io/npm/v/npm.svg)]() [![Code Climate](https://codeclimate.com/github/SARAN-thala/pairingMatrix/badges/gpa.svg)](https://codeclimate.com/github/SARAN-thala/pairingMatrix) 

[![NPM](https://nodei.co/npm/pairing-matrix.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pairing-matrix/)

<img src="/images/pairingMatrix.jpeg" width="500" height="500" />

## What is pairing-matrix

* Its a tool to show git commits pairing matrix 
* Monitor your team's health
* Pair rotation

## What pairing-matrix represents?

* Darker the connections more commits pushed together.
* Red cirle around an individual shows commits of an individual.

## installation

`$ npm install pairing-matrix -g`

## Usage

* Provide a regexp of your git commit messages in a file named config.yml
* There is a default regexp in case you do not provide any config file.
  Default regexp matches messages in this format- |story#|Pair1/Pair2| message
 
```
  cd /to your project folder
  
  //Create a config.yml and add your regexp matching to your git commit pairs.
  //For example,
  regexp: \|([\w]*)(?:\/)?([\w]*)\|   //this will match |Pair1/Pair2| format
  regexp: \[([\w]*)(?:\/)?([\w]*)\]   //this will match [Pair1/Pair2] format
  
  /* There is a default regexp. In case, you don't create config.yml file then
     |pair1/pair2| format will be used to match the commit pairs. */
```

### Now goto your git project folder and run,

`$ pairing-matrix`

_Now you will see a server running on port 3000. Goto browser and hit localhost:3000_

> In browser there is an option to choose weeks. By that you can configure the matrix to show data for those many weeks.

## License

```Copyright (c) 2017 Abhishek Thakur

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.``` 
