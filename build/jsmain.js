const nameShortner = {
    "Waymo LLC": "Waymo",
    "CRUISE LLC": "Cruise",
    "PONY.AI, INC.": "Pony.ai",
    "Baidu USA LLC": "Baidu",
    "Nuro": "Nuro",
    "Zoox, Inc": "Zoox",
    "Lyft": "Lyft",
    "AutoX Technologies, Inc.": "AutoX",
    "Mercedes0Benz Research & Development North America, Inc.": "Mercedes Benz R&D",
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
    "Phantom AI, Inc.": "Phantom AI",
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
    "Apex.Ai, Inc.": "Apex.ai"
}

function months(i){
    let m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return m[i];
}



function mileBarChart(id, data) {
    const w = +d3.select(id).style('width').slice(0, -2);
    const h = +d3.select(id).style('height').slice(0, -2);

    const paddingX = 20;
    const paddingY = 20;


    let svg = d3.select(id).append('svg').attr('height', h).attr('width', w);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, (d) => {
            return d.miles;
        }))
        .range([7 * paddingX, w - paddingX]);

    const yScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([paddingY, h - paddingY]);




    svg.append('g').selectAll('.mile-bar').data(data).enter()
        .append('rect').attr('class', 'mile-bar')
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
        .attr('fill', 'red')

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
        .domain([0,1,2,3,4,5,6,7,8,9,10,11])
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

    d3.selectAll('#x-axis-'+modifier).remove();
    d3.selectAll('#y-axis-'+modifier).remove();

    svg.append("g")
        .attr("class", "x axis")
        .attr("id", "x-axis-"+modifier)
        .attr("transform", "translate(0," + (h - paddingY) + ")")
        .call(d3.axisBottom(xScale)
            .tickFormat((i)=>{
                return months(i)
            })
            .tickSize(2 * paddingY - h)
            .ticks(11)
        ); // Create an axis component with d3.axisBottom

    svg.append("g")
        .attr("class", "y axis")
        .attr("id", "y-axis-"+modifier)
        .attr("transform", "translate(" + paddingX + ",0)")
        .call(d3.axisLeft(yScale).tickSize(-w + 2 * paddingX)
            .tickFormat(function (d) {
                if(scale===1000)return d / 1000 + "k";
                else return d;

            })
            .ticks(8)
        ); // Create an axis component with d3.axisLeft


    d3.selectAll(".line-"+modifier).remove();
    d3.selectAll(".circle-"+modifier).remove();
    d3.selectAll(".text-legend-"+modifier).remove();
    d3.selectAll("#text-title-plot-"+modifier).remove();


    svg.append("text")
        .attr("id", "text-title-plot-"+modifier)
        .attr("class", "text-title")
        .attr('fill', '#000')
        .attr('x', w / 2)
        .attr('y', paddingY-5)
        .attr('text-anchor', 'middle')
        .text(units+" vs Months")



    var div = d3.select("#tooltip");

    let companyID = 0;
    data.map(company=>{

        // let col = colors[r]
        // console.log(company);


        if (tempCompanies.includes(company.company_name)) {

            console.log('company',company);
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
                .attr("class", "line line-"+modifier) // Assign a class for styling 
                .attr("id", "line-"+modifier+"-"+companyID) // Assign a class for styling 
                .attr("d", line)
                .attr('fill', 'none')
                .attr('stroke', 'green')
                .attr('stroke-width', 2)

            svg.append("g").selectAll(".circle-"+modifier+"-" + companyID)
                .data(company[modifier])
                .join(
                    enter => enter.append('circle')
                        .attr("class", "circles circle-"+modifier+"-" + companyID + " circle-"+modifier)
                        .attr("cx", (d,i) => xScale(i))
                        .attr('cy', (d) => {
                            return yScale(d);
                        })
                        .attr('r', 3.5)
                        .attr('fill', 'green')
                        .on("mouseover", function (d,i) {
                            div.transition()
                                .duration(200)
                                .style("display", 'block');
                            div.html(() => {
                                let c = +d3.select(this).attr('class').replace('circles ', '').replace('circle-'+modifier+'-', '').replace('circle-'+modifier, '');
                                console.log(c);
                                let val = '';
                                if (scale===1000) val = (d/1000).toFixed(2)+'k '+units;
                                else val = d+' '+units;
                                return '<span style="font-weight:800; letter-spacing: 2px; color:#c0392b; text-transform: uppercase">' +
                                    data[c].company_name + '</span><br>' + months(i) + "<br>" + val;
                            })
                                .style("left", (d3.event.pageX - 100) + "px")
                                .style("top", (d3.event.pageY - 60) + "px");
                        })
                        .on("mouseout", function (d) {
                            div.transition()
                                .duration(500)
                                // .style("opacity", 0)
                                .style("display", 'none');
                        })

                )




        }
        companyID += 1;


    })
}



    Promise.all(
        [
            d3.json('./res/data.json')

        ]).then(function (data) {
            data = data[0];

            data = data.sort((b, a) => {
                return a.miles - b.miles;
            })

            data.map((d,i)=>{
                data[i]['miles_per_disengagement'] = d.miles/d.disengagements;
                data[i]['miles_per_disengagement_months'] = d.miles_month.map(function(n, j) { return n / d.disengagements_month[j]; });
            })


            data.map((d, i) => {
                $('#company-search').append(' <option value="' + nameShortner[d.company_name] + '">' + nameShortner[d.company_name] + '</option>');
            })


            mileBarChart('#miles', data);


            let plotInitialized = false;

            $('#company-search')
                .dropdown({
                    maxSelections: 5,
                    onChange: function (value, text, $selectedItem) {
                        let returnedValues = data.filter((d) => {
                            return value.includes(nameShortner[d.company_name]);
                        })

                        console.log(returnedValues);

                        if (plotInitialized) {
                            drawLinePlot('#miles-month-svg', returnedValues, data, 'miles_month',1000,'Miles');
                            drawLinePlot('#disengagements-month-svg', returnedValues, data, 'disengagements_month',1,'Disengagements');
                            drawLinePlot('#fleet-month-svg', returnedValues, data, 'fleet_month',1,'Fleet');
                            drawLinePlot('#miles-per-disengagement-month-svg', returnedValues, data, 'miles_per_disengagement_month',1,'Miles/Disengagement');
                        } else {
                            $.when(initLinePlot('#miles-month', 'miles-month-svg')).then(drawLinePlot('#miles-month-svg', returnedValues, data, 'miles_month',1000,'Miles'));
                            $.when(initLinePlot('#disengagements-month', 'disengagements-month-svg')).then(drawLinePlot('#disengagements-month-svg', returnedValues, data, 'disengagements_month',1,'Disengagements'));
                            $.when(initLinePlot('#fleet-month', 'fleet-month-svg')).then(drawLinePlot('#fleet-month-svg', returnedValues, data, 'fleet_month',1,'Fleet'));
                            $.when(initLinePlot('#miles-per-disengagement-month', 'miles-per-disengagement-month-svg')).then(drawLinePlot('#miles-per-disengagement-month-svg', returnedValues, data, 'miles_per_disengagement_month',1,'Miles/Disengagement'));
                            plotInitialized = true;
                        }
                    }
                });

            $('#company-search').dropdown('set selected', ["Waymo", "Cruise", "Pony.ai", "Baidu", "Nuro"]);








        })