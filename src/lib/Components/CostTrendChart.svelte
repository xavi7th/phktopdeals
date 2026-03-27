<script>
  import { createChart, destroyChart } from "$lib/utils/chartUtils.js";

  let { timeline = [] } = $props();
  let canvas;

  /** @type {Chart | null} */
  let chartInstance = null;

  $effect(() => {
    if (!canvas) return;

    destroyChart(chartInstance);

    const sorted = [...timeline].sort((a, b) => a.date.localeCompare(b.date));

    chartInstance = createChart(canvas, "line", {
      labels: sorted.map((d) => d.date),
      datasets: [
        {
          label: "Daily Cost (USD)",
          data: sorted.map((d) => Number(d.total_cost)),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.3,
        },
      ],
      options: {
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => "$" + v } },
        },
      },
    });

    return () => destroyChart(chartInstance);
  });
</script>

<div class="h-64">
  <canvas bind:this={canvas}></canvas>
</div>
