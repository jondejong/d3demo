var createChart = function (dataCount) {
    var chart = d3.select("#container").append("svg")
        .attr("class", "chart")
        .attr("width", 420)
        .attr("height", 26 * dataCount);

    return chart;
}

var getLevels = function (modules) {
    var levels = new Array();
    for (var i = 0; i < modules.length; i++) {
        levels[i] = modules[i].level;
    }
    return levels;
}

var getTimeLevels = function (modules) {
    var levels = new Array();
    for (var i = 0; i < modules.length; i++) {
        for (var j = 0; j < modules[i].timeIncrementMeasurements.length; j++) {
            levels[i] = modules[i].timeIncrementMeasurements[j].level;
        }
    }
    return levels;
}