const width = 500
const hieght = 500
const res = 25

var state, neighbours, orginState
var cols, rows
var paused = true
var fmRate = 150

function setup() {
	var canvas = createCanvas(width, hieght)
	canvas.parent('canvas')

	cols = width / res
	rows = hieght / res
	state = generateGrid(cols, rows)
	neighbours = generateGrid(cols, rows)

	visualize()

	function generateGrid(cols, rows) {
		var arr = new Array(cols)
		for (var i = 0; i < arr.length; i++) {
			arr[i] = new Array(rows).fill(0)
		}
		return arr
	}
}

function mousePressed() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (
				paused === true &&
				mouseX > i * res &&
				mouseX < i * res + res &&
				mouseY > j * res &&
				mouseY < j * res + res
			) {
				if (state[i][j] == 0) {
					state[i][j] = 1
				} else {
					state[i][j] = 0
				}
				break
			}
		}
	}
	visualize()
}

function draw() {
	if (paused === false) {
		runNeighbours()
		runState()
		visualize()
	}
	if (paused === true) {
		runNeighbours()
		visualize()
	}
}

function visualize() {
	background(255)
	strokeWeight(2)
	stroke(0, 0, 0, 20)

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (state[i][j] == 1) {
				fill(0)
			} else {
				fill(255)
			}
			var x = i * res
			var y = j * res
			rect(x, y, res, res)
			fill(3, 252, 28)
			runNeighbours()
			// text(neighbours[i][j], x, y, res, res) // Debug
		}
	}
}

function runNeighbours() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			calcNeighbours(i, j)
		}
	}
}

function calcNeighbours(i, j) {
	sum = 0
	for (var u = -1; u <= 1; u++) {
		for (var v = -1; v <= 1; v++) {
			var x = i + u
			var y = j + v
			if (x >= 0 && x < cols && y >= 0 && y < rows) {
				sum += state[x][y]
			}
			if (x == i && y == j) {
				sum -= state[x][y]
			}
		}
	}
	neighbours[i][j] = sum
}

function runState() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			calcState(i, j)
		}
	}
}

function calcState(i, j) {
	if (state[i][j] == 1 && neighbours[i][j] < 2) {
		state[i][j] = 0
	} else if (
		state[i][j] == 1 &&
		(neighbours[i][j] == 2 || neighbours[i][j] == 3)
	) {
		state[i][j] = 1
	} else if (state[i][j] == 1 && neighbours[i][j] > 3) {
		state[i][j] = 0
	} else if (state[i][j] == 0 && neighbours[i][j] == 3) {
		state[i][j] = 1
	}
}

function keyTyped() {
	if (key === ' ') {
		playPause()
	}
	//DOESNT WORK
	if (key === 'w') {
		wipe()
	}
	//DOESNT WORK
	if (key === 'r') {
		randomize()
	}
}

function playPause() {
	paused = !paused
}

function wipe() {
	paused = true
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			state[i][j] = 0
		}
	}
}

function randomize() {
	paused = true
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			state[i][j] = Math.round(Math.random(1))
		}
	}
}

// function fmRate(val) {
// 	console.log(val)
// }
