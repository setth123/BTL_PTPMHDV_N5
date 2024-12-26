import React, { useRef, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";

const ChartComponent = ({ data, labels, backgroundColor, title, type }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data.length || !labels.length) {
      return;
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: backgroundColor,
          borderColor: 'rgb(183, 77, 100)',
          borderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 12,
          barThickness: 50,
        },
      ],
    };
    const chartType = type === "horizon" ? "bar" : type;

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          categoryPercentage: 0.8,
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: false,
          },
        },
      },
      ...(chartType === "bar" && type === "horizon" && { indexAxis: "y" }),
    };

    const chartInstance = new ChartJS(chartRef.current, {
      type: chartType,
      data: chartData,
      options: options,
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data, labels, backgroundColor, title, type]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', width: '1000px', overflowX: 'auto' }}>
      <canvas ref={chartRef} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 1)' }} />
    </div>
  );
};

export default ChartComponent;
