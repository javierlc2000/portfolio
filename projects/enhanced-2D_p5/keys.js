var keys = new Set();
function keyPressed() {
	keys.add(key);
}
function keyReleased() {
	keys.delete(key);
}