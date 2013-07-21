var lineGlobals = {}
lineGlobals.width = 700;
lineGlobals.height = 500;
lineGlobals.borderPadding = 15;

function createLineGraph() {
    // Scalar functions
    lineGlobals.xScale = d3.scale.linear()
        .domain([0, 5])
        .range([0, lineGlobals.width - lineGlobals.borderPadding]);

    var chart = d3.select("#container").append("svg")
        .attr("class", "chart")
        .attr("height", lineGlobals.height)
        .attr("width", lineGlobals.width);

    //Border
    var borders = [];
    borders[0] = {
        x1: 0,
        y1: lineGlobals.height - lineGlobals.borderPadding,
        x2: lineGlobals.width,
        y2: lineGlobals.height - lineGlobals.borderPadding
    };

    borders[1] = {
        x1: 0,
        y1: 0,
        x2: 0,
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

    var times = [0,1,2,3,4,5];

    // X Axis Labels
    chart.selectAll(".x-axis-label").data(times)
        .enter().append("text")
        .attr("y", lineGlobals.height)
        .attr("x", function(d) {
            return lineGlobals.xScale(d);
        })
        .text(function(d){return d;})

    return chart;
}

refreshLineGraph = function (chart, modules) {

    var lineData = createLines(modules);

    var lines = chart.selectAll(".line").data(lineData);

    lines.enter()
        .append("line")
        .attr("class", "line")
        .attr("stroke", function (d) {
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
        })
        .attr("stroke", function (d) {
            return d.c;
        });;

    lines.exit().remove();
}


createLines = function (modules) {
    var levels = getTimeLevels(modules);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(levels)])
        .range([0, lineGlobals.height - lineGlobals.borderPadding]);


    var lines = [];
    var lineCount = 0;

    console.log("colors", lineGlobals.colors);

    for (var m = 0; m < modules.length; m++) {
        if (modules[m].display) {
            console.log("module: ", modules[m]);
            var letter = modules[m].name[modules[m].name.length - 1];
            console.log("Letter" , letter);
            var color = lineGlobals.colors[letter];
            console.log('color', color);
            for (var t = 1; t < modules[m].timeIncrementMeasurements.length; t++) {
                var line = {};
                line.x1 = lineGlobals.xScale(modules[m].timeIncrementMeasurements[t - 1].increment);
                line.y1 = lineGlobals.height - yScale(modules[m].timeIncrementMeasurements[t - 1].level);
                line.x2 = lineGlobals.xScale(modules[m].timeIncrementMeasurements[t].increment);
                line.y2 = lineGlobals.height - yScale(modules[m].timeIncrementMeasurements[t].level);
                line.c = color;
                lines[lineCount++] = line;
            }
        }
    }
    return lines;
}

getTimeLevels = function (modules) {
    var levels = new Array();
    var levelCount = 0;
    for (var i = 0; i < modules.length; i++) {
        if (modules[i].display) {
            for (var j = 0; j < modules[i].timeIncrementMeasurements.length; j++) {
                levels[levelCount++] = modules[i].timeIncrementMeasurements[j].level;
            }
        }
    }
    return levels;
}