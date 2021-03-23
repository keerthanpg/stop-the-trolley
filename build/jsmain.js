const nameShortner = {
    "Waymo LLC": "Waymo",
    "CRUISE LLC": "Cruise",
    "PONY.AI, INC.": "Pony.ai",
    "Baidu USA LLC": "Baidu",
    "Nuro": "Nuro",
    "Zoox, Inc": "Zoox",
    "Lyft": "Lyft",
    "AutoX Technologies, Inc.": "AutoX",
    "Mercedes-Benz Research & Development North America, Inc.": "Mercedes Benz R&D",
    "Aurora Innovation, Inc.": "Aurora",
    "Apple Inc.": "Apple",
    "NVIDIA": "Nvidia",
    "AImotive Inc.": "AImotive",
    "WeRide Corp": "WeRide",
    "Drive.ai Inc": "Drive.ai",
    "SF Motors, Inc.": "SF Motors",
    "Nullmax": "Nullmax",
    "Nissan North America, Inc": "Nissan",
    "SAIC Innovation Center": "SAIC",
    "Qualcomm Technologies, Inc.": "Qualcomm",
    "PlusAI, Inc.": "PlusAI",
    "Toyota Research Institute": "Toyota Research",
    "Phantom AI, Inc. ": "Phantom AI",
    "ThorDrive, Inc.": "ThorDrive",
    "Udelv, Inc": "Udelv",
    "DiDi Research America, LLC": "DiDi Research",
    "Gatik AI Inc.": "Gatik AI",
    "Valeo North America Inc.": "Valeo",
    "Telenav, Inc.": "Telenav",
    "BMW of North America": "BMW",
    "Tesla, Inc.": "Tesla",
    "Intel Corporation": "Intel",
    "RIDECELL INC": "Ridecell",
    "Ambarella Corp.": "Ambarella",
    "Box Bot Inc.": "Box Bot",
    "Apex.Ai, Inc.": "Apex.ai",
    "Argo AI, LLC": "Argo AI",
    "EasyMile": "EasyMile",
    "Atlas Robotics, Inc.": "Atlas Robotics",
    "Deeproute.ai, Ltd.": "Deeproute AI",
    "QCraft Inc.": "QCraft"

}

const colorMap = {
    "Waymo LLC": "#27ae60",
    "CRUISE LLC": "#c0392b",
    "PONY.AI, INC.": "#f39c12",
    "Baidu USA LLC": "#2980b9",
    "Nuro": "#7f8c8d",
    "Zoox, Inc": "#000000",
    "Lyft": "#f700b9",
    "AutoX Technologies, Inc.": "#00ccf1",
    "Mercedes-Benz Research & Development North America, Inc.": "#737373",
    "Aurora Innovation, Inc.": "#71819c",
    "Apple Inc.": "#f73b4f",
    "NVIDIA": "#76b900",
    "AImotive Inc.": "#00b550",
    "WeRide Corp": "#89a440",
    "Drive.ai Inc": "#e65f35",
    "SF Motors, Inc.": "#86311f",
    "Nullmax": "#305d33",
    "Nissan North America, Inc": "#f07f75",
    "SAIC Innovation Center": "#6b4a40",
    "Qualcomm Technologies, Inc.": "#f7c427",
    "PlusAI, Inc.": "#f6c77d",
    "Toyota Research Institute": "#5d3e7b",
    "Phantom AI, Inc. ": "#b79f00",
    "ThorDrive, Inc.": "#b00068",
    "Udelv, Inc": "#790869",
    "DiDi Research America, LLC": "#f48c50",
    "Gatik AI Inc.": "#39384e",
    "Valeo North America Inc.": "#ba65a3",
    "Telenav, Inc.": "#f6f3c7",
    "BMW of North America": "#040000",
    "Tesla, Inc.": "#c60001",
    "Intel Corporation": "#006dbf",
    "RIDECELL INC": "#bb2727",
    "Ambarella Corp.": "#484848",
    "Box Bot Inc.": "#ed81b9",
    "Apex.Ai, Inc.": "#164843"
}

function months(i) {
    let m = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
    return m[i];
}

function applySelectionStyles(cid) {

    // console.log(cid,'style');

    $('.line-fleet_month').addClass("grey-lines");
    $('.line-disengagements_month').addClass("grey-lines");
    $('.line-miles_month').addClass("grey-lines");
    $('.circle-fleet_month').addClass("grey-circles");
    $('.circle-disengagements_month').addClass("grey-circles");
    $('.circle-miles_month').addClass("grey-circles");
    $('.fleet-circles').addClass("grey-circles");
    $('.mile-bar').addClass("grey-circles");
    $('.circle-sec3-1').addClass("grey-circles");
    $('.circle-sec3-2').addClass("grey-circles");


    $('#line-fleet_month-' + cid).removeClass('grey-lines')
    $('#line-disengagements_month-' + cid).removeClass('grey-lines')
    $('#line-miles_month-' + cid).removeClass('grey-lines')

    $('.circle-fleet_month-' + cid).removeClass('grey-circles')
    $('.circle-disengagements_month-' + cid).removeClass('grey-circles')
    $('.circle-miles_month-' + cid).removeClass('grey-circles')
    $('.company-' + cid).removeClass("grey-circles");
    $('#mile-bar-' + cid).removeClass("grey-circles");
    $('#mdf-circles-' + cid).removeClass("grey-circles");
    $('#mpd-circles-' + cid).removeClass("grey-circles");
}

function removeSelectonStyles() {

    $('.line-fleet_month').removeClass("grey-lines");
    $('.line-disengagements_month').removeClass("grey-lines");
    $('.line-miles_month').removeClass("grey-lines");
    $('.circle-fleet_month').removeClass("grey-circles");
    $('.circle-disengagements_month').removeClass("grey-circles");
    $('.circle-miles_month').removeClass("grey-circles");
    $('.fleet-circles').removeClass("grey-circles");
    $('.mile-bar').removeClass("grey-circles");
    $('.circle-sec3-1').removeClass("grey-circles");
    $('.circle-sec3-2').removeClass("grey-circles");

}

// function fleetChart(id,data){
//     svg = d3.select(id);

// }

