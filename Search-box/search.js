(function() {
    // Store original text content for each searchable element
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
    elements.forEach(el => el.dataset.original = el.innerHTML); // Save original HTML content

    // Create and insert the search bar and button dynamically
    document.body.insertAdjacentHTML('afterbegin', `
        <div style="padding: 10px;">
            <input id="dynamicSearchBar" type="text" placeholder="Search..." style="padding: 8px; width: 300px; font-size: 16px;">
            <button id="dynamicSearchBtn" style="padding: 8px 12px; margin-left: 5px; cursor: pointer;">Search</button>
        </div>
    `);

    // Function to highlight all occurrences of the search term
    function highlightText() {
        const searchQuery = document.getElementById('dynamicSearchBar').value.trim();
        if (!searchQuery) return;

        elements.forEach((element) => {
            // Restore original HTML content
            element.innerHTML = element.dataset.original;

            // Highlight search query in the restored content
            const regex = new RegExp(searchQuery, 'gi'); // Global and case-insensitive search
            element.innerHTML = element.innerHTML.replace(regex, (match) => `<span class="highlight">${match}</span>`);
        });
    }

    // Attach event listener to the search button
    document.getElementById('dynamicSearchBtn').addEventListener('click', highlightText);
})();
