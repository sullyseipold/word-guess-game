$(document).ready(function () {

    //array of words
    var words = ["nirvana", "soundgarden", "weezer", "radiohead", "oasis", "primus"];
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var filteredWord = [];
    var wins = 0;
    var losses = 0;
    var remainingGuesses = 10;
    var imageIndex = 0;
    var correctGuesses = 0;
    var wordLength = 0;
    var word = [];

    function newWord() {
        var index = Math.floor(Math.random() * words.length);
        word = words[index];
        filteredWord = words[index].split('');
    };

    function populateGameBoard() {

        // create a an empty box for each letter of the word
        word.split('').map(letter => {
            var letterDiv = $("<div>");
            letterDiv.addClass("letter-box");
            letterDiv.attr("data-letter", letter);
            $('#word-letters-div').append(letterDiv);
        });

        //create the letter buttons
        letters.map(letter => {
            letter = letter.toLowerCase();
            var letterBtn = $("<button>");
            letterBtn.css("position", "relative");
            letterBtn.addClass("letter-btn");
            letterBtn.attr("data-letter", letter);
            letterBtn.text(letter);

            var guessBtn = $("<button>");
            guessBtn.addClass("guess-btn");
            guessBtn.attr("data-letter", letter);
            guessBtn.text(letter);

            $('#gd-letters-h2').after(guessBtn);
            $('#av-letters-h2').after(letterBtn);

        });

        $('#wins').text(wins);
        $('#losses').text(losses);
        $('#remaining-guesses').text(remainingGuesses);
        $("#img-gallows").attr("src", "./assets/images/" + imageIndex + ".jpg");
    };

    newWord();
    populateGameBoard();

    $('#new-game-button').on('click', function () {

        remainingGuesses = 10;
        imageIndex = 0;
        wordLength = word.length;
        correctGuesses = 0;
        wins = 0;


        //clear game board
        $(".letter-btn").remove();
        $(".guess-btn").remove();
        $('#word-letters-div').empty();
        $('#wins-div').empty();
        $('#remaining-guesses').text(remainingGuesses);
        $("#img-gallows").attr("src", "./assets/images/" + imageIndex + ".jpg");
        $("#outcome-text").empty();

        newWord();
        populateGameBoard();
    });

    $('#next-word-button').on('click', function () {

        remainingGuesses = 10;
        imageIndex = 0;
        wordLength = word.length;
        correctGuesses = 0;

         //clear game board
        $(".letter-btn").remove();
        $(".guess-btn").remove();
        $('#word-letters-div').empty();
        $('#remaining-guesses').text(remainingGuesses);
        $("#img-gallows").attr("src", "./assets/images/" + imageIndex + ".jpg");
        $("#outcome-text").empty();

        newWord();
        populateGameBoard();
    });

    $(document).on("click", ".letter-btn", function () {

        var guessBtn = $(this);
        var isCorrectGuess = false;
        var guess = $(this).attr("data-letter");
        var isGameOver = false;

        if (remainingGuesses > 0) {

            isCorrectGuess = isGuessCorrect(guess);
            calculateRemainingGuesses();

        }

        if (isCorrectGuess) {
            addCorrectGuess(guess);

        }
        else {
            advanceGallowsImage();
        }
        
        moveGuessedLetter(guessBtn);

        if ((remainingGuesses == 0) && (filteredWord.length > 0)) {
            $("#outcome-text").text("YOU LOST!!!!");
            losses++;
            $('#losses').text(losses);

        }
        else if (filteredWord.length == 0) {
            $("#outcome-text").text("YOU WON!!!!");
            wins++;
            $('#wins').text(wins);
        }

    });


    function addIncorrectGuess() {

        if (remainingGuesses === 0) {
            $("#outcome-text").text("YOU LOST!!!!");
        }
    };

    function calculateRemainingGuesses() {
        if (remainingGuesses > 0) {

            remainingGuesses--;
            $('#remaining-guesses').text(remainingGuesses);
        }
    };

    function advanceGallowsImage() {

        if (imageIndex < 10) {
            imageIndex++;
            $("#img-gallows").attr("src", "./assets/images/" + imageIndex + ".jpg");
        }

    };

    function isGuessCorrect(guess) {

        var letterDiv = $('.letter-box[data-letter="' + guess + '"]');
        return letterDiv.attr('data-letter') == guess;
    };

    function addCorrectGuess(guess) {
        var letterDiv = $('.letter-box[data-letter="' + guess + '"]');

        //remove the correct guess from the array of remaining letters
        filteredWord = filteredWord.filter(function (value, index, arr) {
            return value != guess;
        });

        letterDiv.text(guess);

    };

    function isWinningGuess() {
        return filteredWord.length == 0;

    };

    function moveGuessedLetter(guessedLetterBtn) {

        var guess = $(guessedLetterBtn).attr("data-letter");
        var xb = $(guessedLetterBtn).offset().left;
        var yb = $(guessedLetterBtn).offset().top;
        var xt = 0;
        var yt = 0;

        var target = $('.guess-btn[data-letter="' + guess + '"]');

        xt = $(target).offset().left;
        yt = $(target).offset().top;

        $(guessedLetterBtn).animate({
            left: xt - xb, top: yt - yb
        }, "normal",
            function () {
                $(guessedLetterBtn).attr("disabled");
            });

    };
});