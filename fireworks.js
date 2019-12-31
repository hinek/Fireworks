var canvas = null;
var ctx = null;
var elapsedMilliseconds = 0;
var time = 0;
var fireworks = [];
var projectiles = [];
var g = 9.81;
var colorSwitch = 0;

var addFirework = function(firework, startTime, x, colors) {
  var newFirework = Object.assign({}, firework); // clone object
  newFirework.x = x;
  newFirework.colors = colors;
  fireworks.push({
    startTime: startTime,
    firework: newFirework
  });
}

var createProjectiles = function(x, y, instructions) {
  for(var i = 0; i < instructions.count; i++) {
    angle = Math.random() * (instructions.maxAngle - instructions.minAngle) + instructions.minAngle;
    velocity = Math.random() * (instructions.maxVelocity - instructions.minVelocity) + instructions.minVelocity;
    projectiles.push({
      x: x,
      y: y,
      vx: velocity * Math.sin(angle),
      vy: velocity * Math.cos(angle) * -1,
      colors: [instructions.colors[++colorSwitch % instructions.colors.length]]
    });
  }
}

var runLoop = function(drawingCanvas) {
  canvas = drawingCanvas;
  ctx = canvas.getContext("2d");

  elapsedMilliseconds = Date.now();
  setInterval(iterateCheck, 1);
}

var iterateCheck = function() {
  var milliseconds = Date.now();
  iterate(milliseconds - elapsedMilliseconds);
  elapsedMilliseconds = milliseconds;
}

var iterate = function(elapsed) {
  time += elapsed;

  var i = fireworks.length;
  while (i--) {
    element = fireworks[i];
    if (time > element.startTime) {
      // create projectiles
      projectiles.push({
        x: element.firework.x,
        y: element.firework.y,
        vx: element.firework.vx,
        vy: element.firework.vy,
        colors: element.firework.colors,
        timeToNextStep: element.firework.timeToNextStep,
        nextStep: Object.assign({colors: element.firework.colors}, element.firework.nextStep), // clone object
        positionFixed: element.firework.positionFixed
      });
      // delete element
      fireworks.splice(i, 1);
    }
  }

  var i = projectiles.length;
  while (i--) {
    element = projectiles[i];

    element.vx *= 0.98;
    element.vy *= 0.98;

    element.vy += g * (elapsed / 1000);

    if (element.nextStep) {
      element.timeToNextStep -= elapsed;
      if (element.timeToNextStep <= 0) {
        // create new projectiles
        createProjectiles(element.x, element.y, element.nextStep);
        if (element.nextStep.duration && element.nextStep.duration > 0) {
          element.nextStep.duration -= elapsed;
        }
        else {
          element.nextStep = null;
          // delete projectile
          projectiles.splice(i, 1);
          continue;
        }
      }
    }

    if (!element.positionFixed) {
      element.x += element.vx * (elapsed / 10);
      element.y += element.vy * (elapsed / 10);
    }

    if (element.x < 0 || element.x > canvas.width || element.y < 0 || element.y > canvas.height) {
      projectiles.splice(i, 1);
    }
  }

  draw();
}

var draw = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  projectiles.forEach(element => {
    ctx.fillStyle = "rgba(" + element.colors[0] + ",1)";
    ctx.fillRect(element.x, element.y, 2, 2);    
  });
}