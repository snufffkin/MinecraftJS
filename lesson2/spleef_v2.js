var Drone = require('drone'); 

function spleef() {
    this 
    .cylinder(10, 1, 10)
    .up() 
    .chkpt('start') //stage 1
    .cylinder(80, 1, 10) 
    .cylinder0(42, 5, 10) 
}

function respleef() { //stage 2
    this //stage 3
    .move('start') //stage 3
    .cylinder(80, 1, 10) //stage 3
} //stage 2

Drone.extend(spleef) 
Drone.extend(respleef) //stage 4
