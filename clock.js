var canvas = document.getElementById("myCanvas");
var ct = canvas.getContext("2d");
canvas.width = 350;
canvas.height = 350;
var r = canvas.height / 2;

// biến điểm (r,r) thành gốc tọa độ (0,0)
ct.translate(r, r);
//
//drawClock();
setInterval(drawClock, 1000);

function drawClock() {
    drawFaceClock(ct);
    drawTime();
}

function drawFaceClock(ct) {
    ct.beginPath();
    ct.fillStyle = 'white';
    ct.arc(0, 0, r * 0.9, 0, 2 * Math.PI);
    ct.strokeStyle = '#111111';
    ct.stroke();
    ct.fill();
    ct.save();
    ct.restore();

    // draw hole hand
    ct.beginPath();
    ct.fillStyle = '#111111';
    ct.arc(0, 0, 7, 0, 2 * Math.PI);
    ct.stroke();
    ct.fill();

    // draw number
    ct.font = '14px Sans-Serif ';
    ct.textBaseline = "middle";
    ct.textAlign = "center";
    for (var i = 1; i <= 12; i++) {
        ct.beginPath();
        ct.rotate(Math.PI / 6 * i);
        ct.translate(0, -r * 0.8);
        ct.rotate(-Math.PI / 6 * i);
        ct.fillText(i, 0, 0);
        ct.rotate(Math.PI / 6 * i);
        ct.translate(0, r * 0.8);
        ct.rotate(-Math.PI / 6 * i);
    }

    // draw rule
    for (var i = 1; i <= 60; i++) {
        ct.beginPath();
        ct.rotate(6 * Math.PI / 180 * i);
        ct.translate(0, -r * 0.9);
        ct.moveTo(0, 0);
        if (i % 5 == 0) {
            ct.lineTo(0, 8);
            ct.lineWidth = 3;
        } else {
            ct.lineTo(0, 5);
            ct.lineWidth = 1;
        }
        ct.stroke();
        ct.translate(0, r * 0.9);
        ct.rotate(-6 * Math.PI / 180 * i);
    }
}

function drawTime() {
    var date = new Date();
    var hour = date.getHours() % 12,
        minute = date.getMinutes(),
        second = date.getSeconds();

    // draw second
    drawHand(ct, r * 0.85, "#AA0000", 3, Math.PI / 30 * second);

    // draw minute
    drawHand(ct, r * 0.75, "#000000", 5, Math.PI / 30 * minute + Math.PI / 30 * second / 60);

    // draw hour
    drawHand(ct, r * 0.6, "#000000", 8, Math.PI / 6 * hour + Math.PI / 360 * minute + Math.PI / 6 * second / 3600);
}

function drawHand(ct, length, color, width, angle) {
    ct.beginPath();
    ct.lineCap = "round";
    ct.strokeStyle = color;
    ct.lineWidth = width;
    ct.moveTo(0, 0);
    ct.rotate(angle);
    ct.lineTo(0, -length);
    ct.stroke();
    ct.rotate(-angle);
    ct.restore();
}