function mileBarChart(id, svgID, data) {
    const w = +d3.select(id).style('width').slice(0, -2);
    const h = +d3.select(id).style('height').slice(0, -2);

    const paddingX = 20;
    const paddingY = 20;


    let svg = d3.select(id).append('svg').attr('height', h).attr('width', w).attr('id', svgID);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, (d) => {
            return d.miles;
        }))
        .range([7 * paddingX, w - paddingX]);

    const yScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([paddingY, h - paddingY]);


    var div = d3.select("#tooltip");

    svg.append("text")
        .attr("id", "text-title-plot-miles")
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('font-size', 30)
        .attr('x', w - 10)
        .attr('y', 120)
        .attr('text-anchor', 'end')
        .text('Total Miles')

    svg.append("text")
        .attr("id", "text-title-plot-miles")
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('font-size', 30)
        .attr('x', w - 10)
        .attr('y', 170)
        .attr('text-anchor', 'end')
        .text('&')

    svg.append("text")
        .attr("id", "text-title-plot-miles")
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('font-size', 30)
        .attr('x', w - 10)
        .attr('y', 220)
        .attr('text-anchor', 'end')
        .text('Total Fleet Size')




    svg.append('g').selectAll('.mile-bar').data(data).enter()
        .append('rect').attr('class', 'mile-bar')
        .attr('id', (d) => ('mile-bar-' + d.company_id))
        .attr('x', xScale(0))
        .attr('ry', 5)
        .attr('rx', 5)
        .attr('y', function (d, i) {
            return yScale(i);
        })
        .attr('width', (d) => {
            return xScale(d.miles) - xScale(0);
        })
        .attr('height', 10)
        .attr('fill', (d) => colorMap[d.company_name])
        .on("mouseover", function (d, i) {
            div.transition()
                .duration(200)
                .style("display", 'block');
            div.html(() => {

                return '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' +
                    nameShortner[d.company_name] + '</span><br>' + (d.miles / 1000).toFixed(2) + 'k Miles';
            })
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 80) + "px");


            let cid = d.company_id;
            applySelectionStyles(cid);

            // console.log(modifier);


        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                // .style("opacity", 0)
                .style("display", 'none');
            removeSelectonStyles();

        })

    svg.append('g').selectAll('.mile-bar-text').data(data).enter()
        .append('text').attr('class', 'mile-bar-text')
        .attr('x', xScale(0) - 5)
        .attr('y', function (d, i) {
            return yScale(i) + 10;
        })
        .attr('text-anchor', 'end')
        .text((d) => {
            return nameShortner[d.company_name];
        })


    let perc = data.map((d, i) => ([d.fleet, d.company_name, i]));

    let totalAV = perc.reduce((a, b) => a + b[0], 0);

    perc = perc.map(d => [Math.round(d[0] * 100 / totalAV, 1), d[1], d[2], d[0]])
    // console.log(totalAV, perc)
    totalAV = perc.reduce((a, b) => a + b[0], 0);


    let fleet = []

    perc.map(d => {
        for (var k = 0; k < d[0]; k++)fleet.push([d[1], d[2], d[0], d[3]])
    })

    let carScale, carSpace;

    if (w > 600) {
        carScale = 20;
        carSpace = 42;
        wCircles = 10;
    }
    else {
        carScale = 11;
        carSpace = 22;
        wCircles = 5;
    }




    svg.append('g').attr('transform', 'translate(' + (xScale.range()[1] - carSpace * wCircles) + ',' + (yScale.range()[1] - carSpace * (100 / wCircles)) + ')')
        .selectAll('.fleet').data(fleet).enter()
        .append('circle')
        .attr('r', carScale)
        .attr('style', function (d, i) {
            return 'transform:translate(' + carSpace * (i % wCircles) + 'px,' + carSpace * parseInt(i / wCircles) + 'px)';
        })
        .attr('class', (d, i) => ('fleet-circles company-' + d[1]))
        .attr('fill', (d) => colorMap[d[0]])
        .on("mouseover", function (d, i) {
            div.transition()
                .duration(200)
                .style("display", 'block');
            div.html(() => {

                return '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' +
                    nameShortner[d[0]] + '</span><br>' + d[3] + ' Registered Cars' + '<br>' + d[2] + '% of all AV Fleet';
            })
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 90) + "px");


            let cid = d[1];
            applySelectionStyles(cid);

            // console.log(modifier);


        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                // .style("opacity", 0)
                .style("display", 'none');
            removeSelectonStyles();

        })



    svg.append('g').attr('transform', 'translate(' + (xScale.range()[1] - carSpace * wCircles) + ',' + (yScale.range()[1] - carSpace * (100 / wCircles)) + ')')
        .selectAll('.fleet').data(fleet).enter()
        .append('image')
        .attr('xlink:href', './res/av2.svg')
        .attr('width', carScale)
        .attr('height', carScale)
        .attr('style', function (d, i) {
            return 'transform:translate(' + (carSpace * (i % wCircles) - wCircles) + 'px,' + (carSpace * parseInt(i / wCircles) - wCircles) + 'px)';
        })
        .attr('class', (d, i) => ('cars-fleet company-' + d[1]))

}

function initLinePlot(id, idSVG) {
    const w = +d3.select(id).style('width').slice(0, -2);
    const h = +d3.select(id).style('height').slice(0, -2);


    let svg = d3.select(id).append('svg').attr('height', h).attr('width', w).attr('id', idSVG);

}


