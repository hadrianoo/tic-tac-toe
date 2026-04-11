const gameBoard = (() => {
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    const getBoard = () => {
        return board;
    };

    const setBoard = (arr, item, playerSymbol) => {
        board[arr][item] = playerSymbol;
    }

    return {
        getBoard,
        setBoard,
    }
})();


console.log(gameBoard.setBoard(0, 1, "X"))
console.table(gameBoard.getBoard());


function createPlayer(name) {
    let playerScore = 0;

    const getPlayerName = () => name;
    const getPlayerScore = () => playerScore;
    const incrementPlayerScore = () => playerScore++;

    return {
        getPlayerName,
        getPlayerScore,
        incrementPlayerScore,
    }

};

const game = (() => {

})();

