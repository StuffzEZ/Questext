(function () {
    'use strict';

    let autoRun = false;
    let intervalId = null;

    function viewSparxReader() {
        const contentDivs = document.querySelectorAll('.content');

        contentDivs.forEach(div => {
            div.classList.forEach(className => {
                if (className.startsWith('_ReadingContent')) {
                    div.classList.remove(className);
                }
            });
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

        panel.innerHTML = `
            <button id="reader-toggle">Auto Unhide: OFF</button>
            <button id="reader-run-once">Unhide Once</button>
            <input type="text" id="reader-search" placeholder="Search text..."/>
        `;

        document.body.appendChild(panel);

        document.getElementById('reader-toggle').addEventListener('click', toggleAutoRun);
        document.getElementById('reader-run-once').addEventListener('click', viewSparxReader);
        document.getElementById('reader-search').addEventListener('input', searchText);
    }

    function searchText(event) {
        const query = event.target.value.toLowerCase();
        const matches = document.querySelectorAll('.content');

        matches.forEach(div => {
            div.innerHTML = div.textContent; // Reset text
            if (query && div.textContent.toLowerCase().includes(query)) {
                const regex = new RegExp(`(${query})`, 'gi');
                div.innerHTML = div.textContent.replace(regex, '<mark>$1</mark>');
            }
        });
    }

    // Run after slight delay to ensure page content loads
    setTimeout(() => {
        createUI();
    }, 1000);
})();


// sorry i wrote it with ai i had a headache at the time of writing
