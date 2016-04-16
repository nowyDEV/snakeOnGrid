$(document).ready(function () {
    var speed = 200,
     dir = 1,
     size = 15,
     snake = ['7_7', '8_7'],
     score = 0,
     drink = '';

    //Start button action
    $('body').on('click', 'button', function () {
        var difficulty = $('select#difficulty').val();
        score = 0;

        if (difficulty === 'Easy') {
            snake = ['7_7', '8_7'];
            size = 15;
        }
        else if (difficulty === 'Medium') {
            size = 25;
            snake = ['12_12', '13_12']
        }
        else if (difficulty === 'Hard') {
            size = 40;
            snake = ['20_20', '21_20']
        }
        else {
            size = 60;
            snake = ['30_30', '31_30']
        }
        gameStart(size);

    });

    //CLEARFIX

    $('#wrapper').add("<div class='clearfix'></div>")
        .css("clear", "both");

    //Creating grid, works for multiple sizes
    function createGrid(size) {
        var wrapper = $('#wrapper'),
            squareSide = 600 / size;
        $(wrapper).empty();
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                $(wrapper).append('<div class=square id=xy_' + i + '_' + j + '></div>');

            }
        }

        //Single square size setting
        $('.square').css({
            "height": squareSide + "px",
            "width": squareSide + "px"

        });
    }

    //Game init function
    function gameStart(size) {
        createGrid(size);

        //Setting starting snake position for different difficulties
         if (size === 15) {
             $('#xy_7_7').addClass('snake');
             $('#xy_8_7').addClass('snake');
         }
        else if (size === 25) {
            $('#xy_12_12').addClass('snake');
            $('#xy_13_12').addClass('snake');
        }
        else if (size === 40) {
            $('#xy_20_20').addClass('snake');
            $('#xy_21_20').addClass('snake');
        }
        else {
                $('#xy_30_30').addClass('snake');
                $('#xy_31_30').addClass('snake');
        }

        createDrink(size);
        setTimeout(function() { snakeMove() }, speed);

    }

    //Drink object generator
    function createDrink(size){
        var x = Math.floor(Math.random() * (size - 1)),
            y = Math.floor(Math.random() * (size - 1));
        $('#xy_' + x + '_' + y).addClass('drink');
        drink = '' + x + '_' + y;
    }

    //Position update function
    function snakeMove() {

        //remove last div (snake tail)
        var tail = snake.pop();
        $('#xy_' + tail).removeClass('snake');

        var oldHead = snake[0],
            xy = oldHead.split("_"),
            x = parseInt(xy[0]),
            y = parseInt(xy[1]);

        //Move direction
        switch (dir) {
            case 1: // Bottom
                x += 1;
                break;
            case 2: // Left
                y -= 1;
                break;
            case 3: // Top
                x -= 1;
                break;
            case 4: // Right
                y += 1;
                break;
            default:
                break;

        }

        //Head update
        var newHead = '' + x + '_' + y;

        //Checking if snake hit the drink
        if (newHead === drink) {
            snake.push(tail);
            $('#xy_' + tail).addClass('snake');
            $('#xy_' + drink).removeClass('drink');
            createDrink(size);

            //speed decrease (snake moves faster)
            speed -= 1;
            score += 1;
        }

        snake.unshift(newHead);

        //Game running conditions (snake alive ?)
        if (x < 0 || y < 0 || x > (size-1) || y > (size-1) ||  $('#xy_' + newHead).hasClass('snake') ) {
            alert("Game over, score: " + score);
            return;
        }

        $('#xy_' + newHead).addClass('snake');
        setTimeout(function(){ snakeMove()}, speed);
    }

    //User input check (snake arrow control)
    $(document).keydown(function(event){
        switch(event.keyCode) {
            case 37: // Left-arrow
                dir = 2;
                break;
            case 38: // Up-arrow
                dir = 3;
                break;
            case 39: // Right-arrow
                dir = 4;
                break;
            case 40: // Down-arrow
                dir = 1;
                break;

        }

    });




});