// async function  getData() {
//     // se obtiene el dataset de un archivo csv
//     dataset_global = await d3.csv("mobile_sales_data.csv");
//     dataset_global= dataset_global.map((dataset) =>({
//     ...dataset,
//     Price: parseFloat(dataset['Price']),
//     "Quantity Sold": parseFloat(dataset['Quantity Sold']),
//     Total_sale:dataset['Quantity Sold']*dataset['Price']
//     }))

//     const groupSalesByDate = d3.group(dataset_global, (dataset) => dataset['Inward Date'], (dataset) => dataset.Product , (dataset) => dataset.Total_sale);
//     console.log(groupSalesByDate)
// }

// async function getData() {
//     // se obtiene el dataset de un archivo csv
//     dataset_global = await d3.csv("mobile_sales_data.csv");
//     dataset_global = dataset_global.map((dataset) => ({
//       ...dataset,
//       Price: parseFloat(dataset['Price']),
//       "Quantity Sold": parseFloat(dataset['Quantity Sold']),
//       Total_sale: parseFloat(dataset['Quantity Sold']) * parseFloat(dataset['Price']) // Asegúrate de parsear ambos valores a número
//     }));
  
//     const groupedSales = d3.rollup(
//       dataset_global,
//       v => d3.sum(v, d => d.Total_sale), // Sumariza Total_sale para cada grupo
//       d => d['Inward Date'], // Agrupa por fecha
//       d => d.Product      // Y luego por producto
//     );
  
//     // Para trabajar más fácilmente con los resultados, puedes convertir el Map a un array de objetos
//      // Transforma el Map anidado a la estructura deseada
//         const groupedSalesArray = Array.from(d3.group(dataset_global, d => d['Inward Date']), ([date, salesForDate]) => {
//         const salesByProduct = {};
//         salesForDate.forEach(sale => {
//         salesByProduct[sale.Product] = (salesByProduct[sale.Product] || 0) + sale.Total_sale;
//         });
//             return {
//             Date: date,
//             ...salesByProduct
//             };
//         });
    
//         // Ordena el array por fecha ascendente
//     groupedSalesArray.sort((a, b) => {
//         // Primero, intenta parsear las fechas. Si falla, considera las cadenas tal cual.
//         const dateA = new Date(a.Date);
//         const dateB = new Date(b.Date);

//         if (!isNaN(dateA) && !isNaN(dateB)) {
//         return dateA - dateB; // Ordena cronológicamente si ambas son fechas válidas
//         } else {
//         return a.Date.localeCompare(b.Date); // Si no son fechas válidas, compara como cadenas
//         }
//     });

//     groupedSalesArray.sort((a, b) => new Date(a.Date) - new Date(b.Date));

//     // Ahora, generar la gráfica con groupedSalesArray
//     const svg = d3.select("#lineChart");
//     const margin = { top: 20, right: 50, bottom: 50, left: 50 };
//     const width = +svg.attr("width") - margin.left - margin.right;
//     const height = +svg.attr("height") - margin.top - margin.bottom;
//     const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  
//     // Obtener todos los nombres de los productos (excluyendo "Date")
//     const products = Object.keys(groupedSalesArray[0]).filter(key => key !== "Date");
//     const colors = d3.scaleOrdinal(d3.schemeCategory10);
  
//     // Escala para el eje X (fechas)
//     const x = d3.scaleTime()
//       .domain(d3.extent(groupedSalesArray, d => new Date(d.Date)))
//       .range([0, width]);
  
//     // Escala para el eje Y (ventas totales)
//     const y = d3.scaleLinear()
//       .domain([0, d3.max(groupedSalesArray, d => d3.max(products, product => d[product]))])
//       .range([height, 0]);
  
//     // Crear las líneas para cada producto
//     const line = d3.line()
//       .x(d => x(new Date(d.Date)))
//       .y(d => y(d[this.product])); // 'this.product' se define al llamar a la función
  
//     products.forEach(function(product, index) {
//     const lineGenerator = d3.line()
//         .x(d => x(new Date(d.Date)))
//         .y(d => y(d[product])); // Accede directamente a d[product]

//     g.append("path")
//         .datum(groupedSalesArray)
//         .attr("fill", "none")
//         .attr("stroke", colors(index))
//         .attr("stroke-width", 1.5)
//         .attr("d", lineGenerator) // Usa la función generadora aquí
//         .attr("class", "line");
//     });
  
