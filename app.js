const cardSection = document.getElementById('card-section');
const timeButtons = document.querySelectorAll('.list-item');

const getPreviousLabel = (timeframe) => {
	if (timeframe === 'daily') return 'Yesterday';
	if (timeframe === 'weekly') return 'Last Week';
	if (timeframe === 'monthly') return 'Last Month';
};

const loadCards = () => {
	fetch('/data.json')
		.then((response) => {
			if (!response.ok) throw new Error('Oops, something went wrong');
			return response.json();
		})
		.then((data) => {
			let currentTimeframe = 'weekly';
			renderCards(data, currentTimeframe);

			timeButtons.forEach((button) => {
				button.addEventListener('click', () => {
					timeButtons.forEach((btn) => btn.classList.remove('active'));
					button.classList.add('active');

					currentTimeframe = button.textContent.toLowerCase();
					renderCards(data, currentTimeframe);
				});
			});
		})
		.catch((error) => console.error(error));
};

const renderCards = (data, timeframe) => {
	cardSection.innerHTML = '';

	data.forEach((item) => {
		const { title, timeframes } = item;
		const { current, previous } = timeframes[timeframe];

		const card = document.createElement('div');
		card.classList.add('card');

		card.innerHTML = `
      <p class="card-title">${title}</p>
      <button class="card-dots" aria-label="More options">
        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
            fill="currentColor" fill-rule="evenodd"/>
        </svg>
      </button>
      <p class="card-time">${current}hrs</p>
      <p class="card-last">${getPreviousLabel(timeframe)} - ${previous}hrs</p>
    `;

		cardSection.appendChild(card);
	});
};

loadCards();