function drawLinePlot(idSVG, filtered, data, modifier, scale, units) {


    // console.log('dlp',data)
    const w = +d3.select(idSVG).style('width').slice(0, -2);
    const h = +d3.select(idSVG).style('height').slice(0, -2);

    const paddingX = 50;
    const paddingY = 20;


    let svg = d3.select(idSVG)

    let tempValues = [];
    let tempCompanies = [];

    filtered.map(d => {
        tempValues = tempValues.concat(d[modifier]);
        tempCompanies.push(d.company_name);
    })

    const xScale = d3.scalePoint()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        .range([paddingX, w - paddingX])
        .padding(0.6)
        .round(true)

    const yScale = d3.scaleLinear()
        .domain(d3.extent(tempValues))
        .range([h - paddingY, paddingY]);


    var line = d3.line()
        .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function (d) {
            return yScale(d);
        })
        .curve(d3.curveMonotoneX)

    d3.selectAll('#x-axis-' + modifier).remove();
    d3.selectAll('#y-axis-' + modifier).remove();

    svg.append("g")
        .attr("class", "x axis")
        .attr("id", "x-axis-" + modifier)
        .attr("transform", "translate(0," + (h - paddingY) + ")")
        .call(d3.axisBottom(xScale)
            .tickFormat((i) => {
                return months(i)
            })
            .tickSize(2 * paddingY - h)
            .ticks(11)
        ); // Create an axis component with d3.axisBottom

    svg.append("g")
        .attr("class", "y axis")
        .attr("id", "y-axis-" + modifier)
        .attr("transform", "translate(" + paddingX + ",0)")
        .call(d3.axisLeft(yScale).tickSize(-w + 2 * paddingX)
            .tickFormat(function (d) {
                if (scale === 1000) return d / 1000 + "k";
                else return d;

            })
            .ticks(8)
        ); // Create an axis component with d3.axisLeft


    d3.selectAll(".line-" + modifier).remove();
    d3.selectAll(".circle-" + modifier).remove();
    d3.selectAll(".text-legend-" + modifier).remove();
    d3.selectAll("#text-title-plot-" + modifier).remove();


    svg.append("text")
        .attr("id", "text-title-plot-" + modifier)
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('x', -h / 2)
        .attr('y', w / 32)
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(270)')
        .text(units)



    var div = d3.select("#tooltip");

    let companyID = 0;
    data.map(company => {

        // let col = colors[r]
        // console.log(company);


        if (tempCompanies.includes(company.company_name)) {

            // console.log('company',company);
            // svg.append("text")
            // .attr("class", "text-legend-miles-months") // Assign a class for styling 
            // .attr("id", "text-" + country.replace(' ,-')) // Assign a class for styling 
            // .attr('fill', col)
            // .attr('x', xScale.range()[0] + paddingX2)
            // .attr('y', (countryID * 30) + 2*paddingY)
            // .attr('text-anchor', 'middle')
            // .text(country)

            svg.append("path")
                .datum(company[modifier]) // 10. Binds data to the line 
                .attr("class", "line line-" + modifier) // Assign a class for styling 
                .attr("id", "line-" + modifier + "-" + companyID) // Assign a class for styling 
                .attr("d", line)
                .attr('fill', 'none')
                .attr('stroke', (d) => colorMap[company.company_name])
                .attr('stroke-width', 2)

            svg.append("g").selectAll(".circle-" + modifier + "-" + companyID)
                .data(company[modifier])
                .join(
                    enter => enter.append('circle')
                        .attr("class", "circles circle-" + modifier + "-" + companyID + " circle-" + modifier)
                        .attr("cx", (d, i) => xScale(i))
                        .attr('cy', (d) => {
                            return yScale(d);
                        })
                        .attr('r', 3.5)
                        .attr('fill', (d) => colorMap[company.company_name])
                        .on("mouseover", function (d, i) {
                            div.transition()
                                .duration(200)
                                .style("display", 'block');
                            div.html(() => {
                                let c = +d3.select(this).attr('class').replace('circles ', '').replace('circle-' + modifier + '-', '').replace('circle-' + modifier, '');
                                // console.log(c);
                                let val = '';
                                if (scale === 1000) val = (d / 1000).toFixed(2) + 'k ' + units;
                                else val = d + ' ' + units;
                                return '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' +
                                    nameShortner[data[c].company_name] + '</span><br>' + months(i) + "<br>" + val;
                            })
                                .style("left", (d3.event.pageX - 100) + "px")
                                .style("top", (d3.event.pageY - 90) + "px");


                            let cid = $(this).attr('class').replace('circles circle-' + modifier + '-', '').replace(' circle-' + modifier, '');
                            applySelectionStyles(cid);

                            // console.log(modifier);


                        })
                        .on("mouseout", function (d) {
                            div.transition()
                                .duration(500)
                                // .style("opacity", 0)
                                .style("display", 'none');
                            removeSelectonStyles();

                        })

                )




        }
        companyID += 1;


    })
}


function initMilesDisFleet(id, idSVG) {
    const w = +d3.select(id).style('width').slice(0, -2);
    const h = +d3.select(id).style('height').slice(0, -2);


    let svg = d3.select(id).append('svg').attr('height', h).attr('width', w).attr('id', idSVG);

}


function drawMilesDisFleet(idSVG, data) {


    // console.log('dlp',data)
    const w = +d3.select(idSVG).style('width').slice(0, -2);
    const h = +d3.select(idSVG).style('height').slice(0, -2);

    const paddingX = 100;
    const paddingY = 40;


    let svg = d3.select(idSVG)





    const xScale = d3.scaleLog()
        .domain([1, d3.max(data, (d) => +d.miles) * 2])
        .range([paddingX, w - paddingX])
    // .ticks(10)

    // let xFormat10 = xScale.tickFormat(100000)

    // xScale.ticks(10).map(xFormat10)

    const yScale = d3.scaleLog()
        .domain([1, d3.max(data, (d) => +d.disengagements)])
        .range([h - paddingY, paddingY]);


    // var line = d3.line()
    //     .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
    //     .y(function (d) {
    //         return yScale(d);
    //     })
    //     .curve(d3.curveMonotoneX)

    d3.selectAll('#x-axis-sec3-1').remove();
    d3.selectAll('#y-axis-sec3-1').remove();
    d3.selectAll('#text-title-plot-milesdisfleet-y').remove();
    d3.selectAll('#text-title-plot-milesdisfleet-x').remove();
    d3.selectAll('#text-title-plot-milesdisfleet-fleet').remove();
    d3.selectAll('.legend-fleet-circle').remove();
    d3.selectAll('.legend-fleet-text').remove();

    svg.append("g")
        .attr("class", "x axis-sec3")
        .attr("id", "x-axis-sec3-1")
        .attr("transform", "translate(0," + (h - paddingY) + ")")
        .call(d3.axisBottom(xScale)
            .tickFormat((d) => {
                return d / 1000 + 'k'
            })
            .tickSize(2 * paddingY - h)
            .ticks(6)
        ); // Create an axis component with d3.axisBottom


    // console.log("xaxis");


    svg.append("g")
        .attr("class", "y axis-sec3")
        .attr("id", "y-axis-sec3-1")
        .attr("transform", "translate(" + paddingX + ",0)")
        .call(d3.axisLeft(yScale).tickSize(-w + 2 * paddingX)
            .tickFormat(function (d) {
                return d;
            })
            .ticks(3)
        ); // Create an axis component with d3.axisLeft


    d3.selectAll(".circle-sec3-1").remove();
    // d3.selectAll(".text-legend-"+modifier).remove();
    // d3.selectAll("#text-title-plot-"+modifier).remove();


    svg.append("text")
        .attr("id", "text-title-plot-milesdisfleet-y")
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('x', -h / 2)
        .attr('y', 50)
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(270)')
        .text("Disengagements (Log Scale)")

    svg.append("text")
        .attr("id", "text-title-plot-milesdisfleet-x")
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('x', w / 2)
        .attr('y', h - 10)
        .attr('text-anchor', 'middle')
        .text("Miles (Log Scale)")

    svg.append("text")
        .attr("id", "text-title-plot-milesdisfleet-fleet")
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('x', w - 50)
        .attr('y', 50)
        .attr('text-anchor', 'middle')
        .text("Fleet Size")

    svg.selectAll('.legend-fleet-text').data([25, 50, 100, 200]).enter().append("text")
        .attr("class", "text-title legend-fleet-text")
        .attr('fill', '#000')
        .attr('x', w - 30)
        .attr('y', (d, i) => (h / 2 + i * 80 - 110))
        .attr('text-anchor', 'middle')
        .text((d) => (d))



    svg.selectAll('.legend-fleet-circle').data([25, 50, 100, 200]).enter().append("circle")
        .attr("class", "legend-fleet-circle")
        .attr('stroke', '#000')
        .attr('fill', 'none')
        .attr('cx', w - 70)
        .attr('cy', (d, i) => (h / 2 + i * 80 - 120))
        .attr('r', (d) => (Math.sqrt(d) * 2))






    var div = d3.select("#tooltip");


    svg.append("g").selectAll(".circle-sec3-1")
        .data(data).enter()
        .append('circle')
        .attr("class", "circles circle-sec3-1")
        .attr('id', (d) => ('mdf-circles-' + d.company_id))
        .attr("cx", (d, i) => xScale(d.miles + 1))
        .attr('cy', (d) => yScale(d.disengagements + 1))
        .attr('r', d => Math.sqrt(d.fleet) * 2)
        .attr('fill', (d) => colorMap[d.company_name])
        .attr('opacity', 0.6)
        .on("mouseover", function (d, i) {
            div.transition()
                .duration(200)
                .style("display", 'block');
            div.html(() => {
                let c = +d3.select(this).attr('id').replace('mdf-circles-', '');
                applySelectionStyles(c);
                return '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' +
                    nameShortner[data[c].company_name] + '</span><br>Miles : ' + (data[c].miles / 1000).toFixed(2) + "k<br>Disengagements : " + data[c].disengagements + "<br>Fleet Size : " + data[c].fleet;
            })
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 80) + "px");


        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                // .style("opacity", 0)
                .style("display", 'none');
            removeSelectonStyles()
        })




}



