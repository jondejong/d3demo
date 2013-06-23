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

    // Basic Transition
    rects.transition().attr("width", x);

    // Transition with 1 second delay
//    rects.transition().delay(1000).attr("width", x);


    // Modify druation
//    rects.transition().duration(2000).attr("width", x);

    // Use a function to modify the duration
//    rects.transition().duration(extendTransition).attr("width", x);

    // User a function to stagger the delay
//    rects.transition().delay(staggeredDelay).attr("width", x);


    // Chain duration and delay functions
//    rects.transition().duration(extendTransition).delay(staggeredDelay).attr("width", x);

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

var extendTransition = function(d,i) {
    return 100 * d;
}

var staggeredDelay =  function(d,i) {
    return i * 500;
}

