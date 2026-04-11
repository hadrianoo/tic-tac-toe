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
        board[arr][item] = playerSymbol;

        checkBoardStatus(playerSymbol);

    }

    const checkBoardStatus = (playerSymbol) => {
        if (checkRowStatus(playerSymbol) || checkColStatus(playerSymbol) || checkDiagonalStatus(playerSymbol)) {
            console.log(`player ${playerSymbol} won`)
        }

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


    return {
        getBoard,
        getBoardPosition,
        updateBoard,
    }
})();


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

    let playerChoiceRow = 0;
    let playerChoiceCol = 0;
    let player = "";


    const checkBoardPosition = () => {
        if (gameBoard.getBoardPosition(playerChoiceRow, playerChoiceCol) === 0) {
            gameBoard.updateBoard(playerChoiceRow, playerChoiceCol, player);
        } else {
            console.log("This position it taken, try again");
        }
    }


    const setPlayerChoice = (arr, item, playerSymbol) => {
        playerChoiceRow = arr;
        playerChoiceCol = item;
        player = playerSymbol;
        checkBoardPosition();
        console.table(gameBoard.getBoard())

    }

    return {
        setPlayerChoice,

    }

})();



game.setPlayerChoice(0, 1, "X");
game.setPlayerChoice(1, 1, "X");
game.setPlayerChoice(2, 1, "X");