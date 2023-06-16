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
    let currentPlayer = "white";
    let selectedPiece = null;
    
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
                    changePlayer();
                }
                
                // Desmarcar a peça selecionada após o movimento
                selectedPiece.classList.remove("selected");
                selectedPiece = null;
            }
        } else {
            if (selectedSquare.textContent !== "" && selectedSquare.classList.contains(currentPlayer)) {
                selectedPiece = selectedSquare;
                selectedPiece.classList.add("selected");
            }
        }
    }
    
    function isValidMove(piece, square) {
        // Lógica para verificar se o movimento é válido
        // Você pode implementar a lógica de validação dos movimentos de cada peça aqui
        return true;
    }
    
    function movePiece(piece, square) {
        const pieceIndex = squares.indexOf(piece);
        square.textContent = piece.textContent;
        piece.textContent = "";
        squares[pieceIndex] = square;
    }
    
    function changePlayer() {
        currentPlayer = currentPlayer === "white" ? "black" : "white";
    }
    
    createBoard();
});
