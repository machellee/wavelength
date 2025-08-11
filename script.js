let wedge;
let currentWedgeAngle;
let left, right; 
let playing = false;

// potential themess
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

function setup(){
    createCanvas(640, 480);
    createButtons();
    noLoop();
}

function calcWedge(){
    let centerAngle = random(PI, TWO_PI); // upper half random position

    currentWedgeAngle = centerAngle;

    createWedge(centerAngle);
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

function getcategory() {
    return categories[Math.floor(Math.random() * categories.length)]
}

function begin(){
    clear();
    textAlign(CENTER, CENTER)
    text('Categories are:', width / 2, height / 2);
    // Show the theme
    [left, right] = getcategory();

    text(left, width / 2 - 50, height / 2 + 50);

    text(right, width / 2 + 50, height / 2 + 50);
}

function reveal(){
    createWedge(currentWedgeAngle);
}

function spin(){
    clear();
    text('Showing Player 1 Board... Close your eyes player 2', width / 2, 50);
    calcWedge();
}

function hide(){
    clear();
    playing = true;
    loop();
}

function draw(){
    if (playing){
        play_game();
    }
}

function play_game(){

    background(255)
    stroke(0);
    strokeWeight(2);
    line(width/2, height/2, mouseX, mouseY);

}

function createButtons() {
    // Start the game (generate theme & spin wedge)
    buttonBegin = select('#buttonBegin');
    buttonBegin.mousePressed(begin);

    // reveal where the wedge is 
    buttonReveal = select('#buttonReveal');
    buttonReveal.mousePressed(reveal);

    // Reset where the wedge is
    buttonSpin = select('#buttonSpin');
    buttonSpin.mousePressed(spin);

    buttonHide = select('#buttonHide');
    buttonHide.mousePressed(hide)
}