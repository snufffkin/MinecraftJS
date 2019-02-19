var lightning = require('lightning')
var Drone = require('drone')
var spawn = require('spawn')
var entities = require('entities')

/* Пуляющий молнии лук/снежок */
events.projectileHit(function(event) {
    lightning(event.projectile)
})

/* В то место, куда бросили снежок/стрелу падает груда динамита и в */
events.projectileHit(function(event) {
    var location = event.projectile.location
    var d = new Drone(location)
    d.up(75).box(46).up().box(73)
})

/* Когда игрок двигается, в чат пишется сообщение */
events.playerMove(function(event) {
    echo(event.player, "Hello")
})

/* Когда игрок двигается, под ним строится случайного цвета блок шерсти */
events.playerMove(function(event) {
    var location = event.player.location
    location.y -= 1
    var d = new Drone(location)
    d.box('35:' + Math.ceil(Math.random() * 15))
})

/* Снежок/стрела спаунящая зомби*/
events.projectileHit(function(event) {
    var location = event.projectile.location
    spawn(entities.zombie(), location)
})
