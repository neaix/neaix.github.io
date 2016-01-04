var config = {
    canvasWidth: 625,
    canvasHeight: 625,
    cellWidth: 150,
    cellHeight: 150,
    bkgColor: "#f2e6cb",
    colorTable: ["#ff00ff", "#aaffaa", "#00ffaa", "#00ffff", "#33ff22", "#00dd33", "#00eedd", "#00ffff", "#f7811e", "#f7511e", "#f11e3a", "#ff2321", "#f03211"]

};

var cell = {
    getPos: function(row, col){
        var x = 5 + col * (config.cellWidth + 5);
        var y = 5 + row * (config.cellHeight + 5);
        return {x: x, y: y};
    }
};

var dataMatrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
var score = 0;
var maxCellValue = 2;
var autoPlaying = false;

function getCanvas()
{
    return $("#mainCanvas");
}


function paintCell(row, col)
{
    var color = config.bkgColor;
    var cellValue = dataMatrix[row][col];
    if (cellValue != 0)
    {
        var step = Math.floor(Math.log(cellValue) / Math.log(2));
        color = config.colorTable[step];
    }

    var pos = cell.getPos(row, col);
    getCanvas().drawRect({
            fillStyle: color,
            x: pos.x,
            y: pos.y,
            width: config.cellWidth,
            height: config.cellHeight,
            fromCenter: false
    });
    if (cellValue != 0)
    {
        setCellValue(row, col, dataMatrix[row][col]);
    }
}

function repaintCanvas()
{
    for (i = 0; i < 4; ++i)
    {
        for (j = 0; j < 4; ++j)
        {
            paintCell(i, j);
        }
    }
}

function setCellValue(row, col, val)
{

        var left = 5 + col * (config.cellWidth + 5) + config.cellWidth / 2;
    var top = 5 + row * (config.cellHeight + 5) + config.cellHeight / 2;
    getCanvas().drawText({
      fillStyle: '#000',
      strokeStyle: '#000',
      strokeWidth: 2,
      x: left, 
      y: top,
      fontSize: 48,
      fontFamily: 'Verdana, sans-serif',
      text: val.toString()
    });
}


function selectRandomCell()
{
    var freeCells = new Array();
    var freeNum = 0;
    for (var i = 0; i < 4; ++i)
    {
        for (var j = 0; j < 4; ++j)
        {
            if (dataMatrix[i][j] == 0)
            {
                freeCells[freeNum++] = {x: i, y: j};
            }
        }
    }

    if (freeCells.length == 0)
    {
        return {x: -1, y: -1};
    }

    var pos = Math.floor(Math.random() * freeCells.length);
    return freeCells[pos];
}

function increaseScore(delta)
{
    if (delta > maxCellValue)
    {
        maxCellValue = delta;
    }
    score += delta;
    $("#score").text(score.toString());
}

function moveH(left)
{
    var startPos = 0;
    var step = 1;
    if (!left)
    {
        startPos = 3;
        step = -1;
    }
    var movable = false;
    for (var i = 0; i < 4; ++i)
    {
        var pivot = startPos;
        for (var j = startPos; j >= 0 && j < 4; j = j + step)
        {
            var value = dataMatrix[i][j];
            if (value != 0)
            {
                var k = j + step;
                while (k < 4 && k >= 0 && dataMatrix[i][k] == 0)
                {
                   k += step; 
                }
                if (k == 4 || k == -1 || dataMatrix[i][k] != value)
                {
                    //all values left behind are empty
                    if (pivot != j)
                    {
                        dataMatrix[i][j] = 0;
                        dataMatrix[i][pivot] = value;
                        movable = true;
                    }
                }
                else
                {
                    dataMatrix[i][k] = 0;
                    dataMatrix[i][j] = 0;
                    dataMatrix[i][pivot] = value * 2;
                    increaseScore(value * 2);
                    movable=true;
                }
                pivot += step;
            }
        }
    }
    if (movable)
    {
        repaintCanvas();
        addNewCell();
    }
}

function isValidPos(x)
{
    return x >= 0 && x <= 3;
}

