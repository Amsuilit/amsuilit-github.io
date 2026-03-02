// js/themes.js
(function() {
    'use strict';

    // MASTER LIST OF THEMES
    // To add a new theme, add it here and in themes.css!
    window.THEME_CONFIG = {
        light:        { name: 'Light',         bg: '#ffffff', fg: '#000000' },
        dark:         { name: 'Dark',          bg: '#1a1a1a', fg: '#e0e0e0' },
        sepia:        { name: 'Sepia',         bg: '#f4ecd8', fg: '#5c4a3a' },
        forest:       { name: 'Forest',        bg: '#2c3e2c', fg: '#d0d9c0' },
        ocean:        { name: 'Ocean',         bg: '#003366', fg: '#cce6ff' },
        highcontrast: { name: 'High Contrast', bg: '#000000', fg: '#ffff00' },
        vintage:      { name: 'Vintage',       bg: '#f2e6d8', fg: '#4f3a2b' },
        monochrome:   { name: 'Monochrome',    bg: '#eeeeee', fg: '#222222' }
    };

    window.setTheme = function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        document.querySelectorAll('.theme-btn').forEach(btn => {
            const btnTheme = btn.getAttribute('data-theme');
            btn.classList.toggle('active', btnTheme === theme);
        });

        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    };

    window.loadTheme = function() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    };

    // New function: Automagically creates buttons inside a given container
    window.generateThemeButtons = function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = ''; // Clear existing
        const savedTheme = localStorage.getItem('theme') || 'light';

        Object.keys(window.THEME_CONFIG).forEach(themeId => {
            const config = window.THEME_CONFIG[themeId];
            const btn = document.createElement('button');
            
            btn.className = `theme-btn ${themeId === savedTheme ? 'active' : ''}`;
            btn.setAttribute('data-theme', themeId);
            btn.textContent = config.name;
            btn.onclick = () => window.setTheme(themeId);
            
            container.appendChild(btn);
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        window.loadTheme();
        // Automatically inject buttons into the index page and reader page
        window.generateThemeButtons('theme-button-container'); 
    });
})();