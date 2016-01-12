/**
 * Created by JowayWong on 2015/11/16.
 */
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");

var width = canvas.width,
    height = canvas.height;
var cancelFlag;

var gridImgData;
var bgColor = "blanchedalmond";

var now,
    last = new Date().getTime(),//返回毫秒数
    accumulator = 0,//积累到的时间间隔
    interval = 5000 / 20;//帧间时间间隔，单位毫秒


var gridStep = 20,//每个格子长度
    beginLen = 100,
    snake;

//蛇的转折点(维护一个字典，允许多个转折点)
var turningPointX = -1,//值为-1则表示不需要转折
    turningPointY = -1,
    turningLength = 0;//转折点上，新建一条蛇。并维护一个长度，一直更新到长度递减为0

var directionX,
    directionY;


var subSnake = null;
var headerSnake = null;

//事件处理
//必须要用window，因为canvas不是一个Input对象，所以无法使用键盘监听事件！
//canvas.addEventListener("keydown", divertDirection, false);
window.addEventListener("keydown", doKeyPress, false);
function doKeyPress(e) {
    var keyID = e.keyCode ? e.keyCode : e.which;
    switch (keyID) {
        case 37://left
            if (snake.directionX != 1 && snake.directionY != 0) {
                directionX = -1;
                directionY = 0;
                turningPointX = snake.x;
                turningPointY = snake.y;
                turningLength = snake.length;
            }
            break;
        case 38://up
            if (snake.directionX != 0 && snake.directionY != 1) {
                directionX = 0;
                directionY = -1;
                turningPointX = snake.x;
                turningPointY = snake.y;
                turningLength = snake.length;
            }
            break;
        case 39://right
            if (snake.directionX != -1 && snake.directionY != 0) {
                directionX = 1;
                directionY = 0;
                turningPointX = snake.x;
                turningPointY = snake.y;
                turningLength = snake.length;
            }
            break;
        case 40://down
            if (snake.directionX != 0 && snake.directionY != -1) {
                directionX = 0;
                directionY = 1;
                turningPointX = snake.x;
                turningPointY = snake.y;
                turningLength = snake.length;
            }
            break;
    }
}


//绘制分界线
function drawBoundaryLine() {
    context.save();

    context.beginPath();
    context.strokeStyle = "blue";
    context.lineWidth = 1;
    for (var w = gridStep; w < width; w += gridStep) {
        context.moveTo(w, 0);
        context.lineTo(w, height);
    }
    for (var h = gridStep; h <= height; h += gridStep) {
        context.moveTo(0, h);
        context.lineTo(width, h);
    }
    context.closePath();
    context.stroke();

    gridImgData = context.getImageData(0, 0, gridStep, gridStep);
    context.restore();
}


//暂时设置成遇到墙壁终止Game Over
//传入snake对象，绘制该snake
function updateSnake(snk) {
    context.save();
    context.fillStyle = "green";
    context.beginPath();
    //context.rect(snake.x,snake.y,snake.directionX*(snake.x+snake.length)
    //    ,snake.directionY*(snake.y+snake.length));
    for (var x = snk.x, y = snk.y, len = gridStep;
         x >= 0 && x <= width && y >= 0 && y <= height && len <= snk.length;
         x += -snk.directionX * gridStep, y += -snk.directionY * gridStep, len += gridStep) {
        //绘制头部
        if (x == snk.x && y == snk.y) {
            context.arc(x + gridStep / 2, y + gridStep / 2, gridStep / 2, 0, Math.PI * 2);
        }
        //绘制身体
        else {
            context.rect(x, y, gridStep, gridStep);
        }
    }
    context.closePath();
    context.fill();

    //擦除尾部
    context.putImageData(gridImgData, snk.tailX, snk.tailY);
    ////恢复当前格子里的分界线
    //context.beginPath();
    //context.strokeStyle = "blue";
    //context.lineWidth = 0.5;
    //var curX = snk.tailX,
    //    curY = snk.tailY,
    //    nextX = snk.tailX - snk.directionX * gridStep,
    //    nextY = snk.tailY - snk.directionY * gridStep;
    //context.moveTo(curX, curY);
    //context.lineTo(nextX, nextY);
    //context.lineTo(nextX, nextY + gridStep);
    //context.lineTo(nextX - gridStep, nextY + gridStep);
    //context.lineTo(curX, curY);
    //context.closePath();
    //context.stroke();


    context.restore();

    //停止
    if (snake.length > 1000) {
        cancelRequestAnimationFrame(cancelFlag);
    }

}

function createSnake(x, y, lenth, dirX, dirY) {
    var tempSnake = {};
    tempSnake.x = x;
    tempSnake.y = y;
    tempSnake.length = lenth;

    tempSnake.directionX = dirX;
    tempSnake.directionY = dirY;

    //尾巴坐标
    tempSnake.tailX = tempSnake.x - tempSnake.directionX * tempSnake.length;
    tempSnake.tailY = tempSnake.y - tempSnake.directionY * tempSnake.length;

    return tempSnake;
}


//移动一步,函数中处理蛇的转折逻辑
function moveOn(snk) {

    updateSnake(snk);

    //头部向前
    snk.x = snk.x + snk.directionX * gridStep;
    snk.y = snk.y + snk.directionY * gridStep;

    //尾巴更新
    snk.tailX = snk.x - snk.directionX * snk.length;
    snk.tailY = snk.y - snk.directionY * snk.length;
}

function subSnakeMoveOn(sub) {
    if (sub.length != 0) {
        //擦除尾部
        context.putImageData(gridImgData, sub.tailX, sub.tailY);
        sub.tailX = sub.tailX + sub.directionX * gridStep;
        sub.tailY = sub.tailY + sub.directionY * gridStep;
        sub.length -= gridStep;
    }
    else {
        sub = null;
    }
}

function animate() {
    now = new Date().getTime();
    accumulator += (now - last);
    last = now;

    while (accumulator >= interval) {
        if (turningLength == 0) {//没有子蛇
            moveOn(snake);
        }
        else {//有子蛇
            if (headerSnake != null && headerSnake.length >= snake.length) {//子蛇结束
                context.putImageData(gridImgData, subSnake.tailX, subSnake.tailY);
                snake = createSnake(headerSnake.x, headerSnake.y, headerSnake.length,
                    headerSnake.directionX, headerSnake.directionY);
                turningLength = 0;
                subSnake = null;
                headerSnake = null;
                moveOn(snake);
            }
            else {
                //若还未创建子蛇则创建子蛇
                if (subSnake == null && headerSnake == null) {
                    headerSnake = createSnake(turningPointX + directionX * gridStep,
                        turningPointY + directionY * gridStep, 20, directionX, directionY);
                    subSnake = createSnake(turningPointX, turningPointY, turningLength,
                        snake.directionX, snake.directionY);
                }
                subSnakeMoveOn(subSnake);
                headerSnake.length += 20;
                moveOn(headerSnake);
            }
        }
        accumulator -= interval;
    }
    cancelFlag = requestAnimationFrame(animate);

}

function init() {
    drawBoundaryLine();

    //随机设立蛇的初始位置，并确保是20的整数倍
    var iX = Math.random() * width;
    iX = iX - iX % gridStep;
    var iY = Math.random() * height;
    iY = iY - iY % gridStep;
    snake = createSnake(iX, iY, beginLen, -1, 0);

    animate();
}

init();
