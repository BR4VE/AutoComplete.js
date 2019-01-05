(function() {
	// define the constructor
	function AutoCompleteConstructor(startArray, element, cb = function(){}) {
		// steps
		let generalSteps = [];
		// last step
		let lastStep = [...startArray];
		// general searchForward function
		this.searchForward = inputValue => {
			// loop through last step
			lastStep = lastStep.filter(element => element.includes(inputValue));
			// add last step to general steps in order to turn back later
			generalSteps.push({
				stepValue: inputValue,
				stepArray: lastStep
			});
		};
		// general searcBack function
		this.searchBack = inputValue => {
			// turn 1 step back
			generalSteps.pop();
			// set the last element of general steps as lastStep
			lastStep = generalSteps.length ? generalSteps[generalSteps.length - 1].stepArray : startArray;
		};
		// set the event listener for given element (input)
		document.querySelector(element).addEventListener("keyup", event => {
			// shortcut for length
			let lngt = generalSteps.length;
			// shortcut fot the current value of the provided input
			let value = event.target.value;
			// if there is no previous step or the the user is adding new letters 
			// and also the current value is not empty
			if(value !== "" && (!lngt || value.length > generalSteps[lngt - 1].stepValue.length)) {
				this.searchForward(value);
				// return the values with cb
				cb(lastStep);
			// in order not the execute the function when pressed shift/capslock etc, use else if
			} else if(lngt && ( value.length < generalSteps[lngt - 1].stepValue.length)) {
				this.searchBack(value);
				// return the values with cb
				cb(lastStep);
			}
		});
	}

	window.AutoComplete = AutoCompleteConstructor;

})();