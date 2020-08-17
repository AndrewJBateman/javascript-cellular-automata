function randomBinary() {
	let max = 1;
	let min = 0;
	return Math.floor(Math.random() * (max - min + 1));
}
// create rows
for (let i = 0; i < 101; i++) {
	let div = document.createElement('div');
	document.querySelector('.row').appendChild(div);
}
function randomizeRow(rowDiv) {
	console.log(rowDiv.childNodes);
	for (let i = 0; i < rowDiv.childNodes.length; i++) {
		let div = rowDiv.childNodes[i];
		div.classList.add(randomBinary() ? 'active' : 'inactive');
	}
}
randomizeRow(document.querySelector('.row'));
function duplicateRow() {
	let allRows = document.querySelectorAll('.row');
	let lastRow = allRows[allRows.length - 1];
	let clone = lastRow.cloneNode(true);
	document.querySelector('.automaton').appendChild(clone);
	processRow(clone, lastRow);
}
function processRow(rowDiv, parentRowDiv) {
	for (let i = 0; i < rowDiv.childNodes.length; i++) {
		let target = rowDiv.childNodes[i];
		let prevSelf = parentRowDiv.childNodes[i];
		let leftSibling =
			prevSelf.previousElementSibling ||
			parentRowDiv.childNodes[parentRowDiv.childNodes.length - 1];
		let rightSibling =
			prevSelf.nextElementSibling || parentRowDiv.childNodes[0];
		let toggleClass = setActiveIfMatchesRule.bind(
			null,
			target,
			leftSibling,
			prevSelf,
			rightSibling
		);
		toggleClass([1, 1, 1], false);
		toggleClass([1, 1, 0], true);
		toggleClass([1, 0, 1], false);
		toggleClass([1, 0, 0], false);
		toggleClass([0, 1, 1], true);
		toggleClass([0, 1, 0], false);
		toggleClass([0, 0, 1], false);
		toggleClass([0, 0, 0], true);
	}
}
function setActiveIfMatchesRule(
	target,
	leftSibling,
	prevSelf,
	rightSibling,
	rule,
	ruleValue
) {
	let matchesRule =
		state(leftSibling) === rule[0] &&
		state(prevSelf) === rule[1] &&
		state(rightSibling) === rule[2];
	if (matchesRule) setIsActive(target, ruleValue);
}
function state(cellDiv) {
	return cellDiv.classList.contains('active') ? 1 : 0;
}
function setIsActive(cellDiv, isActive) {
	if (!!isActive) {
		cellDiv.classList.remove('inactive');
		cellDiv.classList.add('active');
	} else {
		cellDiv.classList.remove('active');
		cellDiv.classList.add('inactive');
	}
}
setInterval(duplicateRow, 100);
