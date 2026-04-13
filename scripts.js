const gameBoard = (() => {
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    const getBoard = () => {
        return board;
    };

    const restartBoard = () => {
        return board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    }

    const getBoardPosition = (arr, item) => board[arr][item];

    const updateBoard = (arr, item, playerSymbol) => {
        if (getBoardPosition(arr, item) === 0) {
            board[arr][item] = playerSymbol;
            if (checkDrawStatus()) {
                return checkBoardStatus(playerSymbol);
            } else {
                return "draw";
            }
        } else {
            return "taken";
        }
    }

    const checkBoardStatus = (playerSymbol) => {
        if (checkRowStatus(playerSymbol) || checkColStatus(playerSymbol) || checkDiagonalStatus(playerSymbol)) {
            return playerSymbol;
        }
        return "continue";
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
        restartBoard,
        getBoardPosition,
        updateBoard,
    }
})();


function createPlayer(symbol) {
    const playerSymbol = symbol;
    let playerName = "";
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

    const setPlayerName = (name) => playerName = name;

    const getPlayerChoice = () => {
        return { playerChoiceRow, playerChoiceCol, playerSymbol };
    };

    return {
        getPlayerName,
        getPlayerSymbol,
        getPlayerScore,
        incrementPlayerScore,
        setPlayerChoice,
        setPlayerName,
        getPlayerChoice
    }
};

const game = (() => {

    let symbol = Math.floor(Math.random() * 2) === 0 ? "x" : "o";
    const getSymbol = () => symbol;

    const handlePlayerChoice = (obj) => {
        let gameStatus = gameBoard.updateBoard(obj.playerChoiceRow, obj.playerChoiceCol, obj.playerSymbol).toLowerCase();

        switch (gameStatus) {
            case "x": {
                infoController.win(player1.getPlayerName());
                player1.incrementPlayerScore();
                gameBoard.restartBoard();
                break;
            }
            case "o": {
                infoController.win(player2.getPlayerName());
                player2.incrementPlayerScore();
                gameBoard.restartBoard();
                break;
            }
            case "draw": {
                infoController("draw")
                gameBoard.restartBoard();
                break;
            }
            case "continue": {
                symbol = obj.playerSymbol;
                if (getSymbol() === "x") {
                    infoController.playerMove(player2.getPlayerName());
                } else {
                    infoController.playerMove(player1.getPlayerName());
                }
                break;
            }
            case "taken": {
                infoController.taken();
                break;
            }
        }
    }

    return {
        handlePlayerChoice,
        getSymbol,
    }
})();

const player1 = createPlayer("x");
const player2 = createPlayer("o");



const infoController = (() => {
    const msgBox = document.querySelector(".msgbox");
    const sendMsg = (msg) => {
        const br = document.createElement("br");

        msgBox.innerHTML += msg;
        msgBox.appendChild(br);
        msgBox.scrollTop = msgBox.scrollHeight;
    }
    return {
        init: () => sendMsg("Hello: input your names first."),
        win: (player) => sendMsg(`Player ${player} won.`),
        draw: () => sendMsg("Draw: Game over."),
        name: () => sendMsg("You forgot about your name."),
        play: () => sendMsg("Have Fun."),
        playerMove: (player) => sendMsg(`Player ${player} move.`),
        taken: () => sendMsg("Position taken."),
        reset: () => sendMsg("Board restarted")
    }
})();


const displayController = (() => {

    const container = document.querySelector(".container");
    const button = document.querySelector("button");

    const board = document.querySelector(".board");
    board.style.pointerEvents = "none";
    infoController.init();

    const renderBoard = () => {
        board.innerHTML = "";
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            for (let j = 0; j < gameBoard.getBoard()[i].length; j++) {
                const tile = document.createElement("div");
                tile.id = [i, j];
                tile.style.backgroundColor = "#b4d3d9";
                tile.textContent = gameBoard.getBoard()[i][j];
                board.appendChild(tile);
            }
        }
    }

    const firstChooseName = () => {
        const inputPlayer1 = document.getElementById("player1-input").value;
        const inputPlayer2 = document.getElementById("player2-input").value;
        player1.setPlayerName(inputPlayer1);
        player2.setPlayerName(inputPlayer2);
        if (inputPlayer1 !== "" && inputPlayer2 !== "") {
            return true;
        }
        return false;
    }

    board.addEventListener("click", (event) => {
        console.log(event.target)
        const [row, col] = event.target.id.split(",")
        if (game.getSymbol() !== "x") {
            player1.setPlayerChoice(row, col);
            game.handlePlayerChoice(player1.getPlayerChoice());
        } else {
            player2.setPlayerChoice(row, col);
            game.handlePlayerChoice(player2.getPlayerChoice());
        }
        renderBoard();
    })

    button.addEventListener("click", (event) => {
        if (event.target.classList.contains("play")) {
            if (firstChooseName()) {
                board.style.pointerEvents = "auto";
                renderBoard();
                infoController.play();
                event.target.textContent = "Restart Game";
                event.target.classList = "reset";
            } else {
                infoController.name();
            }

        }
        if (event.target.classList.contains("reset")) {
            gameBoard.restartBoard();
            renderBoard();
            infoController.reset();

        }

    })

    return {
        renderBoard,
    }

})();



// const player1 = createPlayer("x");
// const player2 = createPlayer("o");

console.table(gameBoard.getBoard());