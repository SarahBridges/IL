var data = d3.json("data.json");

data.then(function(data){
  initilize(data);
},
function(err){
  console.log(err);
}
)






var initilize = function(data){
  var screens = {width:600, height:500}


  var colors=d3.scaleOrdinal(d3.schemePaired);
  var margins = {top: 40, right: 50, bottom: 20, left: 30}
document.getElementsByTagName("p")[0].innerHTML = "0";
  var svg = d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height);

    var width = screen.width - margins.left - margins.right
    var height = screen.height - margins.top - margins.bottom
    var barWidth = (width/data.length)
      console.log(barWidth)
    var xScale = d3.scaleOrdinal()
    .domain([d3.range(data[0].grades.length)])
    .range([0, width]);
    var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height,0]);

    svg.selectAll("rect")
           .data(data[0].grades)
           .enter()
           .append("rect")
           .attr("x", function(d,i){
             return xScale(i)
           })
           .attr("y", function(d,i){
             return yScale(d.grade);
           })
           .attr("height", function(d){
             return height-yScale(d.grade);
           })
           .attr("width", barWidth)
            // .attr('transform', 'translate(' + (margins.right+15) + ',' + margins.top + ')')
           .attr("fill", function(d){
             return colors(d.name);
           });



          var yAxis = d3.axisLeft(yScale)
                   .ticks(10)
                   .tickSize(10)
     svg.append("g").classed("yAxis",true)
     .call(yAxis)
     .attr('transform', 'translate(' + (margins.left +10)+ ','+(margins.top + 5)+')');

var xAxis = d3.axisBottom(xScale)
              .ticks(4)
              .tickFormat(function(d,i){
                console.log(d, "i", i);
                return data[0].grades[i].name;
              })
              .tickSize(1)
              svg.append("g").classed("xAxis",true)
              .call(xAxis)
              .attr('transform', 'translate(' + (margins.left + 10)+ ','+(height - margins.top+5)+')');
}




var update = function(){

}
