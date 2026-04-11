const gameBoard = (() => {
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    const getBoard = () => {
        return board;
    };

    const getBoardPosition = (arr, item) => board[arr][item];

    const updateBoard = (arr, item, playerSymbol) => {
        if (getBoardPosition(arr, item) === 0) {
            board[arr][item] = playerSymbol;
            if (checkDrawStatus()) {
                return checkBoardStatus(playerSymbol);
            } else {
                return "Draw";
            }
        } else {
            return "This position it taken, try again";
        }
    }

    const checkBoardStatus = (playerSymbol) => {
        if (checkRowStatus(playerSymbol) || checkColStatus(playerSymbol) || checkDiagonalStatus(playerSymbol)) {
            return playerSymbol;
        }
        return "Continue";
    }

    const checkRowStatus = (symbol) => {
        getBoard().forEach(row => {
            let symbolCount = 0;
            row.forEach(item => {
                if (item === symbol) {
                    symbolCount++;
                }
            })
            if (symbolCount === 3) {
                return true;
            }
        })
    }

    const checkColStatus = (symbol) => {
        for (let i = 0; i <= 3; i++) {
            if (getBoard()[0][i] === symbol &&
                getBoard()[1][i] === symbol &&
                getBoard()[2][i] === symbol) {
                return true;
            }
        }
    }

    const checkDiagonalStatus = (symbol) => {
        if (getBoard()[0][0] === symbol &&
            getBoard()[1][1] === symbol &&
            getBoard()[2][2] === symbol) {
            return true;
        }
        if (getBoard()[0][2] === symbol &&
            getBoard()[1][1] === symbol &&
            getBoard()[2][0] === symbol) {
            return true;
        }
    }

    const checkDrawStatus = () => gameBoard.getBoard().flat().includes(0);

    return {
        getBoard,
        getBoardPosition,
        updateBoard,
    }
})();


function createPlayer(name, symbol) {
    const playerName = name;
    const playerSymbol = symbol;
    let playerScore = 0;

    const getPlayerName = () => playerName;
    const getPlayerSymbol = () => playerSymbol;
    const getPlayerScore = () => playerScore;
    const incrementPlayerScore = () => playerScore++;

    return {
        getPlayerName,
        getPlayerSymbol,
        getPlayerScore,
        incrementPlayerScore,
    }
};

const game = (() => {

    let playerChoiceRow = 0;
    let playerChoiceCol = 0;
    let player = "";

    const setPlayerChoice = (arr, item, playerSymbol) => {
        playerChoiceRow = arr;
        playerChoiceCol = item;
        player = playerSymbol;

        console.log(gameBoard.updateBoard(playerChoiceRow, playerChoiceCol, player));
        console.table(gameBoard.getBoard());
    }

    return {
        setPlayerChoice,

    }

})();


// game.setPlayerChoice(0, 0, "X");
// game.setPlayerChoice(1, 1, "X");
// game.setPlayerChoice(2, 2, "X");

// game.setPlayerChoice(0, 1, "X");
// game.setPlayerChoice(1, 1, "X");
// game.setPlayerChoice(2, 1, "X");

// game.setPlayerChoice(0, 2, "O");
// game.setPlayerChoice(1, 2, "O");
// game.setPlayerChoice(2, 2, "O");

game.setPlayerChoice(0, 2, "O");
game.setPlayerChoice(1, 1, "O");
game.setPlayerChoice(2, 1, "O");

game.setPlayerChoice(0, 1, "X");
game.setPlayerChoice(1, 2, "X");
game.setPlayerChoice(0, 0, "X");


console.log(gameBoard.getBoard().flat().includes(0), "Checker: true = draw")