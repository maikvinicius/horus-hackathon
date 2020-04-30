function reports(ctx, type, dataset, text = "Gráfico") {
  var values = [];
  var labels = [];
  $.each(dataset, function (key, value) {
    labels.push(key);
    values.push(value);
  });

  var data = {
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#3cba15",
          "#3c4a9f",
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#3cba15",
          "#3c4a9f",
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#3cba15",
          "#3c4a9f",
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels,
  };

  var options = {
    title: {
      display: true,
      text,
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  //Remove accent
  text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
  text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
  text = text.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
  text = text.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
  text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
  text = text.replace(new RegExp("[Ç]", "gi"), "c");
  eval(text + " = new Chart(ctx, {type,data,options,})");
}
