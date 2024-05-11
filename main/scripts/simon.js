
$.noConflict();

jQuery(document).ready(function () {

    // start game when user press any key from key-board
    document.addEventListener('keypress', startGame);
});

let level = 0;
let isGameStarted = false;
let btns = ["yellow", "red", "purple", "green"];
let gameSeq = [];
let userSeq = [];
let clickAttemp = -1;

function startGame() {
    if (isGameStarted == false) {
        isGameStarted = true;
        levelUp();
    }
}

function endGame() {
    let msg = "Game Over! Your score was " + (level-1);
    msg += "<br/> Press any key to start.";
    jQuery(".level").empty();
    jQuery(".level").append(msg);

    reset();
}

function levelUp() {
    if (isGameStarted) {
        let str = "Level " + (++level);
        jQuery(".level").empty();
        jQuery(".level").append(str);

        let randIdx = Math.floor(Math.random() * 4);
        gameFlash(randIdx)
    }
}

function gameFlash(idx) {
    
    jQuery(`#${idx}`).addClass('flash');

    setTimeout(function () {
        jQuery(`#${idx}`).removeClass('flash');
    }, 250);

    clickAttemp = -1;
    userSeq = [];
    gameSeq.push(idx);
}

function userFlash(idx) {

    if(isGameStarted && clickAttemp <= gameSeq.length) {
    
        jQuery(`#${idx}`).addClass('userflash');

        setTimeout(function () {
            jQuery(`#${idx}`).removeClass('userflash');
        }, 250);

        userSeq.push(idx);
        ++clickAttemp;
        isCorrectAnswer();
    }
}

function isCorrectAnswer() {
    console.log(gameSeq)
    console.log(userSeq);
    console.log(clickAttemp);
    if(gameSeq[clickAttemp] != userSeq[clickAttemp]) {
        endGame();
    } else if (gameSeq.join() == userSeq.join()) {
        setTimeout(() => {
            levelUp();
        }, 500);
    }
}

function reset() {
    isGameStarted = false;
    gameSeq = [];
    userSeq = [];
    clickAttemp = -1;
    level = 0;
}