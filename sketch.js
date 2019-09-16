const width = 300
const hieght = 300
const res = 100

let state, neighbours
let cols, rows
var count = 0
function setup() {
	createCanvas(width, hieght)
	cols = width / res
	rows = hieght / res
	state = generateGrid(cols, rows)
	neighbours = generateGrid(cols, rows)
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			state[i][j] = Math.round(Math.random(1))
		}
	}

	
}

function draw() {
	visualize()
	console.log(count)
	count++
}

function visualize() {
	background(255)
	strokeWeight(2)
	stroke(0, 0, 0, 20)

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (state[i][j] == 1) {
				fill(0)
			} else {
				fill(255)
			}
			var x = i * res
			var y = j * res

			// text('1', x, y, res, res)
			rect(x, y, res, res)
		}
	}
}

function generateGrid(cols, rows) {
	let arr = new Array(cols)

	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows)
	}
	return arr
}

function calcNeighbours(i, j) {
	sum = 0
	for (let u = -1; u < 2; u++) {
		for (let v = -1; v < 2; v++) {
			var x = i + u
			var y = j + v
			sum += state[x][y]
		}
	}
	neighbours[i][j] = sum
}

function calcState(i, j) {
	if (state[i][j] == 1) {
		if (neighbours[i][j] < 2) {
			state[i][j] = 0
		} else if (neighbours[i][j] > 3) {
			state[i][j] = 0
		} else if (neighbours[i][j] == 2 || neighbours[i][j] == 3) {
			state[i][j] = 1
		}
	} else {
		if (neighbours[i][j] == 3) {
			state[i][j] = 1
		}
	}
}

function itteraton() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			calcNeighbours(i, j)
		}
	}
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			calcState(i, j)
		}
	}
}
