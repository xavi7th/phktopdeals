import { writable } from 'svelte/store';

export const pageTitle = writable(
    {
        appName: 'phktopdeals',
        title: 'phktopdeals'
    }
);