//     // Añadir eje X
//     g.append("g")
//       .attr("class", "axis axis--x")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x));
  
//     // Añadir etiqueta al eje X
//     g.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 5})`)
//       .style("text-anchor", "middle")
//       .text("Fecha");
  
//     // Añadir eje Y
//     g.append("g")
//       .attr("class", "axis axis--y")
//       .call(d3.axisLeft(y).tickFormat(d3.format(".2s"))); // Formato de los ticks del eje Y
  
//     // Añadir etiqueta al eje Y
//     g.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .style("text-anchor", "middle")
//       .text("Ventas Totales");
  
//     // Crear la leyenda
//     const legendContainer = d3.select("#legend");
//     products.forEach((product, index) => {
//       const legendItem = legendContainer.append("div")
//         .attr("class", "legend-item");
  
//       legendItem.append("span")
//         .attr("class", "legend-color")
//         .style("background-color", colors(index));
  
//       legendItem.append("span")
//         .text(product);
//     });
//   }
  
//   getData();    

// async function getData() {
//     // ... (tu código para obtener y transformar los datos) ...
//     dataset_global = await d3.csv("mobile_sales_data.csv");
//     dataset_global = dataset_global.map((dataset) => ({
//       ...dataset,
//       Price: parseFloat(dataset['Price']),
//       "Quantity Sold": parseFloat(dataset['Quantity Sold']),
//       Total_sale: parseFloat(dataset['Quantity Sold']) * parseFloat(dataset['Price']),
//       'Inward Date': new Date(dataset['Inward Date']) // Convertir a objeto Date para facilitar el manejo de fechas
//     }));
  
//     // Sumarizar ventas por mes y producto
//     const monthlySales = d3.rollup(
//       dataset_global,
//       v => ({
//         Laptop: d3.sum(v, d => d.Product === 'Laptop' ? d.Total_sale : 0),
//         'Mobile Phone': d3.sum(v, d => d.Product === 'Mobile Phone' ? d.Total_sale : 0)
//       }),
//       d => d['Inward Date'].getFullYear(),
//       d => d['Inward Date'].getMonth()
//     );
  
//     // Formatear los datos para la gráfica de líneas
//     const monthlySalesArray = Array.from(monthlySales, ([year, months]) => {
//       return Array.from(months, ([month, sales]) => ({
//         Date: new Date(year, month, 1), // Crear un objeto Date para el primer día del mes
//         ...sales
//       }));
//     }).flat().sort((a, b) => a.Date - b.Date);
  
//     console.log("monthlySalesArray:", monthlySalesArray);
  
//     // Generar la gráfica con monthlySalesArray
//     const svg = d3.select("#lineChart");
//     svg.selectAll("*").remove(); // Limpiar la gráfica anterior
//     const legendContainer = d3.select("#legend");
//     legendContainer.selectAll("*").remove(); // Limpiar la leyenda anterior
  
//     const margin = { top: 20, right: 70, bottom: 50, left: 70 }; // Ajustar márgenes para etiquetas del eje Y
//     const width = +svg.attr("width") - margin.left - margin.right;
//     const height = +svg.attr("height") - margin.top - margin.bottom;
//     const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  
//     const products = Object.keys(monthlySalesArray[0]).filter(key => key !== "Date");
//     const colors = d3.scaleOrdinal(d3.schemeCategory10);
  
//     const x = d3.scaleTime()
//       .domain(d3.extent(monthlySalesArray, d => d.Date))
//       .range([0, width]);
  
//     const y = d3.scaleLinear()
//       .domain([0, d3.max(monthlySalesArray, d => d3.max(products, product => d[product])) * 1.1]) // Añadir un pequeño buffer
//       .range([height, 0]);
  
//     const line = d3.line()
//       .x(d => x(d.Date))
//       .y(d => y(d[this.product]));
  
//     products.forEach(function(product, index) {
//       g.append("path")
//         .datum(monthlySalesArray)
//         .attr("fill", "none")
//         .attr("stroke", colors(product)) // Usar el nombre del producto como clave para el color
//         .attr("stroke-width", 1.5)
//         .attr("d", line.bind({ product: product }))
//         .attr("class", "line");
//     });
  
