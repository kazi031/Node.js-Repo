#! /usr/bin/env node

"use strict";
var util = require("util");
var path = require("path");
var fs = require("fs");

// var getStdin = require("get-stdin");

var args = require("minimist")( process.argv.slice(2), {
	boolean: ["help", "in"],
        string: ["file"]
} );

var BASE_PATH = path.resolve(
	process.env.BASE_PATH || __dirname
);

// console.log(args);

import("get-stdin").then((getStdin) => {
	if (args.help) {
	  printHelp();
	} else if (args.in || args._.includes("-")) {
		if (typeof getStdin === "function") {
			getStdin().then(processFile).catch(error);
		  } else {
			error("getStdin is not a function.");
		  }
	} else if (args.file) {
	  fs.readFile(path.join(BASE_PATH, args.file), function onContents(err, contents) {
		if (err) {
		  error(err.toString());
		} else {
		  processFile(contents.toString());
		}
	  });
	} else {
	  error("Incorrect Usage.", true);
	}
  }).catch((err) => {
	console.error("Error loading get-stdin:", err);
  });
// printHelp();



function processFile(contents) {
	contents = contents.toUpperCase();
	process.stdout.write(contents);
	// console.log(contents); // prints hex data
	 
}


function error(msg, includeHelp = false) {
	console.error(msg);
	if (includeHelp) {
		console.log("");
		printHelp();
	}
}

function printHelp() {
    console.log("ex1 usage:");
    console.log("  ex1.js --help");
    console.log("");
    console.log("--help               print this help");
    console.log("--file={FILENAME}    process the file");
	console.log("--in, -              process stdin");
    console.log("");
}