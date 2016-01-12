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
    last = new Date().getTime(),//���غ�����
    accumulator = 0,//���۵���ʱ����
    interval = 5000 / 20;//֡��ʱ��������λ����


var gridStep = 20,//ÿ�����ӳ���
    beginLen = 100,
    snake;

//�ߵ�ת�۵�(ά��һ���ֵ䣬������ת�۵�)
var turningPointX = -1,//ֵΪ-1���ʾ����Ҫת��
    turningPointY = -1,
    turningLength = 0;//ת�۵��ϣ��½�һ���ߡ���ά��һ�����ȣ�һֱ���µ����ȵݼ�Ϊ0

var directionX,
    directionY;


var subSnake = null;
var headerSnake = null;

//�¼�����
//����Ҫ��window����Ϊcanvas����һ��Input���������޷�ʹ�ü��̼����¼���
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


//���Ʒֽ���
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


//��ʱ���ó�����ǽ����ֹGame Over
//����snake���󣬻��Ƹ�snake
function updateSnake(snk) {
    context.save();
    context.fillStyle = "green";
    context.beginPath();
    //context.rect(snake.x,snake.y,snake.directionX*(snake.x+snake.length)
    //    ,snake.directionY*(snake.y+snake.length));
    for (var x = snk.x, y = snk.y, len = gridStep;
         x >= 0 && x <= width && y >= 0 && y <= height && len <= snk.length;
         x += -snk.directionX * gridStep, y += -snk.directionY * gridStep, len += gridStep) {
        //����ͷ��
        if (x == snk.x && y == snk.y) {
            context.arc(x + gridStep / 2, y + gridStep / 2, gridStep / 2, 0, Math.PI * 2);
        }
        //��������
        else {
            context.rect(x, y, gridStep, gridStep);
        }
    }
    context.closePath();
    context.fill();

    //����β��
    context.putImageData(gridImgData, snk.tailX, snk.tailY);
    ////�ָ���ǰ������ķֽ���
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

    //ֹͣ
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

    //β������
    tempSnake.tailX = tempSnake.x - tempSnake.directionX * tempSnake.length;
    tempSnake.tailY = tempSnake.y - tempSnake.directionY * tempSnake.length;

    return tempSnake;
}


//�ƶ�һ��,�����д����ߵ�ת���߼�
function moveOn(snk) {

    updateSnake(snk);

    //ͷ����ǰ
    snk.x = snk.x + snk.directionX * gridStep;
    snk.y = snk.y + snk.directionY * gridStep;

    //β�͸���
    snk.tailX = snk.x - snk.directionX * snk.length;
    snk.tailY = snk.y - snk.directionY * snk.length;
}

function subSnakeMoveOn(sub) {
    if (sub.length != 0) {
        //����β��
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
        if (turningLength == 0) {//û������
            moveOn(snake);
        }
        else {//������
            if (headerSnake != null && headerSnake.length >= snake.length) {//���߽���
                context.putImageData(gridImgData, subSnake.tailX, subSnake.tailY);
                snake = createSnake(headerSnake.x, headerSnake.y, headerSnake.length,
                    headerSnake.directionX, headerSnake.directionY);
                turningLength = 0;
                subSnake = null;
                headerSnake = null;
                moveOn(snake);
            }
            else {
                //����δ���������򴴽�����
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

    //��������ߵĳ�ʼλ�ã���ȷ����20��������
    var iX = Math.random() * width;
    iX = iX - iX % gridStep;
    var iY = Math.random() * height;
    iY = iY - iY % gridStep;
    snake = createSnake(iX, iY, beginLen, -1, 0);

    animate();
}

init();
