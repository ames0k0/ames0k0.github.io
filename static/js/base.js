// DOM elements
const clientFilter = document.getElementById('client-filter');

const writeups = document.querySelectorAll('.writeup');
const tagCloud = document.getElementById('tag-cloud');

// Collect all unique tags from write-ups
const allTags = new Set();
writeups.forEach(item => {
	const tags = item.getAttribute('data-tags').split(',').map(t => t.trim());
	tags.forEach(tag => allTags.add(tag));
});

// Create tag buttons
allTags.forEach(tag => {
	const btn = document.createElement('button');
	btn.textContent = tag;
	btn.addEventListener('click', () => {
		btn.classList.toggle('selected');
		filterWriteups(); // Re-filter on every click
	});
	tagCloud.appendChild(btn);
});

// Main filter function
function filterWriteups() {
	// Get selected values from dropdowns
	const clientValue = clientFilter.value;

	// Get all selected tags from tag cloud
	const selectedTagButtons = tagCloud.querySelectorAll('button.selected');
	const selectedTags = Array.from(selectedTagButtons).map(btn => btn.textContent);

	writeups.forEach(writeup => {
		const tags = writeup.getAttribute('data-tags').split(',').map(t => t.trim());

		// Check dropdown filters
		const hasClient = clientValue === 'ANY' || tags.includes(clientValue);

		// Check if write-up matches ALL selected tags
		const matchesAllSelectedTags = selectedTags.length === 0 ||
			selectedTags.every(tag => tags.includes(tag));

		// Show only if it passes both dropdown AND tag filters
		if (hasClient && matchesAllSelectedTags) {
			writeup.style.display = '';
		} else {
			writeup.style.display = 'none';
		}
	});
}

// Attach event listeners to dropdowns
clientFilter.addEventListener('change', filterWriteups);
apiGatewayFilter.addEventListener('change', filterWriteups);

// Initial load
filterWriteups();