function initComparison_2019_2020(id, idSVG) {
    const w = +d3.select(id).style('width').slice(0, -2);
    const h = +d3.select(id).style('height').slice(0, -2);


    let svg = d3.select(id).append('svg').attr('height', h).attr('width', w).attr('id', idSVG);

}


function drawComparison_2019_2020(idSVG, data, data_2019) {

    // console.log('dlp',data)
    const w = +d3.select(idSVG).style('width').slice(0, -2);
    const h = +d3.select(idSVG).style('height').slice(0, -2);

    let paddingXLeft = 100;
    let paddingXRight = 100;
    let paddingYTop = 40;
    let paddingYBottom = 150;
    let barWidth = 30
    if (w < 600) {
        paddingXRight = 50;
        barWidth = 10
    }


    let svg = d3.select(idSVG)


    // Get the diffs of the two datasets!
    let names = Object.keys(nameShortner);
    let milesDiff = {};
    let finDiff = []

    for (var i = 0; i < names.length; i++) {
        milesDiff[names[i]] = { 'Y19_miles': 0, 'Y20_miles': 0, 'Y19_fleet': 0, 'Y20_fleet': 0, 'Y19_dis': 0, 'Y20_dis': 0 }
    }

    data.map(d => {
        milesDiff[d.company_name].Y20_miles = +d.miles;
        milesDiff[d.company_name].Y20_fleet = +d.fleet;
        milesDiff[d.company_name].Y20_dis = +d.disengagements;
    });

    data_2019.map(d => {
        milesDiff[d.company_name].Y19_miles = +d.miles;
        milesDiff[d.company_name].Y19_fleet = +d.fleet;
        milesDiff[d.company_name].Y19_dis = +d.disengagements;
    });

    for (var i = 0; i < names.length; i++) {
        if ((milesDiff[names[i]].Y20_miles > 0) && (milesDiff[names[i]].Y19_miles > 0) && (milesDiff[names[i]].Y20_fleet > 0) &&
            (milesDiff[names[i]].Y19_fleet > 0) && (milesDiff[names[i]].Y20_dis > 0) && (milesDiff[names[i]].Y19_dis > 0)) {
            finDiff.push([nameShortner[names[i]], milesDiff[names[i]].Y20_miles - milesDiff[names[i]].Y19_miles,
            (milesDiff[names[i]].Y20_miles - milesDiff[names[i]].Y19_miles) * 100 / milesDiff[names[i]].Y19_miles,
            milesDiff[names[i]].Y20_dis - milesDiff[names[i]].Y19_dis,
            (milesDiff[names[i]].Y20_dis - milesDiff[names[i]].Y19_dis) * 100 / milesDiff[names[i]].Y19_dis,
            milesDiff[names[i]].Y20_fleet - milesDiff[names[i]].Y19_fleet,
            (milesDiff[names[i]].Y20_fleet - milesDiff[names[i]].Y19_fleet) * 100 / milesDiff[names[i]].Y19_fleet])

        }
    }
    // let aa = finDiff.slice().sort((b, a) => (a[1] - b[1]));
    // console.log(aa)
    // let bb = finDiff.slice().sort((b, a) => (a[2] - b[2]));
    // console.log(bb)

    console.log(finDiff.slice().sort((b, a) => (a[1] - b[1])).map(d => d[0]))
    console.log(finDiff.slice().sort((b, a) => (a[2] - b[2])).map(d => d[0]))

    const xScaleMiles = d3.scalePoint()
        .domain(finDiff.slice().sort((b, a) => (a[1] - b[1])).map(d => d[0]))
        .range([paddingXLeft, w - paddingXRight])

    const xScaleDis = d3.scalePoint()
        .domain(finDiff.slice().sort((b, a) => (a[3] - b[3])).map(d => d[0]))
        .range([paddingXLeft, w - paddingXRight])

    const xScaleFleet = d3.scalePoint()
        .domain(finDiff.slice().sort((b, a) => (a[5] - b[5])).map(d => d[0]))
        .range([paddingXLeft, w - paddingXRight])

    const xScaleMilesPerc = d3.scalePoint()
        .domain(finDiff.slice().sort((b, a) => (a[2] - b[2])).map(d => d[0]))
        .range([paddingXLeft, w - paddingXRight])

    const xScaleDisPerc = d3.scalePoint()
        .domain(finDiff.slice().sort((b, a) => (a[4] - b[4])).map(d => d[0]))
        .range([paddingXLeft, w - paddingXRight])

    const xScaleFleetPerc = d3.scalePoint()
        .domain(finDiff.slice().sort((b, a) => (a[6] - b[6])).map(d => d[0]))
        .range([paddingXLeft, w - paddingXRight])
    // // let xFormat10 = xScale.tickFormat(100000)

    // // xScale.ticks(10).map(xFormat10)

    const yScaleMiles = d3.scaleLinear()
        .domain(d3.extent(finDiff, (d) => +d[1]))
        .range([h - paddingYBottom, paddingYTop]);

    const yScaleDis = d3.scaleLinear()
        .domain(d3.extent(finDiff, (d) => +d[3]))
        .range([h - paddingYBottom, paddingYTop]);

    const yScaleFleet = d3.scaleLinear()
        .domain(d3.extent(finDiff, (d) => +d[5]))
        .range([h - paddingYBottom, paddingYTop]);

    const yScaleMilesPerc = d3.scaleLinear()
        .domain(d3.extent(finDiff, (d) => +d[2]))
        .range([h - paddingYBottom, paddingYTop]);

    const yScaleDisPerc = d3.scaleLinear()
        .domain(d3.extent(finDiff, (d) => +d[4]))
        .range([h - paddingYBottom, paddingYTop]);

    const yScaleFleetPerc = d3.scaleLinear()
        .domain(d3.extent(finDiff, (d) => +d[6]))
        .range([h - paddingYBottom, paddingYTop]);

    let globalScale = "perc";
    let globalCat = "miles";

    d3.selectAll('#x-axis-comp').remove();
    d3.selectAll('#y-axis-comp').remove();
    d3.selectAll('#text-title-plot-comp-y').remove();
    d3.selectAll('#text-title-plot-comp-x').remove();

    let xAxisGrp = svg.append("g")
        .attr("class", "x axis-sec3 axis-comp")
        .attr("id", "x-axis-comp")
        .attr("transform", "translate(" + barWidth / 2 + "," + (h - paddingYBottom) + ")")
        .call(d3.axisBottom(xScaleMilesPerc))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");
    // Create an axis component with d3.axisBottom


    let yAxisGrp = svg.append("g")
        .attr("class", "y axis-sec3")
        .attr("id", "y-axis-comp")
        .attr("transform", "translate(" + paddingXLeft + ",0)")
        .call(d3.axisLeft(yScaleMilesPerc).tickSize(-w + paddingXLeft + paddingXRight)
            .tickFormat(function (d) {
                return d + '%';
            })
            .ticks(3)
        ); // Create an axis component with d3.axisLeft


    let yAxisLabel = svg.append("text")
        .attr("id", "text-title-plot-comp-y")
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('x', -h / 2)
        .attr('y', 50)
        .attr('text-anchor', 'middle')
        .attr('font-size', '20px')
        .attr('transform', 'rotate(270)')
        .text("Difference in Miles")

    svg.append("text")
        .attr("id", "text-title-plot-comp-x")
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('x', w / 2)
        .attr('y', h - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '20px')
        .text("Companies")


    var div = d3.select("#tooltip");


    svg.append("g").selectAll(".rect-comp")
        .data(finDiff.slice().sort((b, a) => (a[2] - b[2]))).enter()
        .append('rect')
        .attr("class", "rect rect-comp")
        .attr("x", (d, i) => {
            return xScaleMilesPerc(d[0])
        }
        )
        .attr('y', (d) => yScaleMilesPerc(Math.max(0, d[2])))
        .attr('width', d => barWidth)
        .attr('height', d => Math.abs(yScaleMilesPerc(d[2]) - yScaleMilesPerc(0)))
        .attr('fill', (d) => {
            let minmax = d3.extent(finDiff, k => k[2]);
            if (d[1] > 0) return d3.interpolateGreens(d[2] / minmax[1]);
            else return d3.interpolateReds(d[2] / minmax[0]);
        })
        .attr('stroke', '#aaa')
        .on("mouseover", function (d, i) {
            div.transition()
                .duration(200)
                .style("display", 'block');
            div.html(() => {
                change = parseFloat(d[2]).toFixed(2)
                if (change < 0) return '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' +
                    d[0] + '</span><br> Difference in Miles : ' + (d[1] / 1000).toFixed(2) + "k (" + Math.abs(change) + "% ⬇️ since 2019)";
                else return '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' +
                    d[0] + '</span><br> Difference in Miles : ' + (d[1] / 1000).toFixed(2) + "k (" + Math.abs(change) + "% ⬆️ since 2019)";
            })
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 80) + "px");


        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                // .style("opacity", 0)
                .style("display", 'none');
        })

    function rectTransition(kk, absk, perk, kterm, xs, ys) {
        // console.log('WTF');
        d3.selectAll(".rect-comp").remove();
        svg.append("g").selectAll(".rect-comp")
            .data(finDiff.slice().sort((b, a) => (a[kk] - b[kk]))).enter()
            .append('rect')
            .attr("class", "rect rect-comp")
            .attr("x", (d, i) => {
                return xs(d[0])
            }
            )
            .attr('y', (d) => ys(Math.max(0, d[kk])))
            .attr('width', d => barWidth)
            .attr('height', d => Math.abs(ys(d[kk]) - ys(0)))
            .attr('fill', (d) => {
                let minmax = d3.extent(finDiff, k => k[kk]);
                if (d[kk] > 0) return d3.interpolateGreens(d[kk] / minmax[1]);
                else return d3.interpolateReds(d[kk] / minmax[0]);
            })
            .attr('stroke', '#aaa')
            .on("mouseover", function (d, i) {
                div.transition()
                    .duration(200)
                    .style("display", 'block');
                div.html(() => {
                    change = parseFloat(d[perk]).toFixed(2)
                    if (change < 0) return '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' +
                        d[0] + '</span><br> Difference in ' + kterm + ' : ' + (d[absk] / 1000).toFixed(2) + "k (" + Math.abs(change) + "% ⬇️ since 2019)";
                    else return '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' +
                        d[0] + '</span><br> Difference in ' + kterm + ' : ' + (d[absk] / 1000).toFixed(2) + "k (" + Math.abs(change) + "% ⬆️ since 2019)";
                })
                    .style("left", (d3.event.pageX - 100) + "px")
                    .style("top", (d3.event.pageY - 80) + "px");


            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("display", 'none');
            })
    }
    function comparisonTransition(globalScale, globalCat) {

        if (globalScale == "abs") {
            if (globalCat == "miles") {
                // xAxisGrp.transition().duration(2000).call(d3.axisBottom(xScaleMiles));
                d3.select('#x-axis-comp').remove();
                let xAxisGrp = svg.append("g")
                    .attr("class", "x axis-sec3 axis-comp")
                    .attr("id", "x-axis-comp")
                    .attr("transform", "translate(" + barWidth / 2 + "," + (h - paddingYBottom) + ")")
                    .call(d3.axisBottom(xScaleMiles))
                    .selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(90)")
                    .style("text-anchor", "start");

                yAxisGrp.transition().duration(2000).call(d3.axisLeft(yScaleMiles).tickSize(-w + paddingXLeft + paddingXRight)
                    .tickFormat(function (d) {
                        return d / 1000 + 'k';
                    })
                    .ticks(3)
                )
                yAxisLabel.transition().duration(2000).text("Difference in Miles");
                rectTransition(1, 1, 2, "Miles", xScaleMiles, yScaleMiles);


            }
            else if (globalCat == "fleet") {
                d3.select('#x-axis-comp').remove();
                let xAxisGrp = svg.append("g")
                    .attr("class", "x axis-sec3 axis-comp")
                    .attr("id", "x-axis-comp")
                    .attr("transform", "translate(" + barWidth / 2 + "," + (h - paddingYBottom) + ")")
                    .call(d3.axisBottom(xScaleFleet))
                    .selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(90)")
                    .style("text-anchor", "start");
                yAxisGrp.transition().duration(2000).call(d3.axisLeft(yScaleFleet)
                    .tickSize(-w + paddingXLeft + paddingXRight)
                    .tickFormat(function (d) {
                        return d;
                    })
                    .ticks(10)
                )
                yAxisLabel.transition().duration(2000).text("Difference in Fleet");
                rectTransition(5, 5, 6, "Fleet", xScaleFleet, yScaleFleet);

            }
            else if (globalCat == "dis") {
                d3.select('#x-axis-comp').remove();
                let xAxisGrp = svg.append("g")
                    .attr("class", "x axis-sec3 axis-comp")
                    .attr("id", "x-axis-comp")
                    .attr("transform", "translate(" + barWidth / 2 + "," + (h - paddingYBottom) + ")")
                    .call(d3.axisBottom(xScaleDis))
                    .selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(90)")
                    .style("text-anchor", "start");
                yAxisGrp.transition().duration(2000).call(d3.axisLeft(yScaleDis).tickSize(-w + paddingXLeft + paddingXRight)
                    .tickFormat(function (d) {
                        return d;
                    })
                    .ticks(8)
                )
                yAxisLabel.transition().duration(2000).text("Difference in Disengagements");
                rectTransition(3, 3, 4, "Disengagements", xScaleDis, yScaleDis);

            }

        }
        else if (globalScale == "perc") {
            if (globalCat == "miles") {
                d3.select('#x-axis-comp').remove();
                let xAxisGrp = svg.append("g")
                    .attr("class", "x axis-sec3 axis-comp")
                    .attr("id", "x-axis-comp")
                    .attr("transform", "translate(" + barWidth / 2 + "," + (h - paddingYBottom) + ")")
                    .call(d3.axisBottom(xScaleMilesPerc))
                    .selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(90)")
                    .style("text-anchor", "start");
                yAxisGrp.transition().duration(2000).call(d3.axisLeft(yScaleMilesPerc).tickSize(-w + paddingXLeft + paddingXRight)
                    .tickFormat(function (d) {
                        return d + '%';
                    })
                    .ticks(10)
                )
                yAxisLabel.transition().duration(2000).text("% Difference in Miles");
                rectTransition(2, 1, 2, "Miles", xScaleMilesPerc, yScaleMilesPerc);
            }
            else if (globalCat == "fleet") {
                d3.select('#x-axis-comp').remove();
                let xAxisGrp = svg.append("g")
                    .attr("class", "x axis-sec3 axis-comp")
                    .attr("id", "x-axis-comp")
                    .attr("transform", "translate(10," + (h - paddingYBottom) + ")")
                    .call(d3.axisBottom(xScaleFleetPerc))
                    .selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(90)")
                    .style("text-anchor", "start");
                yAxisGrp.transition().duration(2000).call(d3.axisLeft(yScaleFleetPerc).tickSize(-w + paddingXLeft + paddingXRight)
                    .tickFormat(function (d) {
                        return d + '%';
                    })
                    .ticks(10)
                )
                yAxisLabel.transition().duration(2000).text("% Difference in Fleet")
                rectTransition(6, 5, 6, "Fleet", xScaleFleetPerc, yScaleFleetPerc);

            }
            else if (globalCat == "dis") {
                d3.select('#x-axis-comp').remove();
                let xAxisGrp = svg.append("g")
                    .attr("class", "x axis-sec3 axis-comp")
                    .attr("id", "x-axis-comp")
                    .attr("transform", "translate(" + barWidth / 2 + "," + (h - paddingYBottom) + ")")
                    .call(d3.axisBottom(xScaleDisPerc))
                    .selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(90)")
                    .style("text-anchor", "start");
                yAxisGrp.transition().duration(2000).call(d3.axisLeft(yScaleDisPerc).tickSize(-w + paddingXLeft + paddingXRight)
                    .tickFormat(function (d) {
                        return d + '%';
                    })
                    .ticks(10)
                )
                yAxisLabel.transition().duration(2000).text("% Difference in Disengagements")
                rectTransition(4, 3, 4, "Disengagements", xScaleDisPerc, yScaleDisPerc);

            }



        }


    }

    $('#abs').click(() => {
        $(".y-axis-scales").removeClass("active");
        $("#abs").addClass("active");
        globalScale = "abs";
        comparisonTransition(globalScale, globalCat);
    })
    $('#perc').click(() => {
        $(".y-axis-scales").removeClass("active");
        $("#perc").addClass("active");
        globalScale = "perc";
        comparisonTransition(globalScale, globalCat);

    })

    $('#cat-miles').click(() => {
        $(".category-button").removeClass("active");
        $("#cat-miles").addClass("active");
        globalCat = "miles";
        comparisonTransition(globalScale, globalCat);

    })


    $('#cat-fleet').click(() => {
        $(".category-button").removeClass("active");
        $("#cat-fleet").addClass("active");
        globalCat = "fleet";
        comparisonTransition(globalScale, globalCat);

    })

    $('#cat-dis').click(() => {
        $(".category-button").removeClass("active");
        $("#cat-dis").addClass("active");
        globalCat = "dis";
        comparisonTransition(globalScale, globalCat);

    })






}



