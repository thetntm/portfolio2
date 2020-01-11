function createSquare()
{
    let squareSize = Math.round(Math.random() * 100) + 50;
    let newSquare = {
        xPosition: -150,
        yPosition: (
            Math.random() * (document.getElementById("mainContent").scrollHeight - squareSize)
        ),
        xSpeed: (
            (Math.random() * 2) + 1 //the speed at which the item moves to the right.
        ),
        rotCurrent: (
            (Math.floor(Math.random() * 360))
        ),
        rotSpeed: (
            (Math.random() * 2) - 1
        ),
        size: squareSize,
        color: Math.floor(Math.random() * 2),
        element: document.createElement("div")
    }
    newSquare.element.className = "particleSquare color" + newSquare.color;
    document.getElementById("particleParent").appendChild(newSquare.element);

    return newSquare;
}

function updateSquare(square)
{
    square.xPosition += square.xSpeed;
    square.rotCurrent += square.rotSpeed;
    square.rotCurrent %= 361;

    if (square.xPosition > document.body.clientWidth + 50)
    {
        document.getElementById("particleParent").removeChild(square.element);
        return false;
    }

    square.element.style = 
    "top: " + square.yPosition + "px; " +
    "left: " + square.xPosition + "px; " +
    "transform: rotate(" + square.rotCurrent + "deg); " +
    "height: " + square.size + "px; " +
    "width: " + square.size + "px;";
    return true;
}

function update()
{
    // spawnIteration ++;
    // spawnIteration %=81;
    // if (spawnIteration == 80) {particleArray.push(createSquare());}
    
    for (let i = 0; i < particleArray.length; i++) {
        if (!(updateSquare(particleArray[i])))
        {
            particleArray.splice(i,1);
            particleArray.push(createSquare());
        }
    }
    
}

var spawnIteration = 0;

var particleArray = [createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare()];

updateSquare(particleArray[0]);//this is safe because the square is all the way on the left, so it won't get removed. be careful when using updatesquare that you delete the square if it returns false!

for (let i = 0; i < particleArray.length; i++)
{
    particleArray[i].xPosition = Math.random() * document.body.clientWidth;
}


var tick = setInterval(update,40);