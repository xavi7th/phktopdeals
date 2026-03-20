<script>
    import { createChart, destroyChart } from '$lib/utils/chartUtils.js';

    let { patterns = [] } = $props();
    let canvas;

    /** @type {Chart | null} */
    let chartInstance = null;

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    $effect(() => {
        if (!canvas) return;

        destroyChart(chartInstance);

        chartInstance = createChart(canvas, 'bar', {
            labels: patterns.map((p) => p.pattern_type || 'unknown'),
            datasets: [
                {
                    label: 'Cost (USD)',
                    data: patterns.map((p) => Number(p.total_cost)),
                    backgroundColor: patterns.map((_, i) => colors[i % colors.length]),
                },
            ],
            options: {
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true, ticks: { callback: (v) => '$' + v } },
                },
            },
        });

        return () => destroyChart(chartInstance);
    });
</script>

<div class="h-48">
    <canvas bind:this={canvas}></canvas>
</div>
