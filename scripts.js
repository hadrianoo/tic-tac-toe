const gameBoard = (() => {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    const getBoard = () => {
        return board;
    };

    const restartBoard = () => {
        return board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    }
    const getBoardPosition = (arr, item) => board[arr][item];
    const updateBoard = (arr, item, playerSymbol) => {
        if (getBoardPosition(arr, item) === "") {
            board[arr][item] = playerSymbol;
            if (hasFreeSpaces()) {
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
        for (let i = 0; i < 3; i++) {
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

    const hasFreeSpaces = () => gameBoard.getBoard().flat().includes("");

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
    const setPlayerName = (name) => playerName = name;

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
        setPlayerName,
        getPlayerChoice,
    }
};

const game = (() => {
    let symbol = Math.floor(Math.random() * 2) === 0 ? "x" : "o";

    const getSymbol = () => symbol;

    const checkNextPlayerMove = () => {
        getSymbol() === "x" ? infoController.playerMove(player1.getPlayerName()) :
            infoController.playerMove(player2.getPlayerName());
    }

    const handlePlayerChoice = (obj) => {
        let gameStatus = gameBoard.updateBoard(
            obj.playerChoiceRow,
            obj.playerChoiceCol,
            obj.playerSymbol);

        switch (gameStatus) {
            case "x": {
                infoController.win(player1.getPlayerName());
                symbol = "o"
                player1.incrementPlayerScore();
                gameBoard.restartBoard();
                infoController.reset();
                checkNextPlayerMove();
                break;
            }
            case "o": {
                infoController.win(player2.getPlayerName());
                symbol = "x"
                player2.incrementPlayerScore();
                gameBoard.restartBoard();
                infoController.reset();
                checkNextPlayerMove();
                break;
            }
            case "draw": {
                infoController.draw();
                infoController.reset();
                gameBoard.restartBoard();
                checkNextPlayerMove();
                break;
            }
            case "continue": {
                getSymbol() === "x" ? symbol = "o" : symbol = "x";
                checkNextPlayerMove();
                break;
            }
            case "taken": {
                infoController.taken();
                break;
            }
        }
        scoreController.updatePlayerScore();
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
        msgBox.insertAdjacentHTML("beforeend", msg);
        msgBox.appendChild(br);
        msgBox.scrollTop = msgBox.scrollHeight;
    }

    return {
        init: () => sendMsg("Hello: input your names first."),
        win: (player) => sendMsg(`Player <span class="msg-player">${player}</span> won. <span class="win"></span>`),
        draw: () => sendMsg("Draw: Game over."),
        name: () => sendMsg("You forgot about your name."),
        play: () => sendMsg("Have Fun."),
        playerMove: (player) => sendMsg(`Player <span class="msg-player">${player}</span> move.`),
        taken: () => sendMsg("Position taken."),
        reset: () => sendMsg("Board restarted"),
    }
})();

const scoreController = (() => {
    const player1Label = document.querySelector(".player1-label");
    const player2Label = document.querySelector(".player2-label");
    const player1Score = document.querySelector(".player1-score");
    const player2Score = document.querySelector(".player2-score");

    const setScorePlayerNames = (player1Name, player2Name) => {
        player1Label.textContent = player1Name;
        player2Label.textContent = player2Name;
    }

    const updatePlayerScore = () => {
        player1Score.textContent = player1.getPlayerScore();
        player2Score.textContent = player2.getPlayerScore();
    }

    return {
        setScorePlayerNames,
        updatePlayerScore,
    }
})();

const displayController = (() => {
    const button = document.querySelector("button");
    const board = document.querySelector(".board");

    board.style.pointerEvents = "none";
    infoController.init();

    const renderBoard = () => {
        board.innerHTML = "";
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            for (let j = 0; j < gameBoard.getBoard()[i].length; j++) {
                const tile = document.createElement("div");
                tile.dataset.row = i;
                tile.dataset.col = j;
                tile.classList.add("tile");
                tile.textContent = gameBoard.getBoard()[i][j];
                board.appendChild(tile);
            }
        }
    }

    const firstChooseName = () => {
        const inputPlayer1 = document.getElementById("player1-input");
        const inputPlayer2 = document.getElementById("player2-input");
        player1.setPlayerName(inputPlayer1.value);
        player2.setPlayerName(inputPlayer2.value);
        scoreController.setScorePlayerNames(inputPlayer1.value, inputPlayer2.value)
        if (inputPlayer1.value !== "" && inputPlayer2.value !== "") {
            inputPlayer1.disabled = true;
            inputPlayer2.disabled = true;
            return true;
        }
        return false;
    }

    board.addEventListener("click", (event) => {
        if (!event.target.classList.contains("board")) {
            const row = event.target.dataset.row;
            const col = event.target.dataset.col;
            if (game.getSymbol() === "x") {
                player1.setPlayerChoice(row, col);
                game.handlePlayerChoice(player1.getPlayerChoice());
            } else {
                player2.setPlayerChoice(row, col);
                game.handlePlayerChoice(player2.getPlayerChoice());
            }
            renderBoard();
        }
    })

    button.addEventListener("click", (event) => {
        if (event.target.classList.contains("play")) {
            if (firstChooseName()) {
                board.style.pointerEvents = "auto";
                renderBoard();
                infoController.play();
                event.target.textContent = "Restart Game";
                event.target.classList = "reset";
                game.getSymbol() === "x" ? infoController.playerMove(player1.getPlayerName()) :
                    infoController.playerMove(player2.getPlayerName());
            } else {
                infoController.name();
            }
        } else if (event.target.classList.contains("reset")) {
            gameBoard.restartBoard();
            renderBoard();
            infoController.reset();
            game.getSymbol() === "x" ? infoController.playerMove(player1.getPlayerName()) :
                infoController.playerMove(player2.getPlayerName());
        }
    })

    return {
        renderBoard,
    }
})();