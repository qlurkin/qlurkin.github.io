console.info('IA based on Negamax with alpha/beta pruning')

const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

function winner(state) {
    for(const line of lines) {
        const values = new Set(line.map(i => state[i]))
        if(values.size === 1) {
            const player = values.values().next().value
            if(player !== null)
                return player
        }
    }
    return null
}

function utility(state, player) {
    const theWinner = winner(state)
    if(theWinner === null) {
        return 0
    }
    if(theWinner === player) {
        return 1
    }
    return -1
}

function countEmpty(state) {
    let empty = 0
    for(const elem of state) {
        if(elem === null) {
            empty++
        }
    }
    return empty
}

function gameOver(state) {
    if(winner(state) !== null) {
        return true
    }

    return countEmpty(state) === 0
}

function currentPlayer(state) {
    return (countEmpty(state)+1) % 2
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function moves(state) {
    const res = []
    for(let i = 0; i<state.length; i++) {
        if(state[i] === null) {
            res.push(i)
        }
    }
    shuffleArray(res)
    return res
}

function apply(state, move) {
    const player = currentPlayer(state)
    const res = [...state]
    res[move] = player
    return res
}

function negamaxWithPruning(state, alpha, beta) {
    if(alpha === undefined) {
        alpha = -Infinity
    }
    if(beta === undefined) {
        beta = Infinity
    }

    const player = currentPlayer(state)

    if(gameOver(state)) {
        return [-utility(state, player), null]
    }

    let [theValue, theMove] = [-Infinity, null]
    for(const move of moves(state)) {
        const successor = apply(state, move)
        const [value, _] = negamaxWithPruning(successor, -beta, -alpha)
        if(value > theValue) {
            [theValue, theMove] = [value, move]
        }
        alpha = Math.max(alpha, theValue)
        if(alpha >= beta) {
            break
        }
    }
    return [-theValue, theMove]
}

function next(state) {
    console.time('ia')
    const [_, move] = negamaxWithPruning(state)
    console.timeEnd('ia')
    return move
}

let state = [
    null, null, null,
    null, null, null,
    null, null, null
]

function show(state) {
    let i = 0
    document.querySelectorAll('.cell').forEach(cell => {
        if(state[i] === 0) {
            cell.innerText = '╳'
        }
        else if(state[i] === 1) {
            cell.innerText = '◯'
        }
        else {
            cell.innerText = ' '
        }
        i += 1
    })
}

let i = 0
document.querySelectorAll('.cell').forEach(cell => {
    const index = i
    cell.addEventListener('click', event => {
        if(state[index] === null && !gameOver(state)) {
            state = apply(state, index)
            const move = next(state)
            state = apply(state, move)
            show(state)
        }
    })
    i = i + 1
})
