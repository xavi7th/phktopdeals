<script>
    import { Chart, registerables } from 'chart.js';

    Chart.register(...registerables);

    let { timeline = [] } = $props();
    let canvas;

    /** @type {Chart | null} */
    let chartInstance = null;

    $effect(() => {
        if (!canvas) return;

        if (chartInstance) {
            chartInstance.destroy();
        }

        const sorted = [...timeline].sort((a, b) => a.date.localeCompare(b.date));

        chartInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels: sorted.map((d) => d.date),
                datasets: [
                    {
                        label: 'Daily Cost (USD)',
                        data: sorted.map((d) => Number(d.total_cost)),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.3,
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

<div class="h-64">
    <canvas bind:this={canvas}></canvas>
</div>
