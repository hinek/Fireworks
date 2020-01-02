var simpleBang = {
  projectileCount: 500,
  minAngle: 0,
  maxAngle: 2 * Math.PI,
  minVelocity: 0.5,
  maxVelocity: 5
};

var simpleRocket = {
  y: 600,
  projectileCount: 1,
  minAngle: 0,
  maxAngle: 0,
  minVelocity: 14,
  maxVelocity: 14,
  nextSteps: [
    {
      timeToStart: 600,
      instructions: simpleBang
    }
  ]
};

var fountain = {
  y: 600,
  positionFixed: true,
  projectileCount: 10,
  minAngle: -0.02 * Math.PI,
  maxAngle: 0.02 * Math.PI,
  minVelocity: 8,
  maxVelocity: 12,
  duration: 1500    
};

var sparkle = {
  projectileCount: 30,
  minAngle: 0,
  maxAngle: 2 * Math.PI,
  minVelocity: 0.5,
  maxVelocity: 5,
  duration: 550
};

var sparkleRocket = {
  y: 600,
  projectileCount: 1,
  minAngle: 0,
  maxAngle: 0,
  minVelocity: 14,
  maxVelocity: 14,
  nextSteps: [
    {
      timeToStart: 50,
      instructions: sparkle
    }
  ]
}

var smallSparkle = {
  projectileCount: 10,
  minAngle: 0,
  maxAngle: 2 * Math.PI,
  minVelocity: 0.5,
  maxVelocity: 1,
  duration: 2000
};

var sparkleBang = {
  projectileCount: 10,
  minAngle: -0.3 * Math.PI,
  maxAngle: 0.3 * Math.PI,
  minVelocity: 8,
  maxVelocity: 8,
  nextSteps: [
    {
      timeToStart: 50,
      instructions: smallSparkle
    }
  ]
}

var sparkleBangRocket = {
  y: 600,
  projectileCount: 1,
  minAngle: 0,
  maxAngle: 0,
  minVelocity: 10,
  maxVelocity: 10,
  nextSteps: [
    {
      timeToStart: 600,
      instructions: sparkleBang
    }
  ]
}

var sparkler = {
  x: 400,
  y: 300,
  positionFixed: true,
  projectileCount: 2,
  minAngle: 0,
  maxAngle: 2 * Math.PI,
  minVelocity: 3,
  maxVelocity: 4,
  duration: 1000
};

var miniBang = {
  projectileCount: 200,
  minAngle: 0,
  maxAngle: 2 * Math.PI,
  minVelocity: 0.5,
  maxVelocity: 2
};

var multiBang = {
  projectileCount: 20,
  minAngle: 0,
  maxAngle: 2 * Math.PI,
  minVelocity: 5,
  maxVelocity: 5,
  nextSteps: [
    {
      timeToStart: 300,
      instructions: miniBang
    }
  ]
};

var multiBangRocket = {
  y: 600,
  projectileCount: 1,
  minAngle: 0,
  maxAngle: 0,
  minVelocity: 14,
  maxVelocity: 14,
  nextSteps: [
    {
      timeToStart: 600,
      instructions: multiBang
    }
  ]
};

var spiral = {
  x: 400,
  y: 300,
  positionFixed: true,
  projectileCount: 20,
  minAngle: 0,
  maxAngle: 0.02 * Math.PI,
  minVelocity: 8,
  maxVelocity: 10,
  duration: 2000,
  rotateAngles: 0.04 * Math.PI
};

var fireWheel = {
  x: 400,
  y: 600,
  projectileCount: 1,
  minAngle: 0,
  maxAngle: 0,
  minVelocity: 10,
  maxVelocity: 10,
  colors: ["255,0,0","255,127,0","255,255,0"],
  nextSteps: [
    {
      timeToStart: 0,
      instructions: {
        projectileCount: 10,
        minAngle: 0,
        maxAngle: 0.02 * Math.PI,
        minVelocity: 10,
        maxVelocity: 10,
        duration: 2000,
        rotateAngles: 0.02 * Math.PI      
      }
    },
    {
      timeToStart: 0,
      instructions: {
        projectileCount: 10,
        minAngle: 0.5 * Math.PI,
        maxAngle: 0.52 * Math.PI,
        minVelocity: 10,
        maxVelocity: 10,
        duration: 2000,
        rotateAngles: 0.02 * Math.PI      
      }
    },
    {
      timeToStart: 0,
      instructions: {
        projectileCount: 10,
        minAngle: Math.PI,
        maxAngle: 1.02 * Math.PI,
        minVelocity: 10,
        maxVelocity: 10,
        duration: 2000,
        rotateAngles: 0.02 * Math.PI      
      }
    },
    {
      timeToStart: 0,
      instructions: {
        projectileCount: 10,
        minAngle: 1.5 * Math.PI,
        maxAngle: 1.52 * Math.PI,
        minVelocity: 10,
        maxVelocity: 10,
        duration: 2000,
        rotateAngles: 0.02 * Math.PI      
      }
    }
  ]
}