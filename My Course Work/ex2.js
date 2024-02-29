#! /usr/bin/env node

"use strict";
var util = require("util");
var path = require("path");
var fs = require("fs");
var Transform = require("stream").Transform;

// var getStdin = require("get-stdin");

var args = require("minimist")( process.argv.slice(2), {
	boolean: ["help", "in", "out"],
        string: ["file"]
} );



var BASE_PATH = path.resolve(
	process.env.BASE_PATH || __dirname
);

var OUTFILE = path.join(BASE_PATH, "out.txt");

// console.log(args);


	if (args.help) {
	  printHelp();
	} else if (args.in || args._.includes("-")) {
		processFile(process.stdin);
	} else if (args.file) {
		let stream = fs.createReadStream(path.join(BASE_PATH, args.file))
		processFile(stream)
	} else {
	  	error("Incorrect Usage.", true);
	}
  
// printHelp();



function processFile(inStream) {
	var outStream = inStream;

	var upperStream = new Transform({
		transform(chunk,enc,cb){
			this.push(chunk.toString().toUpperCase());
			setTimeout(cb,500);
			cb();
		}
	});

	outStream = outStream.pipe(upperStream);


	var targetStream;
	if (args.out) {
		targetStream = process.stdout
	} else {
		targetStream = fs.createWriteStream(OUTFILE);
	}
	
	process.stdout;
	outStream.pipe(targetStream);
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
	console.log("--out 				  print to stdout");
    console.log("");
}