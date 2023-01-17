function getRandomSeed() {
    return Math.floor(65536 * Math.random());
}

// min and max is inclusive (tatarstan)
function getRandomInt(min, max) {

    if (min === max)
        return max;

    min = Math.ceil(min);
    max++; // make max inclusive (tatarstan)
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive (stackoverflow)
}

function getRandomIndex(length) {
    Math.floor(Math.random() * length);
}

$(function () {
    $('head').append('<link rel="stylesheet" href="coui://ui/mods/map-generator/asg.css" type="text/css" />');

    var root = $('.system-options');
    var templatesRoot = $('<div id="ap-controls" data-bind="visible: canChangeSettings"></div>');
    // insert our panel to system options

    root.append(templatesRoot);

    ko.applyBindings(model, templatesRoot[0]);

    var table = $('<table></table>');

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

    var specificContainer = $('<div></div>')
    var comboxButton = createButton("Combox", "generateCombox")
    var wadiyaButton = createButton("Wadiya", "generateWadiya")
    var wateriyaButton = createButton("Wateriya", "generateWateriya")
    specificContainer.append(comboxButton)
    specificContainer.append(wadiyaButton)
    specificContainer.append(wateriyaButton)


    addToTable($('<label class="section_title_inner_duel"><b>Duel:</b></label>'))
    addToTable(duelContainer)
    addToTable($('<label class="section_title_inner_arena"><b>FFA:</b></label>'))
    addToTable(arenaContainer)
    addToTable($('<label class="section_title_inner_wadiya"><b>Specific:</b></label>'))
    addToTable(specificContainer)

    ko.applyBindings(model, duelContainer);
    ko.applyBindings(model, arenaContainer);
    ko.applyBindings(model, specificContainer);
})

// TEMPLATES
function generateJebus() {

    getRandomSystem('Jebus', [380, 500], getRandomBiome(), [30, 30]).then(function (system) {
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}
function generateMacro() {
    getRandomSystem('Macro', [450, 600], getRandomBiome(), [40, 50]).then(function (system) {
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}
function generateTitans() {
    getRandomSystem('Titans', [500, 700], getRandomBiome(), [50, 60]).then(function (system) {
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}

function generateBerserk() {
    getRandomSystem('Berserk', [380, 500], getRandomBiome(), [35, 40]).then(function (system) {
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}
function generateArena() {
    getRandomSystem('Arena', [450, 650], getRandomBiome(), [40, 50]).then(function (system) {
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}
function generateBattlefield() {
    getRandomSystem('Battlefield', [600, 1300], getRandomBiome(), [50, 60]).then(function (system) {
        model.system(system);
        model.updateSystem(model.system());
        model.changeSettings();
        model.requestUpdateCheatConfig();
    });
}


function generateCombox() {
    getRandomSystem('Combox'), [150, 350], getRandomBiome(), [100, 100],
        createGenerationOptions(undefined, undefined, getRandomInt(40, 70)).then(function (system) {
            model.system(system);
            model.updateSystem(model.system());
            model.changeSettings();
            model.requestUpdateCheatConfig();
        })
}
function generateWadiya() {
    getRandomSystem('Wadiya', [600, 800], moonBiome, [80, 100],
        createGenerationOptions(undefined, 0, undefined)).then(function (system) {
            model.system(system);
            model.updateSystem(model.system());
            model.changeSettings();
            model.requestUpdateCheatConfig();
        })
}
function generateWateriya() {
    getRandomSystem('Wateriya', [600, 800], getRandomBiome([earthBiome, tropicalBiome]), [80, 100],
        createGenerationOptions(undefined, 70, undefined)).then(function (system) {
            model.system(system);
            model.updateSystem(model.system());
            model.changeSettings();
            model.requestUpdateCheatConfig();
        })
}
// TEMPLATES END

// FUNCTIONS
// Default biomes
const earthBiome = "earth"
const desertBiome = "desert"
const lavaBiome = "lava"
const tropicalBiome = "tropical"
const moonBiome = "moon"
const metalBiome = "metal"


// api.mods.getMounted("client", true).then(function (mods) {
//     var modMounted = function (modIdentifier) {
//       return _.some(mods, { identifier: modIdentifier });
//     };
//     // Shared Systems for Galactic War
//     if (modMounted("com.wondible.pa.gw_shared_systems"))

function getAllPossibleBiomes() {
    const defaultBiomes = [earthBiome, desertBiome, lavaBiome, tropicalBiome, moonBiome, metalBiome]
    return defaultBiomes
}

function getRandomBiome(biomes = undefined) {
    if (biomes === undefined)
        biomes = getAllPossibleBiomes();

    const random = getRandomIndex(biomes.length);
    console.log(random, biomes[random]);
    return biomes[random];
}

function getOneOfWaterGenerationOption() {
    const types = ["random", "nowater", "muchwater"]
    const type = types[getRandomIndex(types.length)]

    switch (type) {
        case "random": return getRandomInt(0, 50); break;
        case "nowater": return 0; break;
        case "muchwater": return getRandomInt(50, 70); break;
    }
    return 0
}

// Use undefined to get random value
function createGenerationOptions(temperature, waterDepth, height) {
    if (temperature === undefined)
        temperature = getRandomInt(0, 100)
    if (waterDepth === undefined)
        waterDepth = getOneOfWaterGenerationOption();
    if (height === undefined)
        height = getRandomInt(0, 60);
    return { temperature: temperature, waterDepth: waterDepth, height: height }
}

function getRandomSystem(planetTitle, planetRadiusRange, biomeName, metalFactorRange,
    generationOptions = undefined) {

    if (generationOptions === undefined)
        generationOptions = createGenerationOptions(undefined, undefined, undefined)

    console.log(biomeName + ' passed to the generation')

    // Gameplay
    var seed = getRandomSeed();
    var radius = getRandomInt(planetRadiusRange[0], planetRadiusRange[1]);
    var metalFactor = getRandomInt(metalFactorRange[0], metalFactorRange[1]);

    // Planet surface
    const temperature = generationOptions.temperature;
    const waterDepth = generationOptions.waterDepth;
    const height = generationOptions.height;

    // Orbit parameter, does nothing but need to initialize
    var mass = 10000;

    // Players
    var slots = model.slots() || 2;

    var metalSlotsMultiplier = Math.floor(slots / 10 * 50);

    var metalDensity = metalFactor + metalSlotsMultiplier;
    var metalClusters = 50 + metalSlotsMultiplier;

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
        name: planetTitle + ' C' + metalClusters + ' D' + metalDensity,
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