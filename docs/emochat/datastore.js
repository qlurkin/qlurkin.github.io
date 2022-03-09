export function Datastore(initial) {
	let state = initial
	const observers = []

	function getState() {
		return state
	}
	
	function updateState(fun) {
		state = fun(state)
		console.log(state.toJS())
		for(let observer of observers) {
			observer(state)
		}
	}
	
	function subscribe(fun) {
		observers.push(fun)
	}

	return {
		getState,
		updateState,
		subscribe
	}
}

export default Datastore






