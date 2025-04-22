function lines() {
  
    const margin =  {
        left: 20,
        bottom: 20,
        right: 60,
        top: 10
      }

    const width_line = 600 - margin.left - margin.right;
    const height_line = width_line * .5;

    chartWidth = width_line - margin.left - margin.right;
    chartHeight = height_line - margin.top - margin.bottom;
    const svg = d3.select("#line")
        .append("svg")
        .attr("width", width_line + margin.left + margin.right)
        .attr("height", height_line + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

}