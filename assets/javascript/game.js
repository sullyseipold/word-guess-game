$(document).ready(function () {

    //array of words
    var words = ["nirvana", "soundgarden", "weezer", "radiohead", "oasis", "primus"];
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var filteredWord = [];
    var wins = 0;
    var losses = 0;
    var remainingGuesses = 10;
    var imageIndex = 0;
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

    $('#new-game-button').on('click', () =>{

        imageIndex = 0;
        wordLength = word.length;
        wins = 0;
        losses = 0;


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
        var guess = $(this).attr("data-letter");

        if (imageIndex < 10) {

            if (isGuessCorrect(guess)) {
                addCorrectGuess(guess);
            }
            else {
                advanceGallowsImage();
            }
        }

        moveGuessedLetter(guessBtn);

        if ((imageIndex == 10) && (filteredWord.length > 0)) {
            $("#outcome-text").text("YOU LOST!!!!");
            losses++;
            $('#losses').text(losses);

            $(".guess-btn, .letter-btn").addClass("disabled");

        }
        else if (filteredWord.length == 0) {
            $("#outcome-text").text("YOU WON!!!!");

            $(".guess-btn, .letter-btn").addClass("disabled");
            wins++;
            $('#wins').text(wins);
        }

    });

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
        }, "normal");

    };
});