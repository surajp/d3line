
(function(){
"use strict;"

interface IMargin{
    top:number;
    bottom:number;
    right:number;
    left:number;
}

interface IDimension{
    width:number;
    height:number;
}

class DrawLine{
    dt:number;
    x:(val:number)=>number;
    y:(val:number)=>number;
    dim:IDimension;
    constructor(){
        let dim ={width:960,height:500};
        let x=d3.scaleBand().padding(0.1).range([0,dim.width]);
        let y=d3.scaleLinear().range([0,dim.height]);
        let actualsMax:number=0;
        let projMax:number=0;
    }
}
d3.csv('actuals.csv?id='+Math.random(),(data)=>{
    x.domain(data.columns);
    
    actualsMax = parseFloat(d3.max(data.columns,(col:string,i:number)=>data[0][col]));
    projMax = parseFloat(d3.max(data.columns,(col:string,i)=>data[1][col]));
    y.domain([d3.max([actualsMax,projMax])]);
    var chart = d3.select("#chart")
                    .attr("width",width+margin.left+margin.right)
                    .attr("height",height+margin.top+margin.bottom)
                    .append("g")
                    .attr("transform","translate("+margin.left+","+margin.top+")");
    var xaxis = d3.axisBottom(x);
    var yaxis = d3.axisLeft(y);
    chart.append("g").attr("class","x axis")
            .attr("transform","translate(0,"+height+")")
            .call(xaxis);
    chart.append("g").attr("class","y axis")
            .call(yaxis);
    var actualsLine = d3.line().curve(d3.curveCatmullRom).y((col)=>y(data[0][<number>col])).x(d=>(x(d)+x.bandwidth()/2));
    var projectionsLine = d3.line().curve(d3.curveCatmullRom).y((col)=>y(data[1][col])).x(d=>(x(d)+x.bandwidth()/2));
    chart.append("path").datum(data.columns)
            .attr("d",actualsLine).attr("fill","none")
            .attr("stroke","#252984");
    chart.append("path").datum(data.columns)
            .attr("d",projectionsLine).attr("fill","none")
            .attr("stroke","#24D2CD");

    var actGroup = chart.selectAll("g.actuals").data(data.columns).enter().append("g").attr("class","actuals");
    actGroup.append("circle")
            .attr("cx",d=>x(d)+x.bandwidth()/2)
            .attr("cy",d=>y(data[0][d]))
            .attr("r","3px")
            .attr("fill","steelblue");
    
    
    actGroup.append("text")
            .attr("x",d=>x(d)+x.bandwidth()/2)
            .attr("y",d=>y(data[0][d]))
            .text((d)=>data[0][d])
            .attr("fill","orange")
            .attr("dy","-10px")
            .style("font-size","12px");

    var projGroup = chart.selectAll("g.projections").data(data.columns).enter().append("g").attr("class","projections");
    
    projGroup.append("circle")
            .attr("cx",d=>x(d)+x.bandwidth()/2)
            .attr("cy",d=>y(data[1][d]))
            .attr("r","3px")
            .attr("fill","steelblue");     

    projGroup.append("text")
            .attr("x",d=>x(d)+x.bandwidth()/2)
            .attr("y",d=>y(data[1][d]))
            .text((d)=>data[1][d])
            .attr("fill","orange")
            .attr("dy","-10px")
            .style("font-size","12px");
    
})

})();