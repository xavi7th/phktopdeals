<script>
    import { Chart, registerables } from 'chart.js';

    Chart.register(...registerables);

    let { providers = [] } = $props();
    let canvas;

    /** @type {Chart | null} */
    let chartInstance = null;

    const colors = { glm: '#3b82f6', minimax: '#10b981' };

    $effect(() => {
        if (!canvas) return;

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: providers.map((p) => p.provider),
                datasets: [
                    {
                        label: 'Cost (USD)',
                        data: providers.map((p) => Number(p.total_cost)),
                        backgroundColor: providers.map(
                            (p) => colors[p.provider] || '#6b7280'
                        ),
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { callback: (v) => '$' + v } },
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
