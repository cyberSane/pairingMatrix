# pairingMatrix

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
 
`cd /to your project folder`

 _Create a config.yml and add regexp like_
 
`regexp: \|([\w]*)(?:\/)?([\w]*)\|`


### Now goto your git project folder and run,

`pairing-matrix`

_Now you will see a server running on port 3000. Goto browser and hit localhost:3000_

> In browser there is an option to choose weeks. By that you can configure the matrix to show data for those many weeks. 