function moveV(up)
{
    var startPos = 0;
    var step = 1;
    if (!up)
    {
        startPos = 3;
        step = -1;
    }

    var movable = false;
    for (var j = 0; j < 4; ++j)
    {
        var pivot = startPos;
        for (var i = startPos; isValidPos(i); i += step)
        {
            var value = dataMatrix[i][j];
            if (value != 0)
            {
                console.log("check " + i + ", " + j);
                var k = i + step;
                while (isValidPos(k) && dataMatrix[k][j] == 0)
                {
                   k += step; 
                }

                console.log("k is " + k);
                if (!isValidPos(k) || dataMatrix[k][j] != value )
                {
                    //all values left behind are empty
                    //console.log("find no equal value, just move it towards bottom, move to " + pivot + ", " + j);
                    if (pivot != i)
                    {
                        dataMatrix[i][j] = 0;
                        dataMatrix[pivot][j] = value;
                        movable=true;
                    }
                }
                else
                {
                    console.log("bingo! there is equal value");
                    dataMatrix[k][j] = 0;
                    dataMatrix[i][j] = 0;
                    dataMatrix[pivot][j] = value * 2;
                    increaseScore(value * 2);
                    movable = true;
                }
                
                pivot += step;
            }
        }
    }
    if (movable)
    {
        repaintCanvas();
        addNewCell();
    }
}

function createFailMsg()
{
}

function onMove(direction)
{
    switch (direction)
    {
        case 0: moveH(true); break;
        case 1: moveV(true); break;
        case 2: moveH(false); break;
        case 3: moveV(false); break;
        default: break;
    }
    if (isGameOver())
    {
        alert("game is over, you got " + $("#score").text());
        //$("#gameOverMsg").show();
        return false;
    }
    return true;
}

function addNewCell()
{

    var nextCell = selectRandomCell();
    if (nextCell.x != -1 && nextCell.y != -1)
    {
        var val = Math.floor(Math.random() * 2 + 1) * 2;
        dataMatrix[nextCell.x][nextCell.y] = val;
        //setCellValue(nextCell.x, nextCell.y, val);
        paintCell(nextCell.x, nextCell.y);
    }
}

function isGameOver()
{
    for (var i = 0; i < 4; ++i)
    {
        for (var k = 0; k < 4; ++k)
        {
            if (dataMatrix[i][k] == 0)
            {
                return false;
            }
            if (isValidPos(k + 1) && dataMatrix[i][k + 1] == dataMatrix[i][k])
            {
                return false;
            }
            if (isValidPos(i + 1) && dataMatrix[i + 1][k] == dataMatrix[i][k])
            {
                return false;
            }
        }
    }
    return true;
}

function resetGame()
{
    score = 0;
    for (var i = 0; i < 4; ++i)
    {
        for (var j = 0; j < 4; ++j)
        {
            dataMatrix[i][j] = 0;
        }
    }
    
    if (maxCellValue > 4)
    {
        dataMatrix[0][0] = maxCellValue;
    }
    else
    {
        addNewCell();
    }
    repaintCanvas();
}

var timer = $.timer(function(){
        var direction = Math.floor(Math.random() * 4);
        console.log("timer is up");
        var ongoing = onMove(direction);
        if (!ongoing)
        {
            if (autoPlaying)
            {
                toggleAutoPlay();
            }
        }
}, 300, false);


function toggleAutoPlay()
{
    if (autoPlaying)
    {
        timer.stop();
        autoPlaying = false;
        $("#autoplayBtn").text("Auto Play");
    }
    else
    {
        timer.play();
        autoPlaying = true;
        $("#autoplayBtn").text("Stop")
    }
}

$(document).ready(function(){
    $(document).keyup(function(e){
        //console.log("pressed: " + e.keyCode);
        if (isGameOver())
        {
            return;
        }
        onMove(e.keyCode - 37);
    });
    $("#autoplayBtn").on("click", function(){
        toggleAutoPlay();
    });

    $("#newGameBtn").on("click", function(){
        resetGame();
    });

    $("#gameOverMsg").hide();
    resetGame();
});
