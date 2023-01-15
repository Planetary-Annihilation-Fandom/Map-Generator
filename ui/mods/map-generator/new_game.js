function getRandomSeed() {
    return Math.floor(65536 * Math.random());
}

// min and max is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max++;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


model.generateAwesomeSystem = function (model, event, seed) {
    return generateSystem(seed).then(function (system) {
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}

var clip = function (value, min, max) {
    return Math.min(max, Math.max(min, value));
}

$(function () {
    $('head').append('<link rel="stylesheet" href="coui://ui/mods/map-generator/asg.css" type="text/css" />');

    var root = $('.system-options');
    var templatesRoot = $('<div id="ap-controls" data-bind="visible: canChangeSettings"></div>');
    // insert our panel to system options

    root.append(templatesRoot);

    ko.applyBindings(model, templatesRoot[0]);

    var table = $('<table></table>');

    model.adjustVariable = function (observable, delta, min, max) {
        var v = model[observable];
        v(clip(v() + delta, min, max));
    }

    var lastRow;

    var addToTable = function (element) {
        var row = $('<tr></tr>');
        var data = $('<td class="td"></td>');
        data.append(element);
        row.append(data)
        table.append(row);

        ko.applyBindings(model, row[0]);
        lastRow = data;
    }
    var addToTableRow = function (element) {
        var data = $('<td class="td"></td>');
        data.append(element);
        lastRow.append(element)
        ko.applyBindings(model, data[0]);
    }

    var createButton = function (name, method) {
        var button = $(
            '<div class="btn_std_gray" data-bind="click: ' + method + '">' +
            '<div class="btn_std_label">' + name + '</div>' +
            '</div>');

        // ko.applyBindings(model, button[0])
        return button;
    }


    // templatesRoot.append($('<hr/>'))
    templatesRoot.append($('<label class="section_title_main"><b>TEMPLATES</b></label>'))
    templatesRoot.append(table);

    // addToTable(button);
    var duelContainer = $('<div></div>')
    var duelButton = createButton('Jebus', 'generateJebus');
    var duelButton2 = createButton('Macro', 'generateMacro');
    var duelButton3 = createButton('Titans', 'generateTitans');
    duelContainer.append(duelButton);
    duelContainer.append(duelButton2);
    duelContainer.append(duelButton3);

    var arenaContainer = $('<div></div>')
    var arenaButton = createButton('Berserk', 'generateBerserk');
    var arenaButton2 = createButton('Arena', 'generateArena');
    var arenaButton3 = createButton('Battlefield', 'generateBattlefield');
    arenaContainer.append(arenaButton);
    arenaContainer.append(arenaButton2);
    arenaContainer.append(arenaButton3);


    addToTable($('<label class="section_title_inner_duel"><b>Duel:</b></label>'))
    addToTable(duelContainer)
    addToTable($('<label class="section_title_inner_arena"><b>FFA:</b></label>'))
    addToTable(arenaContainer)
    addToTable($('<label class="section_title_inner_wadiya"><b>Specific:</b></label>'))
    addToTable(createButton('Wadiya', 'generateWadiya'))

    ko.applyBindings(model, duelContainer);
    ko.applyBindings(model, arenaContainer);
})

// TEMPLATES
model.generateJebus = function () {
    // var sys = getRandomSystem('Jebus', [380, 500], getRandomBiome(), [30, 30])

    getRandomSystem('Jebus', [380, 500], getRandomBiome(), [30, 30]).then(function(system){
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}
generateMacro = function () { 
    getRandomSystem('Macro', [450, 600], getRandomBiome(), [40, 50]).then(function(system){
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}
generateTitans = function () { 
    getRandomSystem('Titans', [500, 700], getRandomBiome(), [50, 60]).then(function(system){
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}

generateBerserk = function () { 
    getRandomSystem('Berserk', [380, 500], getRandomBiome(), [35, 40]).then(function(system){
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}
generateArena = function () {
    getRandomSystem('Arena', [450, 650], getRandomBiome(), [40, 50]).then(function(system){
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
 }
generateBattlefield = function () { 
    getRandomSystem('Battlefield', [600, 1300], getRandomBiome(), [50, 60]).then(function(system){
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}

generateWadiya = function () { 
    getRandomSystem('Wadiya', [600, 800], "moon", [80, 100]).then(function(system){
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}
// TEMPLATES END

getRandomBiome = function () {
    const biomes = ["earth", "desert", "lava", "tropical", "moon", "metal"];

    const random = Math.floor(Math.random() * biomes.length);
    console.log(random, biomes[random]);
    return biomes[random]
}

getRandomSystem = function (planetTitle, planetRadiusRange, biomeName, metalFactorRange) {
    console.log(biomeName +'passed to the generation')
    var seed = getRandomSeed();
    var radius = getRandomInt(planetRadiusRange[0], planetRadiusRange[1]);
    var metalFactor = getRandomInt(metalFactorRange[0], metalFactorRange[1]);

    var temperature = getRandomInt(0, 100);
    var waterDepth = getRandomInt(0, 60);
    var height = getRandomInt(0, 60);

    var mass = 10000;

    var slots = model.slots() || 2;

    var metalClustersRandom = Math.floor(slots / 10 * 50);
    // add sign in 50% cases
    metalClustersRandom *= Math.round(Math.random()) ? 1 : -1;

    var metalDensity = metalFactor;
    var metalClusters = 50 + metalClustersRandom;

    var planet = {
        mass: mass,
        intended_radius: radius,
        position_x: 50000,
        position_y: 0,
        velocity_x: 0,
        velocity_y: 100,
        starting_planet: true,
        required_thrust_to_move: 0,
        metalEstimate: 1,
        planet: {
            seed: seed,
            biome: biomeName,
            radius: radius,
            heightRange: height,
            waterHeight: waterDepth,
            waterDepth: 50,
            temperature: temperature,
            biomeScale: 100,
            metalDensity: metalDensity,
            metalClusters: metalClusters,
            landingZoneSize: 0,
            landingZonesPerArmy: 0,
            numArmies: 2,
            symmetricalMetal: false,
            symmetricalStarts: false,
            symmetryType: "none"
        }
    }

    var rSystem = {
        name: planetTitle + ' ' + metalClusters + ' ' + metalDensity,
        isRandomlyGenerated: true,
        players: [slots, slots]
    };

    var planets = [planet];

    var pgen = _.map(planets, function (plnt, index) {
        var biomeGet = $.getJSON('coui://pa/terrain/' + plnt.planet.biome + '.json')
            .then(function (data) {
                return data;
            });
        var nameGet = $.Deferred();
        api.game.getRandomPlanetName().then(function (name) { nameGet.resolve(name); });
        return $.when(biomeGet, nameGet).then(function (biomeInfo, name) {
            plnt.name = name;
            return plnt;
        });
    });

    return $.when.apply($, pgen).then(function () {
        rSystem.planets = Array.prototype.slice.call(arguments, 0);
        return rSystem;
    });
}