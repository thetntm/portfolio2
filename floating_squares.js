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
        color: 0,
        element: document.createElement("div"),
        updateSquare: function() {
            this.xPosition += this.xSpeed;
            this.rotCurrent += this.rotSpeed;
            this.rotCurrent %= 361;

            if (this.xPosition > document.body.clientWidth + 50)
            {
                document.getElementById("particleParent").removeChild(this.element);
                return false;
            }

            this.element.style = 
            "top: " + this.yPosition + "px; " +
            "left: " + this.xPosition + "px; " +
            "transform: rotate(" + this.rotCurrent + "deg); " +
            "height: " + this.size + "px; " +
            "width: " + this.size + "px;";
            return true;
        }
    }

    let luckyChance = Math.floor(Math.random()*99)

    if (luckyChance == 3)
    {
        newSquare.color = 3; //gives a 1 in 100 chance that the new square will be a red one.
    }

    if (luckyChance % 33 == 1)
    {
        newSquare.color = 2; //gives a 1 in 50 chance that the new square will be a bright blue one.
    }

    if (luckyChance % 10 == 2)
    {
        newSquare.color = 1;
    }

    newSquare.element.className = "particleSquare color" + newSquare.color;
    document.getElementById("particleParent").appendChild(newSquare.element);

    return newSquare;
}

function update()
{
    // spawnIteration ++;
    // spawnIteration %=81;
    // if (spawnIteration == 80) {particleArray.push(createSquare());}
    
    for (let i = 0; i < particleArray.length; i++) {
        if (!(particleArray[i].updateSquare()))
        {
            particleArray.splice(i,1);
            particleArray.push(createSquare());
        }
    }
    
}

var spawnIteration = 0;

var particleArray = [createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare(), createSquare()];

for (let i = 0; i < particleArray.length; i++)
{
    particleArray[i].xPosition = Math.random() * document.body.clientWidth;
}


var tick = setInterval(update,40);