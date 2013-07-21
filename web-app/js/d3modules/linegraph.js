var lineGlobals = {}
lineGlobals.width = 700;
lineGlobals.height = 500;

function createLineGraph() {
    var chart = d3.select("#container").append("svg")
        .attr("class", "chart")
        .attr("height", lineGlobals.height)
        .attr("width", lineGlobals.width);

    //Border
    var borders = [];
    borders[0] = {
        x1: 0,
        x2: lineGlobals.width,
        y1: lineGlobals.height,
        y2: lineGlobals.height
    };

    borders[1] = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: lineGlobals.height
    };

    chart.selectAll(".chart-border").data(borders).enter()
        .append("line")
        .attr("class", "chart-border").attr("x1", function (d) {
            return d.x1;
        })
        .attr("y1", function (d) {
            return d.y1;
        })
        .attr("x2", function (d) {
            return d.x2;
        })
        .attr("y2", function (d) {
            return d.y2;
        });

    //Init line color constants
    var color = d3.scale.category20();
    lineGlobals.colors = {
        A: color(1),
        B: color(2),
        C: color(3),
        D: color(4),
        E: color(5),
        F: color(6),
        G: color(7),
        H: color(8),
        I: color(9),
        J: color(10)
    }

    return chart;
}

refreshLineGraph = function (chart, modules) {

    var lineData = createLines(modules);

    var lines = chart.selectAll(".line").data(lineData);

    lines.enter()
        .append("line")
        .attr("class", "line")
        .attr("stroke", function (d) {
            console.log("Adding line", d);
            return d.c;
        });

    lines.attr("x1", function (d) {
        return d.x1;
    })
        .attr("y1", function (d) {
            return d.y1;
        })
        .attr("x2", function (d) {
            return d.x2;
        })
        .attr("y2", function (d) {
            return d.y2;
        });

    lines.exit().remove();
}


createLines = function (modules) {

    var levels = getTimeLevels(modules);
    var yScale = d3.scale.linear()
        .domain([0, d3.max(levels)])
        .range([0, lineGlobals.height]);

    var xScale = d3.scale.linear()
        .domain([0, 5])
        .range([0, lineGlobals.width]);


    var lines = [];
    var lineCount = 0;

    for (var m = 0; m < modules.length; m++) {
        if (modules[m].show) {
            for (var t = 1; t < modules[m].timeIncrementMeasurements.length; t++) {
                var line = {};
                line.x1 = xScale(modules[m].timeIncrementMeasurements[t - 1].increment);
                line.y1 = lineGlobals.height - yScale(modules[m].timeIncrementMeasurements[t - 1].level);
                line.x2 = xScale(modules[m].timeIncrementMeasurements[t].increment);
                line.y2 = lineGlobals.height - yScale(modules[m].timeIncrementMeasurements[t].level);
                line.c = lineGlobals.colors[[modules[m].name[modules[m].name.length - 1]]];
                lines[lineCount++] = line;
            }
        }
    }

    console.log(lines);
    return lines;
}