function initMilesPerDis(id, idSVG) {
    const w = +d3.select(id).style('width').slice(0, -2);
    const h = +d3.select(id).style('height').slice(0, -2);


    let svg = d3.select(id).append('svg').attr('height', h).attr('width', w).attr('id', idSVG);

}


function drawMilesPerDis(idSVG, data) {


    // console.log('dlp',data)
    const w = +d3.select(idSVG).style('width').slice(0, -2);
    const h = +d3.select(idSVG).style('height').slice(0, -2);

    const paddingX = 50;
    const paddingY = 20;


    let svg = d3.select(idSVG)





    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => +d.miles_per_disengagement)])
        .range([paddingX, w - paddingX])


    d3.selectAll('#x-axis-sec3-2').remove();

    svg.append("g")
        .attr("class", "x axis-sec3")
        .attr("id", "x-axis-sec3-2")
        .attr("transform", "translate(0," + (h - 30) + ")")
        .call(d3.axisBottom(xScale)
            .tickFormat((d) => {
                return d / 1000 + 'k'
            })
            .tickSize(2 * paddingY - h)
            .ticks(11)
        ); // Create an axis component with d3.axisBottom


    d3.selectAll(".circle-sec3-2").remove();
    // d3.selectAll(".text-legend-"+modifier).remove();
    // d3.selectAll("#text-title-plot-"+modifier).remove();


    svg.append("text")
        .attr("id", "text-title-plot-milesperdis-x")
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('x', w / 2)
        .attr('y', h - 5)
        .attr('text-anchor', 'middle')
        .text("Miles Per Disengagement")



    var div = d3.select("#tooltip");


    svg.append("g").selectAll(".circle-sec3-2")
        .data(data).enter()
        .append('circle')
        .attr("class", "circles circle-sec3-2")
        .attr("id", (d) => ("mpd-circles-" + d.company_id))
        .attr("cx", (d, i) => xScale(d.miles_per_disengagement))
        .attr('cy', (d, i) => (h / 2 + 4 * (Math.floor(Math.random() * 11) - 5)))
        .attr('r', 4)
        .attr('fill', (d) => colorMap[d.company_name])
        .attr('opacity', 0.8)
        .on("mouseover", function (d, i) {
            div.transition()
                .duration(200)
                .style("display", 'block');
            div.html(() => {
                let c = +d3.select(this).attr('id').replace('mpd-circles-', '');
                applySelectionStyles(c);
                return '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' +
                    nameShortner[data[c].company_name] + '</span><br>Miles Per Disengagement: ' + (data[c].miles_per_disengagement / 1000).toFixed(2) + "k";
            })
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 80) + "px");


        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(500)
                // .style("opacity", 0)
                .style("display", 'none');
            removeSelectonStyles()
        })





}

