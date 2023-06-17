document.addEventListener("DOMContentLoaded", function() {
    const board = document.querySelector(".board");
    const squares = [];
    const pieces = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",
                    "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",
                    "", "", "", "", "", "", "", "",
                    "", "", "", "", "", "", "", "",
                    "", "", "", "", "", "", "", "",
                    "", "", "", "", "", "", "", "",
                    "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙",
                    "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];
    let selectedPiece = null;
    var jogador0Piece = ["♖","♘","♗","♕","♔","♙"];
    var jogador1Piece = ["♜","♞","♝","♛","♚","♟"];
    let currentPlayer = 0;
    const moves = [];

    function createBoard() {
        for (let i = 0; i < 64; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.classList.add((i + Math.floor(i / 8)) % 2 === 0 ? "white" : "black");
            square.textContent = pieces[i];
            square.addEventListener("click", () => selectSquare(i));
            board.appendChild(square);
            squares.push(square);
        }
    }
    
    function selectSquare(squareIndex) {
        const selectedSquare = squares[squareIndex];
        
        if (selectedPiece) {
            if (selectedPiece === selectedSquare) {
                // Desmarcar a peça selecionada
                selectedPiece.classList.remove("selected");
                selectedPiece = null;
            } else {
                const validMove = isValidMove(selectedPiece, selectedSquare);
                
                if (validMove) {
                    movePiece(selectedPiece, selectedSquare);
                    updateMoves(selectedPiece, selectedSquare); // Adicionar o movimento ao array de movimentos
                    currentPlayer = (currentPlayer + 1) % 2; // Trocar o jogador atual (par para ímpar, ímpar para par)
                    console.log("Movimentos:", moves);
                    console.log("Jogador atual:", currentPlayer);
                }
                
                // Desmarcar a peça selecionada após o movimento
                selectedPiece.classList.remove("selected");
                selectedPiece = null;
            }
        } else {
            if (selectedSquare.textContent !== "") {
                selectedPiece = selectedSquare;
                selectedPiece.classList.add("selected");
            }
        }
    }
    
    function isValidMove(piece, square) {
        console.log(square.textContent)
        var valueCurrentPlayer="";
        // verifica se o jogador é par ou impar e adiciona no valueCurrentPlayer
        if (currentPlayer == 0){
            valueCurrentPlayer = jogador1Piece
            console.log(valueCurrentPlayer)
        } else {
            valueCurrentPlayer = jogador0Piece
            console.log(valueCurrentPlayer)
        }
        
        if (valueCurrentPlayer.includes(square.textContent)) {
            console.log("O valor está presente no array: " + square.textContent);
            return true;
        } else {

            console.log("O valor não está presente no array");
            if (square.textContent == "") {
                return true;
            }
            return false;
        }
    }
    
    function movePiece(piece, square) {
        const pieceIndex = squares.indexOf(piece);
        square.textContent = piece.textContent;
        piece.textContent = "";
        squares[pieceIndex] = square;
    }
    
    function updateMoves(piece, square) {
        const move = {
            to: squares.indexOf(square),
            player: currentPlayer
        };
        moves.push(move);
    }
    
    createBoard();
});
