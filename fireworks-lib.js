var canvas = null;
var ctx = null;
var elapsedMilliseconds = 0;
var time = 0;
var starts = [];
var projectiles = [];
var g = 9.81;
var colorSwitch = 0;

var addStart = function(startTime, instructions, changes) {
  let clone = cloneInstructions(instructions);
  clone = Object.assign(clone, changes);
  starts.push({
    startTime: startTime,
    instructions: clone
  });
}

var cloneInstructions = function(instructions) {
  return JSON.parse(JSON.stringify(instructions));
/*  let clone = Object.assign({}, instructions);
  if (instructions.nextSteps) {
    clone.nextSteps = [];
    for (let i = 0; i < instructions.nextSteps.length; i++) {
      clone.nextSteps.push({
        timeToStart: instructions.nextSteps[i].startTime,
        instructions: cloneInstructions(instructions.nextSteps[i].instructions)
      });
    }
  }

  return clone;*/
}

var createProjectiles = function(x, y, instructions) {
  for(let i = 0; i < instructions.projectileCount; i++) {
    angle = Math.random() * (instructions.maxAngle - instructions.minAngle) + instructions.minAngle;
    velocity = Math.random() * (instructions.maxVelocity - instructions.minVelocity) + instructions.minVelocity;

    let newProjectile = {
      x: x,
      y: y,
      vx: velocity * Math.sin(angle),
      vy: velocity * Math.cos(angle) * -1,
      colors: [instructions.colors[++colorSwitch % instructions.colors.length]],
    };

    if (instructions.nextSteps) {
      newProjectile.nextSteps = cloneInstructions(instructions).nextSteps;
      for(let k = 0; k < newProjectile.nextSteps.length; k++) {
        newProjectile.nextSteps[k].instructions.colors = instructions.colors;
      }
    }

    projectiles.push(newProjectile);
  }
}

var runLoop = function(drawingCanvas) {
  canvas = drawingCanvas;
  ctx = canvas.getContext("2d");

  elapsedMilliseconds = Date.now();
  setInterval(iterateCheck, 1);
}

var iterateCheck = function() {
  let milliseconds = Date.now();
  iterate(milliseconds - elapsedMilliseconds);
  elapsedMilliseconds = milliseconds;
}

var iterate = function(elapsed) {
  time += elapsed;

  let startsIndex = starts.length;
  while(startsIndex--) {
    if (time > starts[startsIndex].startTime) {
      let instructions = starts[startsIndex].instructions;
      createProjectiles(instructions.x, instructions.y, instructions);
      if (instructions.duration && instructions.duration > 0) {
        instructions.duration -= elapsed;
        if (instructions.rotateAngles) {
          instructions.minAngle += instructions.rotateAngles * elapsed / 10;
          instructions.maxAngle += instructions.rotateAngles * elapsed / 10;
        }
  }      
      else {
        starts.splice(startsIndex, 1);
      }
    }
  }

  let pIndex = projectiles.length;
  while (pIndex--) {
    let element = projectiles[pIndex];

    // friction
    element.vx *= Math.pow(0.99, elapsed / 10);
    element.vy *= Math.pow(0.99, elapsed / 10);

    // gravity
    element.vy += g * (elapsed / 1000);

    // check next steps
    if (element.nextSteps && element.nextSteps.length > 0) {
      let stepIndex = element.nextSteps.length;
      while (stepIndex--) {
        let nextStep = element.nextSteps[stepIndex];
        nextStep.timeToStart -= elapsed;
        if (nextStep.timeToStart <= 0) {
          createProjectiles(element.x, element.y, nextStep.instructions);
          if (nextStep.instructions.duration && nextStep.instructions.duration > 0) {
            nextStep.instructions.duration -= elapsed;
            if (nextStep.instructions.rotateAngles) {
              nextStep.instructions.minAngle += nextStep.instructions.rotateAngles * elapsed / 10;
              nextStep.instructions.maxAngle += nextStep.instructions.rotateAngles * elapsed / 10;
            }
          }
          else {
            // delete next step
            element.nextSteps.splice(stepIndex, 1);
            continue;
          }
        }
      }

      // delete projectile if no steps left
      if (element.nextSteps.length === 0) {
        projectiles.splice(pIndex, 1);
        continue;
      }
    }

    // move projectile (if not fixed)
    if (!element.positionFixed) {
      element.x += element.vx * (elapsed / 10);
      element.y += element.vy * (elapsed / 10);
    }

    // delete projectile (if out of canvas)
    if (element.x < 0 || element.x > canvas.width || element.y < 0 || element.y > canvas.height) {
      projectiles.splice(pIndex, 1);
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