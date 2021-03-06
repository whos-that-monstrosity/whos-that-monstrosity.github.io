//! --------------------------------------------------------------------------------------------------------------------
//! Copyright (C) 2019 Team Chipotle
//! MIT License
//! --------------------------------------------------------------------------------------------------------------------

/**
 * A pseudo random number generator using the Xorshift32 algorithm.
 * https://en.wikipedia.org/wiki/Xorshift#Example_implementation
 */

// -------------------------------------------------------------------------------------------------------------
// | Constants:                                                                                                |
// -------------------------------------------------------------------------------------------------------------

const thisMAX = Math.pow(2, 32);

// -------------------------------------------------------------------------------------------------------------
// | Fields:                                                                                                   |
// -------------------------------------------------------------------------------------------------------------

var state;

// -------------------------------------------------------------------------------------------------------------
// | Constructors:                                                                                             |
// -------------------------------------------------------------------------------------------------------------

function betterrandinit(seed) {
	this.state = seed == null ? Math.random() * thisMAX : seed;
	this.generate();
}

// -------------------------------------------------------------------------------------------------------------
// | Methods:                                                                                                  |
// -------------------------------------------------------------------------------------------------------------

function betterrandnextInt(arg1, arg2) {
	const min = arg2 == null ? 0 : arg1;
	const max = arg2 == null ? arg1 : arg2;

	return Math.floor(this.betterrandnextFloat() * (max - min)) + min;
}

function betterrandnextFloat() {
	const x = this.state;
	this.generate();
	return x / thisMAX + 0.5;
}

// -------------------------------------------------------------------------------------------------------------
// | Internal:                                                                                                 |
// -------------------------------------------------------------------------------------------------------------

function generate() {
	let x = this.state;
	x ^= x << 13;
	x ^= x >> 17;
	x ^= x << 5;
	this.state = x;
}
