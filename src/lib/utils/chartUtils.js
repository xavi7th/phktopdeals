import { Chart, registerables } from 'chart.js';

// Register Chart.js components once
Chart.register(...registerables);

/**
 * Default chart options for consistent styling
 */
export const getDefaultChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
});

/**
 * Format USD values for chart tooltips/labels
 */
export const formatCurrency = (value) => '$' + value;

/**
 * Create a chart instance with proper cleanup
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {string} type - Chart type (line, bar, etc.)
 * @param {object} data - Chart data
 * @param {object} options - Additional chart options
 * @returns {Chart} The chart instance
 */
export function createChart(canvas, type, data, options = {}) {
    const chart = new Chart(canvas, {
        type,
        data,
        options: { ...getDefaultChartOptions(), ...options },
    });

    return chart;
}

/**
 * Destroy a chart instance if it exists
 * @param {Chart|null} chartInstance - The chart instance to destroy
 */
export function destroyChart(chartInstance) {
    if (chartInstance) {
        chartInstance.destroy();
    }
}
