// ==UserScript==
// @name         ReaderView
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Allows you to view the text while answering questions on Sparx Reader.
// @author       YourName
// @match        *://app.sparxreader.com*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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

    setInterval(viewSparxReader, 200);
})();
