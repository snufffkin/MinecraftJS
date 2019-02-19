/* Антигриффер */
events.itemUse(function(event) {
	var player = event.player
	var item = player.getItemHeld()
	if (item.id == 259) {
		event.setCanceled()
	}
})

events.tNTActivate(function(event) {
    event.setCanceled()
})

/* Счетчик смертей */
var utils = require('utils')

events.playerRespawned(function(event) {
	var deaths = utils.stat(event.player,'deaths')
	echo(event.player,'You died ' + deaths + ' times!')
})

/* Водяная горка */
var Drone = require('drone')

function waterslide(width) {
    var d = this
    d.box(20, width + 6, width + 1, 1).fwd(6).box(20, width + 6, width + 1, 1).back(5)
    var n = width
    for (var i = 0; i < n; i++) {
        d.box(22, width, 1, 5).up(1)
        width--
    }
    this.right().down(2).box(9, 1, 1, 5)
}

Drone.extend(waterslide)

/* Arithmetic Challenge */

var utils = require('utils')
var inventory = require('inventory')
var items = require('items')

function sendAll(message) {
    var players = utils.players() 
    for(var i = 0; i < players.length; i++) {
        echo(players[i],message) 
    }
}

var rightAnswerQuiz = 0

function quiz() {
    var a = Math.ceil(Math.random() * 100)
    var b = Math.ceil(Math.random() * 100)
    rightAnswerQuiz = a + b
    sendAll(a + ' + ' + b + ' = ?')
}

events.chat(function(event) {
    var message = event.message
    if (rightAnswerQuiz == message) {
        echo(event.player, 'Right Answer!!!')
        inventory(event.player).add(items.cookie(1))
    }
})

setInterval(function() {
    quiz()
},10000)


/* Цветной чат */
/* js setColor(self,'red') */
var colors = [
  'black',
  'darkblue',
  'darkgreen', 
  'darkaqua', 
  'darkred',
  'darkpurple', 
  'gold', 
  'gray', 
  'darkgray', 
  'blue',
  'green', 
  'aqua', 
  'red', 
  'lightpurple', 
  'yellow', 
  'white'
];

var preferences = {}

function colorize( color, text ) {
  var index = colors.indexOf( color );
  if (index >= 0){
    return '\xa7' + index.toString(16) + text;
  } else {
    return text;
  }
}

function setColor(player, color) {
    preferences[player.name] = color
} 

exports.setColor = setColor

events.chat(function(event) {
    var player = event.player
    var playerChatColor = preferences[player.name]
    if (playerChatColor) {
        event.message = colorize(playerChatColor, event.message)
    }
})

/* Анти-оскорбления (кириллица может не работать)*/
var lightning = require('lightning')

var badWords = [
	'дурак',
	'осел',
	'олух',
	'отщепенец'
]

events.chat(function(event) {
	var message = event.message.toLowerCase()
	badWords.forEach(function(word) {
		if (message.indexOf(word) != -1) {
			event.message = 'This message is not avaliable!'
			lightning(event.player)
		}
	})
})

/* Мяукующий блок */
var sounds = require('sounds')

events.blockDestroy(function(event) {
	sounds.catMeow()
})

/* Firework show НЕ РАБОТАЕТ!*/
var firework = require('firework')

function fireworkShow(player) {
	firework(player.location)
}
exports.fireworkShow = fireworkShow

/* Vingardium leviossa */
var utils = require('utils')

function leviossa(player) {
	player = utils.player(player)
	player.motionY = 50
}

exports.leviossa = leviossa

/* Incendio */
var Drone = require('drone')

function incendio(player) {
    player = utils.player(player)
    var location = player.location
    location.x = Math.floor(location.x)
    location.y = Math.floor(location.y)
    location.z = Math.floor(location.z)
    var d = new Drone(location)
    d.box(51)
}

exports.incendio = incendio
