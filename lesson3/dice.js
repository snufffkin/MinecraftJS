var Drone = require('drone'); //stage 1

function dice() { //stage 1
    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < 10; i++) {
            var num = Math.ceil(Math.random() * 6)
            if (num < 3) {
                this
                .box(42)
            }
            this
            .right()
        }
        this
        .left(10)
        .fwd()
    }
} //stage 1

Drone.extend(dice)		
