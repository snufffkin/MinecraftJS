/*
    Игра "Моб-арена"
    Разработана учениками детской школы цифрового творчества "Кодабра"

    Правила:
    1. Перед началом игры инвентарь игрока очищается
    2. Для каждой игры строится своя арена
    3. Цель игры: дожить до последнего раунда
    4. В начале каждого раунда спаунится определенное количество зомби
    5. Следующий раунд наступает вне зависимости от того, сколько осталось мобов на арене
    6. В случае смерти игрока уровень сбрасывается на несколько вниз
    7. Каждый раз, когда игрок убивает определенное количество мобов, ему выдается новое оружие

    Запуск:
    /js mobArenaGame(self)

*/

var Drone = require('drone'); //модуль для строительства
var inventory = require('inventory'); //модульдля управления инвентарем
var items = require('items'); //модуль для предметов
var blocks = require('blocks'); //модуль для списка блоков
var entities = require('entities'); //
var teleport = require('teleport');
var spawn = require('spawn');
var utils = require('utils');
var slash = require('slash');

var magInit = {
    spawnPlayer:{}, //точка спауна игрока
    spawnMob:{}, //точка спауна мобов
    score: 0,
    incScore: 5, //количество убийств, нужное для выдачи оружия
    magGameOn: false, //флаг игры
    level: 1, //уровень игрока
    maxLevel: 10,  //последниц уровень
    difficulty: 1, //сложность мобов
    penalty: 5, //сброс уровня, в случае смерти
    timeToLevel: 10 //время в секундах до начала следующего раунда
}

function playerSpawn(event) { //спаун игрока после смерти на точке спауна
    if (magInit.magGameOn) {
        teleport(event.player,magInit.spawnPlayer);
        magInit.level -= magInit.penalty; //сброс уровня
        if (magInit.level <= 0) {
            magInit.level = 1;
        }
    }
}

events.playerRespawned(playerSpawn)

function mobArenaGame(player) { //раунд - 10 секунда. magInit.level - количество монстров за раунд
    var d = this;
    magInit.magGameOn = true; //устанавливаем флаг игры в поднятое состояние
    
    function modeStart() {
        slash('difficulty ' + magInit.difficulty, player);
        slash('gamemode 0', player);
        slash('time set night', player);
        slash('clear @p', player);
        slash('gamerule doMobLoot false', player);
        slash('gamerule keepInventory true', player);
    }

    function modeStop() {
        slash('difficulty 0', player);
        slash('gamemode 1', player);
        slash('gamerule doMobLoot true', player);
        slash('gamerule keepInventory false', player);
    }
    
    function mobArena() { //постройка арены
        magInit.spawnMob = //строим арену и получаем точку спауна мобов
        d
        .cylinder(blocks.iron, 10, 1)
        .cylinder0(blocks.iron, 10, 5)
        .up(3)
        .cylinder0(blocks.glowstone, 10, 1)
        .up(2)
        .cylinder(blocks.glass, 10, 1)
        .down(5)
        .fwd(10)
        .right(10)
        .up(3)
        .getLocation()
        teleport(player,magInit.spawnMob)
        magInit.spawnPlayer = magInit.spawnMob;  //точка спауна игрока в точке спауна мобов
    }

    function giveWeapon() {
        var weapons = [items.stoneSword(1), //список вознаграждений
                       items.stoneAxe(1),
                       items.goldSword(1),
                       items.goldAxe(1),
                       items.ironSword(1),
                       items.diamondSword(1)]
        var kills = (stat() - killsStart)
        if (kills >= magInit.score) {
            inventory(player).add(weapons[Math.floor(kills / magInit.incScore)])
            magInit.score += magInit.incScore;
        }
    }

    function mobSpawn() { //спаун определенного количества мобов
        var count = magInit.level;
        setInterval(function() {
            spawn(entities.zombie(), magInit.spawnMob);
            count--;
            if (!count) {
                clearInterval();
            }
        },500)
    }

    function stat() { //информация об убитых монстрах
        var mobCount = utils.stat(player, 'mobkills')
        return mobCount;
    }

    mobArena(); //строим арену
    modeStart()
    var killsStart = stat(); //получаем количество убитых мобов перед игрой
    var time = 0;
    setInterval(function(){
        giveWeapon(); //проверяем получит ли игрок оружие или нет
        time++;
        if (time % magInit.timeToLevel == 0) { //спауним мобов
            echo(player,'Уровень ' + magInit.level);
            if (magInit.level == magInit.maxLevel) {
                magInit.magGameOn = false;
                modeStop()
                echo(player, 'Моб арена пройдена')
                clearInterval()
            }
            mobSpawn();
            magInit.level++;
        }
    },1000)
}

Drone.extend(mobArenaGame)