//     g.append("g")
//       .attr("class", "axis axis--x")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m"))); // Formato de fecha mensual
  
//     g.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 5})`)
//       .style("text-anchor", "middle")
//       .text("Fecha (Año-Mes)");
  
//     g.append("g")
//       .attr("class", "axis axis--y")
//       .call(d3.axisLeft(y).tickFormat(d3.format(".2s")));
  
//     g.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .style("text-anchor", "middle")
//       .text("Ventas Totales Mensuales");
  
//     // Leyenda
//     products.forEach(product => {
//       const legendItem = legendContainer.append("div")
//         .attr("class", "legend-item");
  
//       legendItem.append("span")
//         .attr("class", "legend-color")
//         .style("background-color", colors(product));
  
//       legendItem.append("span")
//         .text(product);
//     });
//   }
  
//   getData();

async function getData() {
    // se obtiene el dataset de un archivo csv
    dataset_global = await d3.csv("mobile_sales_data.csv");
    dataset_global = dataset_global.map((dataset) => ({
      ...dataset,
      Price: parseFloat(dataset['Price']),
      "Quantity Sold": parseFloat(dataset['Quantity Sold']),
      Total_sale: parseFloat(dataset['Quantity Sold']) * parseFloat(dataset['Price']),
      'Inward Date': new Date(dataset['Inward Date']) // Convertir a objeto Date
    }));
  
    // Sumarizar ventas por mes y producto
    const monthlySales = d3.rollup(
      dataset_global,
      v => ({
        Laptop: d3.sum(v, d => d.Product === 'Laptop' ? d.Total_sale : 0),
        'Mobile Phone': d3.sum(v, d => d.Product === 'Mobile Phone' ? d.Total_sale : 0)
      }),
      d => d['Inward Date'].getFullYear(),
      d => d['Inward Date'].getMonth()
    );
  
    // Formatear los datos para la gráfica de líneas
    const monthlySalesArray = Array.from(monthlySales, ([year, months]) => {
      return Array.from(months, ([month, sales]) => ({
        Date: new Date(year, month, 1), // Primer día del mes
        ...sales
      }));
    }).flat().sort((a, b) => a.Date - b.Date);
  
    console.log("monthlySalesArray antes de la gráfica:", monthlySalesArray);
  
    // Generar la gráfica con monthlySalesArray
    const svg = d3.select("#lineChart");
    svg.selectAll("*").remove(); // Limpiar la gráfica anterior
    const legendContainer = d3.select("#legend");
    legendContainer.selectAll("*").remove(); // Limpiar la leyenda anterior
  
    const margin = { top: 20, right: 70, bottom: 50, left: 70 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  
    const products = Object.keys(monthlySalesArray[0]).filter(key => key !== "Date");
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
  
    const x = d3.scaleTime()
      .domain(d3.extent(monthlySalesArray, d => d.Date))
      .range([0, width]);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(monthlySalesArray, d => d3.max(products, product => d[product])) * 1.1])
      .range([height, 0]);
  
    const line = d3.line()
      .x(d => x(d.Date))
      .y(d => {
        const value = d[this.product];
        return typeof value === 'number' && !isNaN(value) ? y(value) : y(0); // Manejo robusto de valores no numéricos
      });
  
    products.forEach(function(product, index) {
      const lineGenerator = d3.line()
        .x(d => x(d.Date))
        .y(d => {
          const value = d[product];
          return typeof value === 'number' && !isNaN(value) ? y(value) : y(0); // Manejo robusto de valores no numéricos
        });
  
      g.append("path")
        .datum(monthlySalesArray)
        .attr("fill", "none")
        .attr("stroke", colors(product))
        .attr("stroke-width", 1.5)
        .attr("d", lineGenerator)
        .attr("class", "line");
    });
  
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m")));
  
    g.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 5})`)
      .style("text-anchor", "middle")
      .text("Fecha (Año-Mes)");
  
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).tickFormat(d3.format(".2s")));
  
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Ventas Totales Mensuales");
  
    // Leyenda
    products.forEach(product => {
      const legendItem = legendContainer.append("div")
        .attr("class", "legend-item");
  
      legendItem.append("span")
        .attr("class", "legend-color")
        .style("background-color", colors(product));
  
      legendItem.append("span")
        .text(product);
    });
  }
  
  getData();