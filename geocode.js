#!/usr/bin/env node
require('colors');
var geocoder = require('geocoder');
var optimist = require('optimist');
var argv = optimist
    .usage([
        'geocode address',
        'geocode --reverse latitude longitude'
].join('\n'))
    .alias('h', 'help')
    .describe('h', 'show this help')
    .alias('r', 'reverse')
    .describe('r', 'reverse geocoding')
    .argv;

var addr = argv._[0];
if (argv.help) {
    optimist.showHelp();
    process.exit();
}

geocoder.geocode(addr, function(err, data) {
    if(err) {
        console.log((''+err).red);
    } else {
        console.log(formatResults(data));
    }
});

function formatJSON(data) {
    return JSON.stringify(data, false, 2);
}

function formatSimple(data) {
    return data.map(function(res) {
        return ('#' + res.address + ':').yellow + '\n' + res.location.lat + ',' + res.location.lng;
    }).join('\n\n');
}

function formatResults(data) {
    var res = data.results.map(function(item) {
        return {
            address: item.formatted_address,
            location: item.geometry.location
        };
    });
    return formatSimple(res);
    // return formatJSON(res);
}