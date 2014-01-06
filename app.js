// call the max change function and log the answer

var changeisgood = require('./lib/changeisgood');

var maxPartitions = changeisgood.maxPartitions;
var countcoins = changeisgood.countcoins;
var callInfo = changeisgood.getCalls;

var amt = 6;
//console.log("the max number of ways to split a: ", amt, "is: ", maxPartitions(amt), callInfo());
console.log("the max number of ways to split a: ", amt, "is: ", countcoins(amt));