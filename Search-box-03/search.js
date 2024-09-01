(function () {
    // Store original text content for each searchable element
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
    elements.forEach(el => el.dataset.original = el.innerHTML); // Save original HTML content

    // Create and insert the search bar and button dynamically
    document.body.insertAdjacentHTML('afterbegin', `
        <div style="padding: 10px;">
            <input id="dynamicSearchBar" type="text" placeholder="Search..." style="padding: 8px; width: 300px; font-size: 16px;">
            <button id="dynamicSearchBtn" style="padding: 8px 12px; margin-left: 5px; cursor: pointer;">Search</button>
            <div id="searchResults" style="margin-top: 10px;"></div>
        </div>
    `);

    // Function to highlight all occurrences of the search term and display positions
    function highlightText() {
        const searchQuery = document.getElementById('dynamicSearchBar').value.trim();
        const resultDiv = document.getElementById('searchResults');
        resultDiv.innerHTML = ''; // Clear previous results
        if (!searchQuery) return;

        let totalMatches = 0;
        elements.forEach((element, index) => {
            // Restore original HTML content
            element.innerHTML = element.dataset.original;

            const regex = new RegExp(searchQuery, 'gi'); // Global and case-insensitive search
            let match;
            const positions = [];
            let elementHTML = element.innerHTML;
            let matchCount = 0;

            // Create a container to hold individual match spans with unique IDs
            elementHTML = elementHTML.replace(regex, (match) => {
                const matchId = `match-${index}-${matchCount}`; // Unique ID for each match
                if (totalMatches < 10) {
                    positions.push(matchId); // Store the ID instead of the index
                    matchCount++;
                    totalMatches++;
                }
                return totalMatches <= 10 ? `<span id="${matchId}" class="highlight">${match}</span>` : match;
            });
            element.innerHTML = elementHTML;

            // If positions were found, display them
            if (positions.length > 0) {
                const resultItem = document.createElement('div');
                resultItem.innerHTML = `Element: <strong>${element.tagName}</strong>, Matches: ${positions.length}, Positions: ${positions.map(id => `<a href="#${id}" class="scroll-link">${id}</a>`).join(', ')}`;
                resultDiv.appendChild(resultItem);
            }

            // Stop the search after 10 matches
            if (totalMatches >= 10) return;
        });

        if (totalMatches === 0) {
            resultDiv.innerHTML = '<p>No matches found.</p>';
        }

        // Add event listener for clickable links to scroll to the position and highlight clicked match
        document.querySelectorAll('.scroll-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor behavior
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                // Remove the previous active highlight if exists
                document.querySelectorAll('.active-highlight').forEach(el => el.classList.remove('active-highlight'));

                // Scroll to the match and apply a different highlight
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetElement.classList.add('active-highlight');
            });
        });
    }

    // Attach event listener to the search button
    document.getElementById('dynamicSearchBtn').addEventListener('click', highlightText);
})();
