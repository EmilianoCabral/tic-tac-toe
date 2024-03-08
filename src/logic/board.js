import { WINNER_COMBOS } from "../constantes"

export const checkWinnerfrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a]
        }
    }
    return null
}


export const checkEndgame = (newBoard) => {
    return newBoard.every((square) => square != null) 
}