var Drone = require('drone');

function spleef() {
    this
    .cylinder(10, 1, 10)
    .up()
    .cylinder(80, 1, 10)
    .cylinder0(42, 5, 10)
}

Drone.extend(spleef)
