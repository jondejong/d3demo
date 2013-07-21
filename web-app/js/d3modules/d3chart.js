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


var copyModuleData = function(s, d) {
    var i=0;
    for(;i< s.length;i++) {
        if(!d[i]) {d[i] = {};}
        d[i].name = s[i].name;
        d[i].level = s[i].level;
        d[i].id = s[i].id;
    }
    if(d.length > i){
        d.splice(i, d.length-i);
    }
}