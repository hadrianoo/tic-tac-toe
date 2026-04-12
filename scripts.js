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
        for (let row of getBoard()) {
            let symbolCount = 0;
            row.forEach(item => {
                if (item === symbol) symbolCount++;
            })
            if (symbolCount === 3) {
                return true;
            }
        }
        return false;
    }

    const checkColStatus = (symbol) => {
        for (let i = 0; i <= 3; i++) {
            if (getBoard()[0][i] === symbol &&
                getBoard()[1][i] === symbol &&
                getBoard()[2][i] === symbol) {
                return true;
            }
        }
        return false;
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
        return false;
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
    let playerChoiceRow = 0;
    let playerChoiceCol = 0;

    const getPlayerName = () => playerName;
    const getPlayerSymbol = () => playerSymbol;
    const getPlayerScore = () => playerScore;
    const incrementPlayerScore = () => playerScore++;

    const setPlayerChoice = (arr, item) => {
        playerChoiceRow = arr;
        playerChoiceCol = item;
    };

    const getPlayerChoice = () => {
        return { playerChoiceRow, playerChoiceCol, playerSymbol };
    };

    return {
        getPlayerName,
        getPlayerSymbol,
        getPlayerScore,
        incrementPlayerScore,
        setPlayerChoice,
        getPlayerChoice
    }
};

const game = (() => {

    let symbol = "";
    let gameStatus = ""

    const setFirstPlayer = () => {
        let random = Math.floor(Math.random() * 2);
        return random === 0 ? symbol = "X" : symbol = "O";
    }
    setFirstPlayer()

    const getSymbol = () => symbol;

    const handlePlayerChoice = (obj) => {

        if (getSymbol() === obj.playerSymbol) {
            console.log("Let the next player choose");
            return "Let the next player choose"
        }
        symbol = obj.playerSymbol;
        gameStatus = gameBoard.updateBoard(obj.playerChoiceRow, obj.playerChoiceCol, obj.playerSymbol);
        checkGameStatus(gameStatus);
    }

    const checkGameStatus = (status) => {

        switch (status) {
            case "X": {
                console.log(`Player ${player1.getPlayerName()} won`)
                break;
            }
            case "O": {
                console.log(`Player ${player2.getPlayerName()} won`)
                break;
            }
            case "Draw": {
                console.log("Draw: Game over")
                break;
            }
            case "Continue": {
                if (getSymbol() === "X") {
                    console.log(`Player ${player2.getPlayerName()} move`)
                } else {
                    console.log(`Player ${player1.getPlayerName()} move`)
                }
                break;
            }
        }
    }
    return {
        handlePlayerChoice,
        getSymbol,
    }
})();

const displayController = (() => {


    const container = document.querySelector(".container");
    const board = document.querySelector(".board");


    const renderBoard = () => {
        board.innerHTML = "";
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            for (let j = 0; j < gameBoard.getBoard()[i].length; j++) {
                const tile = document.createElement("div");
                tile.id = [i, j];
                tile.textContent = gameBoard.getBoard()[i][j];
                board.appendChild(tile);
            }
        }
    }
    board.addEventListener("click", (event) => {
        console.log(event.target)
        const [row, col] = event.target.id.split(",")
        if (game.getSymbol() !== "X") {
            player1.setPlayerChoice(row, col);
            game.handlePlayerChoice(player1.getPlayerChoice());
        } else {
            player2.setPlayerChoice(row, col);
            game.handlePlayerChoice(player2.getPlayerChoice());
        }
        renderBoard();

    })

    return {
        renderBoard,
    }

})();



const player1 = createPlayer("Adrian", "X");
const player2 = createPlayer("Kamil", "O");

// player1.setPlayerChoice(0, 1);
// game.handlePlayerChoice(player1.getPlayerChoice());

// player2.setPlayerChoice(1, 1);
// game.handlePlayerChoice(player2.getPlayerChoice());

// player1.setPlayerChoice(0, 2);
// game.handlePlayerChoice(player1.getPlayerChoice());

// player2.setPlayerChoice(1, 2);
// game.handlePlayerChoice(player2.getPlayerChoice());

// player1.setPlayerChoice(1, 0);
// game.handlePlayerChoice(player1.getPlayerChoice());

// player2.setPlayerChoice(2, 2);
// game.handlePlayerChoice(player2.getPlayerChoice());

// player1.setPlayerChoice(2, 0);
// game.handlePlayerChoice(player1.getPlayerChoice());

// player2.setPlayerChoice(2, 1);
// game.handlePlayerChoice(player2.getPlayerChoice());

// player1.setPlayerChoice(0, 0);
// game.handlePlayerChoice(player1.getPlayerChoice());

console.table(gameBoard.getBoard());
displayController.renderBoard();
