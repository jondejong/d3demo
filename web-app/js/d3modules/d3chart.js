var createChart = function(dataCount) {
    var chart = d3.select("#container").append("svg")
        .attr("class", "chart")
        .attr("width", 420)
        .attr("height", 26 * dataCount);

    return chart;
}