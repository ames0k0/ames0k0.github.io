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

/**
 * Hides hidden writeups tags
 *
 * @param {Set[str]} activeTags
 */
function hideTags(activeTags) {
	const tagButtons = tagCloud.querySelectorAll('button');
	tagButtons.forEach(tag => {
		if (!activeTags || activeTags.has(tag.innerText)) {
			tag.style.display = '';
		} else {
			tag.style.display = 'none';
		}
	});
}

// Main filter function
function filterWriteups() {
	// Get selected values from dropdowns
	const clientValue = clientFilter.value;

	// Get all selected tags from tag cloud
	const selectedTagButtons = tagCloud.querySelectorAll('button.selected');
	const selectedTags = Array.from(selectedTagButtons).map(btn => btn.textContent);
	const writeupTags = new Set();

	writeups.forEach(writeup => {
		const tags = writeup.getAttribute('data-tags').split(',').map(t => t.trim());

		// Check dropdown filters
		const hasClient = clientValue === 'ANY' ||
			clientValue === writeup.getAttribute('data-filter');

		// Check if write-up matches ALL selected tags
		const matchesAllSelectedTags = selectedTags.length === 0 ||
			selectedTags.every(tag => tags.includes(tag));

		// Show only if it passes both dropdown AND tag filters
		if (hasClient && matchesAllSelectedTags) {
			writeup.style.display = '';
			tags.forEach(tag => writeupTags.add(tag));
		} else {
			writeup.style.display = 'none';
		}
	});

	hideTags(writeupTags);
}

// Attach event listeners to dropdowns
clientFilter.addEventListener('change', filterWriteups);

// Initial load
filterWriteups();