function drawDisLocation(id, data) {



    // const w = +d3.select(idSVG).style('width').slice(0, -2);
    // const h = +d3.select(idSVG).style('height').slice(0, -2);

    // const paddingX = 50;
    // const paddingY = 20;

    d3.selectAll('.location-donuts').remove();

    var div = d3.select("#tooltip");

    data.map(company => {
        let comp = d3.select(id).append('div').attr('class', 'col-md-2 col-xs-5 location-donuts').attr('id', 'location-company-' + company.company_id);
        const w = +d3.select('#location-company-' + company.company_id).style('width').slice(0, -2);
        const h = 200;

        comp.on("mouseover", function (d, i) {
            div.transition()
                .duration(200)
                .style("display", 'block');
            div.html(() => {
                let c = company.company_id;
                applySelectionStyles(c);
                let returnText = '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' + nameShortner[data[c].company_name] + '</span><br><span style="font-weight:800;color:#f1c40f" >Disengagements - Location</span>';

                company.disengagements_location.map(d => {

                    returnText = returnText + '<br>' + d.location + ' : ' + d.total + ' (' + (d.total * 100 / company.disengagements).toFixed(1) + '%)';
                })

                returnText = returnText + '<br><br><span style="font-weight:800;color:#f1c40f" >Disengagements - Actor</span>'

                company.disengagements_actor.map(d => {

                    returnText = returnText + '<br>' + d.actor + ' : ' + d.total + ' (' + (d.total * 100 / company.disengagements).toFixed(1) + '%)';
                })

                returnText = returnText + '<br><br><span style="font-weight:800;color:#f1c40f" >Disengagements - Top reasons</span>'

                company.top_disengagement_reasons.map((d, i) => {

                    returnText = returnText + '<br>Reason ' + (i + 1) + ' - ' + d.reason + ' : ' + d.total + ' (' + (d.total * 100 / company.disengagements).toFixed(1) + '%)';
                })

                return returnText;
            })
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 80) + "px");


        })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    // .style("opacity", 0)
                    .style("display", 'none');
                removeSelectonStyles()
            })



        let compsvg = comp.append('svg').attr('height', h).attr('width', w);

        let outerRadius = 40;
        let innerRadius = 32;
        let cornerRadius = 10;

        let padAngle = 0.01;





        // compsvg.append('circle').attr('cx',w/2).attr('cy',h/2).attr('r',Math.min(w/2,h/2)).attr('fill','red')

        const pie = d3.pie()
            .value(d => d.total)
            .padAngle(padAngle)

        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(cornerRadius);

        let colors = { 'Street': '#2c3e50', 'Highway': '#8e44ad', 'Freeway': '#27ae60', 'Parking Facility': '#95a5a6', 'Rural': "#f1c40f" }

        compsvg.selectAll('#donut-' + company.company_id).data(pie(company.disengagements_location))
            .enter().append("path")
            .attr('id', 'donut-' + company.company_id)
            .attr("fill", (d) => (colors[d.data.location]))
            .attr("d", arc)
            .attr("style", "transform:translate(" + parseInt(outerRadius) + "px," + parseInt(h / 4) + "px)")
            .each(function (d, i) {
                // console.log('donut',d,i);
                this._current = d;
            });


        compsvg
            .append("rect")
            .attr('id', 'dis-td-' + company.company_id)
            .attr("fill", '#aaa')
            .attr('x', 2 * outerRadius + 10)
            .attr('y', 10)
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('width', 10)
            .attr('height', 2 * outerRadius - 25)



        compsvg
            .append("rect")
            .attr('id', 'dis-td-' + company.company_id)
            .attr("fill", '#aaa')
            .attr('x', 2 * outerRadius + 34)
            .attr('y', 10)
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('width', 10)
            .attr('height', 2 * outerRadius - 25)



        let height_bar = [0, 0]
        let total_height_back = 2 * outerRadius - 25;
        company.disengagements_actor.map(p => {
            // console.log(p);
            if (p.actor === 'Test Driver') {
                height_bar[0] = p.total;
            }
            else if (p.actor === 'AV System') {
                height_bar[1] = p.total;
            }
        })

        // console.log('pre',height_bar)

        let total_height_bar = (height_bar[0] + height_bar[1]);
        height_bar = [height_bar[0] / total_height_bar, height_bar[1] / total_height_bar]


        // console.log(height_bar, company.disengagements_actor);

        compsvg
            .append("rect")
            .attr('id', 'dis-td-' + company.company_id)
            .attr("fill", '#2980b9')
            .attr('x', 2 * outerRadius + 10)
            .attr('y', height_bar[1] * total_height_back + 10)
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('width', 10)
            .attr('height', height_bar[0] * total_height_back)



        compsvg
            .append("rect")
            .attr('id', 'dis-td-' + company.company_id)
            .attr("fill", '#2980b9')
            .attr('x', 2 * outerRadius + 34)
            .attr('y', height_bar[0] * total_height_back + 10)
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('width', 10)
            .attr('height', height_bar[1] * total_height_back)



        compsvg.append('text').text('👤').attr('x', 2 * outerRadius + 6).attr('y', 2 * outerRadius + 6)
        compsvg.append('text').text('🤖').attr('x', 2 * outerRadius + 30).attr('y', 2 * outerRadius + 6)



        compsvg.append('text').text(nameShortner[company.company_name]).attr('x', w / 2).attr('y', h - 5)
            .attr('text-anchor', 'middle').attr('class', 'plot-text bold')

        compsvg.append('text').text("Locations").attr('x', parseInt(outerRadius)).attr('y', h / 4)
            .attr('text-anchor', 'middle').attr('class', 'plot-text')


        compsvg.append('text').text("Actors").attr('x', 2 * outerRadius + 18).attr('y', h / 2 + 5)
            .attr('text-anchor', 'middle').attr('class', 'plot-text')

        // console.log(company.top_disengagement_reasons);

        compsvg.selectAll('.reasons-dis').data(company.top_disengagement_reasons).enter()
            .append('rect').attr('x', 60).attr('y', (d, i) => (i * 25 + h / 2 + 15)).attr('width', (d, i) => ((w - 80))).attr('height', 10)
            .attr('fill', '#aaa').attr('rx', 5).attr('ry', 5)

        compsvg.selectAll('.reasons-dis-color').data(company.top_disengagement_reasons).enter()
            .append('rect').attr('x', 60).attr('y', (d, i) => (i * 25 + h / 2 + 15)).attr('width', (d, i) => (d.perc * (w - 80))).attr('height', 10)
            .attr('fill', '#c0392b').attr('rx', 5).attr('ry', 5)

        compsvg.selectAll('.reasons-dis-text').data(company.top_disengagement_reasons).enter()
            .append('text').attr('x', 0).attr('y', (d, i) => (i * 25 + h / 2 + 25)).text((d, i) => ("Reason " + (i + 1)))

    })


}



