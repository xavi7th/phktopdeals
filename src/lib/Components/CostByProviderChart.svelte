<script>
  import { createChart, destroyChart } from "$lib/utils/chartUtils.js";

  let { providers = [] } = $props();
  let canvas;

  /** @type {Chart | null} */
  let chartInstance = null;

  const colors = { glm: "#3b82f6", minimax: "#10b981" };

  $effect(() => {
    if (!canvas) return;

    destroyChart(chartInstance);

    chartInstance = createChart(canvas, "bar", {
      labels: providers.map((p) => p.provider),
      datasets: [
        {
          label: "Cost (USD)",
          data: providers.map((p) => Number(p.total_cost)),
          backgroundColor: providers.map((p) => colors[p.provider] || "#6b7280"),
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

<div class="h-48">
  <canvas bind:this={canvas}></canvas>
</div>
