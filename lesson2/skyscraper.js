/* Небоскреб */
var Drone = require('drone')

function skyscraper() {
    for (var i = 0; i < 10; i++) {
        this
        .box(42, 30, 1, 30)
        .up()
        .box0(20, 30, 5, 30)
        .up(5)
    }
}

Drone.extend(skyscraper)

/* Небоскреб Усложненная версия */
var Drone = require('drone')

function skyscraper(floors) {
    if (!floors) {
        floors = 10
    }
    for (var i = 0; i < floors; i++) {
        this
        .box(42, 30, 1, 30)
        .up()
        .box0(20, 30, 5, 30)
        .up(5)
    }
}

Drone.extend(skyscraper)
