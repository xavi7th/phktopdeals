<script>
    import { Chart, registerables } from 'chart.js';

    Chart.register(...registerables);

    let { patterns = [] } = $props();
    let canvas;

    /** @type {Chart | null} */
    let chartInstance = null;

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    $effect(() => {
        if (!canvas) return;

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: patterns.map((p) => p.pattern_type || 'unknown'),
                datasets: [
                    {
                        label: 'Cost (USD)',
                        data: patterns.map((p) => Number(p.total_cost)),
                        backgroundColor: patterns.map((_, i) => colors[i % colors.length]),
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, ticks: { callback: (v) => '$' + v } },
                },
            },
        });

        return () => {
            if (chartInstance) chartInstance.destroy();
        };
    });
</script>

<div class="h-48">
    <canvas bind:this={canvas}></canvas>
</div>
