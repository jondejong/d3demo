createTBarChart = function (chart, modules) {
    var levels =  getTLevels(modules)
    var x =  getTX(levels);
    chart.selectAll("rect")
        .data(levels)
        .enter().append("rect")
        .attr("y", function (d, i) {
            return i * 26;
        })
        .attr("width", x)
        .attr("height", 20);
}

refreshTBarChart = function(chart, modules){
    var levels =  getTLevels(modules)
    var x =  getTX(levels);
    var rects = chart.selectAll("rect").data(levels);
    rects.attr("width", x);
}

var getTLevels = function(modules) {
    var levels =  new Array();
    for(var i=0; i<modules.length; i++) {
        levels[i] = modules[i].level;
    }
    return levels;
}

var getTX = function (levels) {
    return d3.scale.linear()
        .domain([0, d3.max(levels)])
        .range([0, 420]);
}