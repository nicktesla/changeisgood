/*
 * changeisgood
 * https://github.com/nicktesla/changeisgood
 *
 * Copyright (c) 2014 nicktesla
 * Licensed under the MIT license.
 */

'use strict';

var containsIth = function(n,x) {
  return (n>0 && x>n)?1:0
}
var allowedChange = [1, 5, 10, 25, 100, 500, 1000, 2000, 5000];

var isExactChange = function(x) {
  return allowedChange.indexOf(x) > -1;
}

//takes the amount and the partition label and creates a unique string
var genCacheKey = function(label, amount) {
  return label && amount? label.toString()+amount.toString():"";
}
//use trick to compress what would otherwise be a 2d array into a "1d" hash
var cache = {};
var recCalls = 0;
var cacheCalls = 0;
var runTime = 0;

// number of partitions of x where i is the smallest number
function ithPartitions (i, x) {
  var cacheKey = genCacheKey(i, x),
      ith = allowedChange.indexOf(i),
      startTime = Date.now(),
      total; 
  if(x == null || i == null) {
    return "awesome";
  }
  else if(cache[cacheKey]) {
    //console.log("found in cache: ", cacheKey);
    cacheCalls++;
    return cache[cacheKey];
  }
  else if(x < 1 || i < 1) {
    total = 0;
  }
  else if(x == i && isExactChange(x)) {
    total = 1; 
  }
  else if(i > x) {
    total = 0;
  }
  else {
    //console.log("making recursive call for", cacheKey);
    total = 0;
    //find i in allowed changes and sum over all terms greater or equal to i
    for(var j = ith; j < allowedChange.length; j++) {
      var change = allowedChange[j];
      if(containsIth(change, x)) {
        recCalls++;    
        total += ithPartitions(change, x-i);        
      }
    }
  }
  if(!cache[cacheKey]) {
    //console.log("not in cache...adding to cache ", cacheKey, total);
    cache[cacheKey] = total;  
    for(var j =1; j < 5; j++) {
      var currKey = genCacheKey(i, x+j);
      //console.log("forward caching: ")
      cache[currKey] = total;
    }    
  }
  runTime += (Date.now() - startTime)/60000
  return cache[cacheKey];
};

//take an amount x and return the number of ways it can be split
function maxPartitions(x) {
  if(x == null) {
    return "awesome";
  }
  else {
  // sum up all the allowed ith partitions
    var total = 0;
    for(var j = 0; j < allowedChange.length; j++) {
      var change = allowedChange[j];
      if(x >= change) {
        total += ithPartitions(change, x);        
      }
    }
    return total; 
  } 
}

function countcoins(t) {
  //iterative algorithm from rossetta code
  'use strict';
  var o = allowedChange;
  var targetsLength = t + 1;
  var operandsLength = o.length;
  t = [1];
 
  for (var a = 0; a < operandsLength; a ++) {
    for (var b = 1; b < targetsLength; b ++) {
 
      // initialise undefined target
      t[b] = t[b] ? t[b] : 0;
 
      // accumulate target + operand ways
      t[b] += (b < o[a]) ? 0 : t[b - o[a]];
    }
  }
 
  return t[targetsLength - 1];
}

function getCalls() {
  return {recCount: recCalls, cacheCount: cacheCalls, runTime: runTime};
}



exports.maxPartitions = maxPartitions
exports.getCalls = getCalls;
exports.countcoins = countcoins;