Promise.all(
    [
        d3.json('./res/data.json'),
        d3.json('./2019/data.json')

    ]).then(function (data) {

        data_2019 = data[1];
        data = data[0];

        data = data.sort((b, a) => {
            return a.miles - b.miles;
        })

        data.map((d, i) => {
            // console.log(d.company_name, d.disengagements_reason.length)
            if (d.disengagements > 0) {
                data[i]['miles_per_disengagement'] = d.miles / d.disengagements;
            }
            else {
                data[i]['miles_per_disengagement'] = d.miles;
            }

            // data[i]['miles_per_disengagement_month'] = d.miles_month.map(function(n, j) { return n / d.disengagements_month[j]; });
            data[i]['miles_per_disengagement_month'] = d.miles_month.map(function (n, j) { return 0 });
            data[i]['company_id'] = i;
            d["disengagements_location"].map((f, g) => {
                data[i]["disengagements_location"][g]['total'] = f["numbers_by_month"].reduce((a, b) => (a + b));
            })

            d["disengagements_actor"].map((f, g) => {
                data[i]["disengagements_actor"][g]['total'] = f["numbers_by_month"].reduce((a, b) => (a + b));
            })

            d["disengagements_reason"].map((f, g) => {
                data[i]["disengagements_reason"][g]['total'] = f["numbers_by_month"].reduce((a, b) => (a + b));
            })

            data[i]["disengagements_reason"] = d["disengagements_reason"].sort((b, a) => {
                return a.total - b.total;
            })

            let reason_total = d.disengagements_reason.reduce((a, b) => a + b.total, 0);


            data[i]["top_disengagement_reasons"] = data[i]['disengagements_reason'].filter((a, b) => {
                if (b <= 2) return true;
            })

            data[i]["top_disengagement_reasons"].map((a, b) => {
                data[i]["top_disengagement_reasons"][b]['perc'] = a.total / reason_total;
            })



        })


        data.map((d, i) => {
            $('#company-search').append(' <option value="' + nameShortner[d.company_name] + '">' + nameShortner[d.company_name] + '</option>');
        })


        mileBarChart('#miles', 'miles-svg', data);
        // fleetChart('#miles-svg',data);


        let plotInitialized = false;

        $('#company-search')
            .dropdown({
                maxSelections: 5,
                onChange: function (value, text, $selectedItem) {
                    let returnedValues = data.filter((d) => {
                        return value.includes(nameShortner[d.company_name]);
                    })

                    // console.log(returnedValues);

                    if (plotInitialized) {
                        drawLinePlot('#miles-month-svg', returnedValues, data, 'miles_month', 1000, 'Miles');
                        drawLinePlot('#disengagements-month-svg', returnedValues, data, 'disengagements_month', 1, 'Disengagements');
                        drawLinePlot('#fleet-month-svg', returnedValues, data, 'fleet_month', 1, 'Fleet');
                        // drawMilesDisFleet('#miles-disengagement-fleet-svg', returnedValues);
                        // drawMilesPerDis('#miles-per-disengagement-svg', returnedValues);

                        // milesPerDisengagement('#miles-per-disengagement',data);

                        // drawLinePlot('#miles-per-disengagement-month-svg', returnedValues, data, 'miles_per_disengagement_month',1,'Miles/Disengagement');
                    } else {
                        $.when(initLinePlot('#miles-month', 'miles-month-svg')).then(drawLinePlot('#miles-month-svg', returnedValues, data, 'miles_month', 1000, 'Miles'));
                        $.when(initLinePlot('#disengagements-month', 'disengagements-month-svg')).then(drawLinePlot('#disengagements-month-svg', returnedValues, data, 'disengagements_month', 1, 'Disengagements'));
                        $.when(initLinePlot('#fleet-month', 'fleet-month-svg')).then(drawLinePlot('#fleet-month-svg', returnedValues, data, 'fleet_month', 1, 'Fleet'));

                        // $.when(initLinePlot('#miles-per-disengagement-month', 'miles-per-disengagement-month-svg')).then(drawLinePlot('#miles-per-disengagement-month-svg', returnedValues, data, 'miles_per_disengagement_month',1,'Miles/Disengagement'));
                        plotInitialized = true;
                    }
                }
            });

        $('#company-search').dropdown('set selected', ["Waymo", "Cruise", "Pony.ai", "Baidu", "Nuro"]);

        drawDisLocation('#disengagement-location', data);
        $.when(initMilesDisFleet('#miles-disengagement-fleet', 'miles-disengagement-fleet-svg')).then(drawMilesDisFleet('#miles-disengagement-fleet-svg', data));
        $.when(initMilesPerDis('#miles-per-disengagement', 'miles-per-disengagement-svg')).then(drawMilesPerDis('#miles-per-disengagement-svg', data));
        $.when(initComparison_2019_2020('#comparison', 'comparison-svg')).then(drawComparison_2019_2020('#comparison-svg', data, data_2019));





    })