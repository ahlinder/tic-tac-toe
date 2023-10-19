const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setBox = (index, sign) => {
        board[index] = sign;
    };

    const getBox = (index) => {
        return board[index]
    }

    const resetBoard = () => {
        for (let i = 0; i<board.length; i++) {
            board[i] = "";
        }
    }

    const gameOver = false;

    return {setBox, getBox, resetBoard, gameOver}
})();

const Player = (sign) => {
    this.sign = sign

    const getSign = () => {
        return sign
    }
    return {getSign};
}

const interfaceController = (() => {
    const boxes = document.querySelectorAll(".box");
    const resetButton = document.querySelector(".reset");
    const message = document.querySelector(".message");
    boxes.forEach((box) => {
        box.addEventListener("click", (e) => {
            if (e.target.textContent !== "" || gameBoard.gameOver) return;
            gameBoard.setBox(parseInt(e.target.dataset.index), gameController.getPlayerSign());
            e.target.textContent = gameController.getPlayerSign();
            if (gameController.gameOver() && gameController.getRoundCount() > 2) {
                message.textContent = `Player ${gameController.getPlayerSign()} won!`
            }
            else {
                gameController.incrementRound();
                message.textContent = `Player ${gameController.getPlayerSign()}'s turn`
                if (gameController.getRoundCount() > 8 && !gameBoard.gameOver) {
                    message.textContent = "Draw.";
                    gameBoard.gameOver = true;
                    gameController.resetRounds();
                }
            }          
        });
    });

    resetButton.addEventListener("click", (e) => {
        boxes.forEach(box => {
            box.textContent = "";
        })
        message.textContent = "Player O's turn"
        gameBoard.resetBoard();
        gameBoard.gameOver = false;
        gameController.resetRounds();
    })
})();

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 0;

    const resetRounds = () => {
        round = 0
    }

    const incrementRound = () => {
        round++;
    };

    const getPlayer = () => {
        if (round % 2 == 0) return playerO;
        return playerX;
    }

    const getPlayerSign = () => {
        return getPlayer().getSign();
    };

    const getRoundCount = () => {
        return round;
    }

    const gameOver = () => {
        winCon = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        let sign = "";
        let counter = 1;
        for (let i = 0; i<winCon.length; i++) {
            sign = gameBoard.getBox(winCon[i][0])
            counter = 1;
            for (let j = 1; j<3; j++) {
                if (gameBoard.getBox(winCon[i][j]) === "" || sign === "") {
                    counter = 1;
                    break;
                }
                else if (gameBoard.getBox(winCon[i][j]) !== sign) {
                    counter = 1;
                    break;
                }
                counter++;
            }
            if (counter >= 3) {
                gameBoard.gameOver = true;
                confetti();
                return true;
            }
        }
    }
    return {getPlayer, getPlayerSign, incrementRound, gameOver, getRoundCount, resetRounds};
})();
