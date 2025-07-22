(function () {
    'use strict';

    let autoRun = false;
    let intervalId = null;

    function viewSparxReader() {
        // Select the actual content container
        const contentDivs = document.querySelectorAll('.read-content');

        contentDivs.forEach(div => {
            // Remove any class starting with 'sr_' or '_ReadingContent' (or customize)
            div.classList.forEach(className => {
                if (className.startsWith('sr_') || className.startsWith('_ReadingContent')) {
                    div.classList.remove(className);
                }
            });

            // Force style overrides to ensure visibility
            div.style.display = 'block';
            div.style.visibility = 'visible';
            div.style.opacity = '1';
        });
    }

    function toggleAutoRun() {
        autoRun = !autoRun;
        const toggleBtn = document.getElementById('reader-toggle');
        toggleBtn.textContent = autoRun ? 'Auto Unhide: ON' : 'Auto Unhide: OFF';

        if (autoRun) {
            intervalId = setInterval(viewSparxReader, 200);
        } else {
            clearInterval(intervalId);
        }
    }

    function createUI() {
        const panel = document.createElement('div');
        panel.id = 'reader-panel';

        // Basic styling for usability
        panel.style.position = 'fixed';
        panel.style.top = '10px';
        panel.style.right = '10px';
        panel.style.background = 'white';
        panel.style.border = '1px solid #ccc';
        panel.style.padding = '10px';
        panel.style.zIndex = '99999';
        panel.style.fontFamily = 'Arial, sans-serif';
        panel.style.boxShadow = '0 0 8px rgba(0,0,0,0.2)';
        panel.style.borderRadius = '5px';

        panel.innerHTML = `
            <button id="reader-toggle">Auto Unhide: OFF</button>
            <button id="reader-run-once">Unhide Once</button>
            <br/><br/>
            <input type="text" id="reader-search" placeholder="Search text..." style="width: 200px;"/>
        `;

        document.body.appendChild(panel);

        document.getElementById('reader-toggle').addEventListener('click', toggleAutoRun);
        document.getElementById('reader-run-once').addEventListener('click', viewSparxReader);
        document.getElementById('reader-search').addEventListener('input', searchText);
    }

    function searchText(event) {
        const query = event.target.value.toLowerCase();
        const contentDivs = document.querySelectorAll('.read-content');

        contentDivs.forEach(div => {
            // Get raw text to reset highlights
            const originalText = div.textContent;

            if (!query) {
                // Reset to original plain text (loses formatting if any, but simplest)
                div.innerHTML = originalText;
                return;
            }

            // Escape special RegExp chars in query to avoid errors
            const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedQuery})`, 'gi');

            // Replace matching text with <mark> highlights
            div.innerHTML = originalText.replace(regex, '<mark>$1</mark>');
        });
    }

    // Run after slight delay to ensure page content loads
    setTimeout(() => {
        createUI();
    }, 1000);
})();
