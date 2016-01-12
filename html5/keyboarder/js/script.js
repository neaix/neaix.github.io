/**
 * Created by joway on 15/12/14.
 */
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    btnBeginPause = document.getElementById("beginOrPause"),
    btnReset = document.getElementById("reset"),
    rank = 1,
    goal = 0,
    now,
    last = new Date().getTime(),//返回毫秒数
    accumulator = 0,//积累到的时间间隔
    interval = 8000 / 20,//帧间时间间隔，单位毫秒, 等级越高,这个越小
    width = canvas.width,
    height = canvas.height,
    isPaused = false,
    curHeight = 0,
    explodeLen = 6,
    explodeCount = 0,
    bonusGap = 0,
    balls = [],
    pauseHandle = null,
    exploreHandle = null,
    progressbar = $("#progressbar"),
    goalStep = 60; //每个等级间间隔多少分


// 进度条初始化
progressbar.progressbar({
    value: rank * 10
});

// 暂停canvas 初始时hide
var pauseCanvas = document.getElementById("pauseCanvas"),
    pauseContext = pauseCanvas.getContext("2d");
pauseContext.font = "40px Arial";
pauseContext.fillText("暂停中....", 230, 160);
$("#pauseCanvas").hide();


// key code Map:
// A-Z : [65,90]
function getLetterFromKeyCode(keycode) {
    return String.fromCharCode(keycode);
}


// 事件监听:

btnBeginPause.onclick = function () {
    if (isPaused) {//在暂停时按下开始
        btnBeginPause.innerHTML = "暂停";
        isPaused = !isPaused;
        last = new Date().getTime();//要更新last time,否则不会在把暂停的时间给算进去
        animate();

        $("#content").slideDown();

        $("#pauseCanvas").slideUp();

    }
    else {//在运行时按下暂停
        btnBeginPause.innerHTML = "开始";
        isPaused = !isPaused;
        cancelAnimationFrame(pauseHandle);

        $("#content").slideUp();

        $("#pauseCanvas").slideDown();

    }

};

btnReset.onclick = function () {
    $("#canvas").fadeOut();
    balls = [];
    curHeight = 0;
    goal = 0;
    rank = 1;
    progressbar.progressbar({
        value: rank * 10
    });
    $("#curRank").html(rank);

    $("#canvas").fadeIn();
};

//必须要用window，因为canvas不是一个Input对象，所以无法使用键盘监听事件！
//canvas.addEventListener("keydown", divertDirection, false);
//把字符变成相应字符码
window.addEventListener("keydown", doKeyPress, false);

function doKeyPress(e) {
    if (!isPaused) {
        var keyID = e.keyCode ? e.keyCode : e.which;
        var waitForDeleteIndexs = [];
        if (balls != null) {
            for (var i = 0; i < balls.length; ++i) {
                if (balls[i].letter == getLetterFromKeyCode(keyID)) {
                    goal += 10;
                    waitForDeleteIndexs.push(i);
                }
            }
        }
        for (var i = waitForDeleteIndexs.length - 1; i >= 0; --i) {
            context.save();
            explode(balls[waitForDeleteIndexs[i]].width, balls[waitForDeleteIndexs[i]].height + curHeight, 50);
            context.restore();
            balls.splice(waitForDeleteIndexs[i], 1);
        }
    }
}

/*
逻辑处理
 */
/*
 随机在高度为[20,100]的范围之间随机放置小球
 1. 小球的数量为: rank*3
 2. 小球的字母随机
 */
function getRandLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}

function createLetterBalls(count) {
    var ballMap = [];
    for (var i = 0; i < count; ++i) {
        var temp = {};
        var w = i * 50 + Math.random() * width / rank / 2;
        var h = curHeight + Math.floor(Math.random() * 100);
        temp.letter = getRandLetter();
        temp.width = w;
        temp.height = h;
        ballMap[i] = temp;
    }
    return ballMap;
}
function getRandomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

function drawLetterBalls() {
    ++bonusGap;
    if (bonusGap > 20) {
        bonusGap = 0;
        // to do
        context.fillText(getRandLetter(), Math.random() * width, Math.random * height - 200);
    }
    context.font = "20px Arial";
    if (balls.length == 0) {
        balls = createLetterBalls(rank * 3);
    }
    for (var i = 0; i < balls.length; ++i) {
        context.fillStyle = getRandomColor();
        context.fillText(balls[i].letter, balls[i].width, balls[i].height + curHeight);
    }

}

function explode(x, y, r) {
    context.save();
    // 清除画布
    context.clearRect(x - r - 1, y - r - 1, r * 2 + 2, r * 2 + 2);
    context.translate(x, y);

    for (var i = 1; i < explodeLen; i++) {
        context.save();
        context.fillStyle = getRandomColor();

        for (var j = 0; j < i * explodeLen; j++) {
            context.fillStyle = getRandomColor();
            context.rotate(Math.PI * 2 / (i * explodeLen));
            context.beginPath();
            context.arc(0, i * explodeCount * r / 30, 1, 0, Math.PI * 2, true);
            context.fill();
        }

        context.restore();
    }
    context.restore();

    if (explodeCount < explodeLen) {
        explodeCount++;
        exploreHandle = requestAnimationFrame(function () {
            explode(x, y, r);
        });
    }
    else {
        context.clearRect(x - r - 1, y - r - 1, r * 2 + 2, r * 2 + 2);
        explodeCount = 0;
        cancelAnimationFrame(exploreHandle);
    }
}


function animate() {

    now = new Date().getTime();
    accumulator += (now - last);
    last = now;
    //console.log(accumulator);
    var gap = interval / 5;
    if (balls.length <= 0) {
        curHeight = 0;
        balls = createLetterBalls(rank * 3);
    }
    if (rank < 10) {
        if ((Math.floor(goal / goalStep) + 1) > rank) {
            rank = Math.floor(goal / goalStep);
            progressbar.progressbar({
                value: rank * 10
            });
            $("#curRank").html(rank);
        }
    }

    $("#goal").html(goal);
    while (accumulator >= gap) {
        accumulator -= gap;
        context.clearRect(0, 0, width, height);
        drawLetterBalls();
        curHeight += 5;
        if (curHeight >= height) {
            curHeight = 0;
            balls = createLetterBalls(rank * 3);
        }
    }
    pauseHandle = requestAnimationFrame(animate);
}

animate();