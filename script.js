(function () {
    "use strict;";
   

    var dim = { width: 960, height: 500 };
    var x = d3.scaleBand().padding(0.1).range([0, dim.width]);
    var y = d3.scaleLinear().range([0, dim.height]);
    var margin={left:20,right:20,top:20,bottom:20};
    var actualsMax = 0;
    var projMax = 0;
     
    d3.csv('actuals.csv?id=' + Math.random(), function (data) {
        x.domain(data.columns);
        actualsMax = parseFloat(d3.max(data.columns, function (col, i) { return data[0][col]; }));
        projMax = parseFloat(d3.max(data.columns, function (col, i) { return data[1][col]; }));
        y.domain([d3.max([actualsMax, projMax])]);
        var chart = d3.select("#chart")
            .attr("width", dim.width + margin.left + margin.right)
            .attr("height", dim.height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var xaxis = d3.axisBottom(x);
        var yaxis = d3.axisLeft(y);
        chart.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + dim.height + ")")
            .call(xaxis);
        chart.append("g").attr("class", "y axis")
            .call(yaxis);
        var actualsLine = d3.line().curve(d3.curveCatmullRom).y(function (col) { return y(data[0][col]); }).x(function (d) { return (x(d) + x.bandwidth() / 2); });
        var projectionsLine = d3.line().curve(d3.curveCatmullRom).y(function (col) { return y(data[1][col]); }).x(function (d) { return (x(d) + x.bandwidth() / 2); });
        chart.append("path").datum(data.columns)
            .attr("d", actualsLine).attr("fill", "none")
            .attr("stroke", "#252984");
        chart.append("path").datum(data.columns)
            .attr("d", projectionsLine).attr("fill", "none")
            .attr("stroke", "#24D2CD");
        var actGroup = chart.selectAll("g.actuals").data(data.columns).enter().append("g").attr("class", "actuals");
        actGroup.append("circle")
            .attr("cx", function (d) { return x(d) + x.bandwidth() / 2; })
            .attr("cy", function (d) { return y(data[0][d]); })
            .attr("r", "3px")
            .attr("fill", "steelblue");
        actGroup.append("text")
            .attr("x", function (d) { return x(d) + x.bandwidth() / 2; })
            .attr("y", function (d) { return y(data[0][d]); })
            .text(function (d) { return data[0][d]; })
            .attr("fill", "orange")
            .attr("dy", "-10px")
            .style("font-size", "12px");
        var projGroup = chart.selectAll("g.projections").data(data.columns).enter().append("g").attr("class", "projections");
        projGroup.append("circle")
            .attr("cx", function (d) { return x(d) + x.bandwidth() / 2; })
            .attr("cy", function (d) { return y(data[1][d]); })
            .attr("r", "3px")
            .attr("fill", "steelblue");
        projGroup.append("text")
            .attr("x", function (d) { return x(d) + x.bandwidth() / 2; })
            .attr("y", function (d) { return y(data[1][d]); })
            .text(function (d) { return data[1][d]; })
            .attr("fill", "orange")
            .attr("dy", "-10px")
            .style("font-size", "12px");
    });
})();
