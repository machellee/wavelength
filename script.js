let wedge;
let currentWedgeAngle;
let leftLabel, rightLabel;
let mode = 'start'; //start, theme, wedge, playing, answer
let endX, endY;
let width = 640;
let height = 480;
let cx = width / 2;
let cy = height / 2;
let r = 150;

// categories (update later to be csv)

let categories = [
    ["Winter", "Summer"],
    ["Asian people", "White People"],
    ["Asian Kids", "Asian Parents"],
    ["Activism", "Performative"],
    ["Cheating", "Not Cheating"],
    ["Girl's Girl", "Mean Girl"], 
    ["Asian Food", "American Food"], 
    ["Progressive", "Conservative"],
    ["Theater Kid", "Anime Kid"],
    ["Immigrant Household", "American Household"],
    ["American Drama", "Korean Drama"], 
    ["Alt", "Not Alt"]
]; 

function getcategory() {
    return categories[Math.floor(Math.random() * categories.length)]
}

function setup(){
    createCanvas(width, height);
    createButtons();
    noLoop();
}

function createWedge(currentWedgeAngle){

    let cx = width / 2;
    let cy = height / 2;
    let r = 150;

    let wedgeWidth = radians(40); 

    // wedge coloring
    let labels = [2, 3, 4, 3, 2];
    let colors = ['#FFDF75', '#FF9A75', '#7595FF', '#FF9A75', '#FFDF75'];
    let numSlices = labels.length;

    let wedgeStart = currentWedgeAngle - wedgeWidth / 2;

    let sliceAngle = wedgeWidth / numSlices;

    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);

    for (let i = 0; i < numSlices; i++) {

        let startA = wedgeStart + i * sliceAngle;
        let endA = startA + sliceAngle;

        fill(colors[i]);
        arc(cx, cy, r * 2, r * 2, startA, endA, PIE);

        let midAngle = (startA + endA) / 2;

        let labelRadius = r * 0.7;
        let labelX = cx + labelRadius * cos(midAngle);
        let labelY = cy + labelRadius * sin(midAngle);

        fill(0);
        text(labels[i], labelX, labelY);
    }
}

function gameStart(){
    mode = 'rules';
    redraw();
}

function setTheme(){
    mode = 'theme';
    [leftLabel, rightLabel] = getcategory();
    loop();
}

function rules(){

    textAlign(CENTER, CENTER);
    textSize(20);
    text("Game Rules:", width / 2, height / 4);

    textSize(16);
    text("1. Generate the theme for the round.\n" +
        "2. Press 'h' to hide the wedge.\n" +
        "3. Player 2 guesses by clicking.\n" +
        "4. Repeat the game, maybe keep score?", 
        width / 2, height / 2);
}

function spin(){
    mode = 'spin'
    //clear();
    endX = null;
    endY = null;
    currentWedgeAngle = random(PI, TWO_PI); // upper half random position
    loop();
}


function displayTheme(){
    
    textAlign(CENTER, CENTER)
    text('Categories are:', width / 2, height / 2);

    text(leftLabel, width / 2 - 50, height / 2 + 50);

    text(rightLabel, width / 2 + 50, height / 2 + 50);
}

function semiCircle(){
    push();
    fill('#FFE4BF');
    strokeWeight(0);
    arc(cx, cy, r * 2, r * 2, PI, TWO_PI);
    pop();
}

function play_game(){
    background(255)

    semiCircle();

    push();
    stroke(0);
    strokeWeight(2);
    line(width/2, height/2, mouseX, mouseY);
    pop();
    
    push();
    fill(0);
    text(leftLabel, cx - r, cy + 50);
    text(rightLabel, cx + r, cy + 50);
    pop();
}

function keyPressed(){
    if (key === 'h' || key === 'H'){
        clear();
        mode = 'playing';
        loop();
    }
}

function mousePressed(){
    if (mode === 'playing'){
        endX = mouseX;
        endY = mouseY;
        mode = 'answer';
    }
}

function draw(){
    clear();

    if (mode === 'rules'){
        showScreen("rules");
        rules();
    } else if (mode === 'theme'){
        showScreen("themed")
        displayTheme();
    } else if (mode === 'spin'){
        showScreen("spin")
        semiCircle();
        text('Showing Player 1 Board... Close your eyes player 2', width / 2, 50);
        text(leftLabel, cx - r, cy + 50);
        text(rightLabel, cx + r, cy + 50);
        createWedge(currentWedgeAngle);
    } else if (mode === 'playing'){
        play_game();
    } else if (mode === 'answer'){
        clear();

        semiCircle();

        createWedge(currentWedgeAngle);

        push();
        stroke(0);
        strokeWeight(2);
        line(width/2, height/2, endX, endY);
        pop();

        text(leftLabel, cx - r, cy + 50);
        text(rightLabel, cx + r, cy + 50);
    } else if (mode === 'start'){
        // home screen
        showScreen("startScreen")
    }
    
}

function showScreen(targetId) {
    document.querySelectorAll('.screen').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById(targetId).classList.add('active');
}

function createButtons() {
    // Start the game (generate theme & spin wedge)
    buttonBegin = select('#buttonBegin');
    buttonBegin.mousePressed(gameStart);

    // Reset where the wedge is
    buttonSpin = select('#buttonSpin');
    buttonSpin.mousePressed(spin);

    buttonTheme = select('#buttonTheme');
    buttonTheme.mousePressed(setTheme);

    buttonNewTheme = select('#buttonNewtheme');
    buttonNewTheme.mousePressed(setTheme);

    buttonSpinTheme = select('#buttonSpinTheme');
    buttonSpinTheme.mousePressed(setTheme);

    buttonreSpin = select('#buttonreSpin');
    buttonreSpin.mousePressed(spin);
}