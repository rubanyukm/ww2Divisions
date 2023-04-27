
var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("ww2US.json").then(function(data) {
    console.log(data);
    data.forEach(function(d) {
        
    });
    //loop through the data and print all casualties and division names where the label is "Division"
    data.forEach(function(d) {
        if (d.n.labels == "Division") {
            console.log(d.n.properties.casualties);
            console.log(d.n.properties.name);
        }
    });

    //loop through all divisions and print the name of the divsion witht eh highest casualties
    var maxCasualties = 0;
    var maxCasualtiesDivision = "";
    data.forEach(function(d) {
        if (d.n.labels == "Division") {
            if (+d.n.properties.casualties > maxCasualties) {
                maxCasualties = +d.n.properties.casualties;
                maxCasualtiesDivision = d.n.properties.name;
            }
        }
    });
    console.log("Divison that lost the most men: " + maxCasualtiesDivision);
    console.log("Casualties suffered by the " + maxCasualtiesDivision + ": " + maxCasualties);

    var minCasualties = 10000000;
    var minCasualtiesDivision = "";
    data.forEach(function(d) {
        if (d.n.labels == "Division") {
            if (+d.n.properties.casualties > 0 && +d.n.properties.casualties < minCasualties) {
                minCasualties = +d.n.properties.casualties;
                minCasualtiesDivision = d.n.properties.name;
            }
        }
    });
    console.log("Division that lost the least men: " + minCasualtiesDivision);
    console.log("Casualties suffered by the " + minCasualtiesDivision + ": " + minCasualties);

    var totalDivisions = 0;
    var avgCasualties = 0;
    var totalCasualties = 0;

    data.forEach(function(d) {
        if (d.n.labels == "Division") {
            totalDivisions += 1;
            totalCasualties += +d.n.properties.casualties;
        }
    });

    avgCasualties = totalCasualties / totalDivisions;
    console.log("Average casualties per division: " + Math.trunc(avgCasualties));
    console.log ("Total casualties: " + totalCasualties);
    console.log("Total divisions: " + totalDivisions);

    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    x.domain(data.map(function(d) { 
        if(d.labels = "Division") {
        return d.n.properties.name;
        }
    }));

    y.domain([0, d3.max(data, function(d) { 
        if(d.labels = "Division") { 
            return d.n.properties.casualties;
        }
    })]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { 
            if (d.labels = "Division") {
            return x(d.n.properties.name);
            }
         })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { 
            if (d.labels = "Division") {
            return y(d.n.properties.casualties); 
            }
        })
        .attr("height", function(d) { return height - y(d.n.properties.casualties); });

});






/*d3.select("div")
    .selectAll("p")
    .data([1, 2, 3])
    .enter()
    .append("p")
    .text(function(d) { return d; });*/