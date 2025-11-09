// Spotlight Card Effect
// Vanilla JavaScript implementation

class SpotlightCard {
    constructor(element, options = {}) {
        this.element = element;
        this.spotlightColor = options.spotlightColor || 'rgba(102, 126, 234, 0.15)';
        console.log('SpotlightCard: Creating for element', element.className, 'with color', this.spotlightColor);
        this.init();
    }

    init() {
        // Add spotlight class if not present
        if (!this.element.classList.contains('card-spotlight')) {
            this.element.classList.add('card-spotlight');
            console.log('SpotlightCard: Added card-spotlight class to', this.element.className);
        }

        // Set initial spotlight color
        this.element.style.setProperty('--spotlight-color', this.spotlightColor);

        // Bind mouse move event
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.element.addEventListener('mousemove', this.handleMouseMove);
        console.log('SpotlightCard: Initialized for', this.element.className);
    }

    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.element.style.setProperty('--mouse-x', `${x}px`);
        this.element.style.setProperty('--mouse-y', `${y}px`);
    }

    destroy() {
        this.element.removeEventListener('mousemove', this.handleMouseMove);
    }
}

// Initialize all spotlight cards on page load
function initializeSpotlightCards() {
    console.log('SpotlightCard: Starting initialization...');
    
    // Add spotlight to project cards
    const projectCards = document.querySelectorAll('.project-card');
    console.log(`SpotlightCard: Found ${projectCards.length} project cards`);
    projectCards.forEach((card, index) => {
        // Add different spotlight colors based on status
        let spotlightColor = 'rgba(102, 126, 234, 0.15)'; // default violet
        
        if (card.dataset.status === 'deployed') {
            spotlightColor = 'rgba(16, 185, 129, 0.2)'; // green
        } else if (card.dataset.status === 'development') {
            spotlightColor = 'rgba(14, 165, 233, 0.2)'; // cyan
        } else if (card.dataset.status === 'draft') {
            spotlightColor = 'rgba(250, 204, 21, 0.15)'; // gold
        }
        
        new SpotlightCard(card, { spotlightColor });
    });

    // Add spotlight to widget cards
    const widgets = document.querySelectorAll('.widget');
    console.log(`SpotlightCard: Found ${widgets.length} widget cards`);
    widgets.forEach(widget => {
        new SpotlightCard(widget, { spotlightColor: 'rgba(102, 126, 234, 0.1)' });
    });

    // Add spotlight to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    console.log(`SpotlightCard: Found ${statCards.length} stat cards`);
    statCards.forEach(card => {
        new SpotlightCard(card, { spotlightColor: 'rgba(124, 58, 237, 0.15)' });
    });

    // Add spotlight to API items
    const apiItems = document.querySelectorAll('.api-item');
    console.log(`SpotlightCard: Found ${apiItems.length} API items`);
    apiItems.forEach(item => {
        new SpotlightCard(item, { spotlightColor: 'rgba(59, 130, 246, 0.15)' });
    });

    // Add spotlight to model cards
    const modelCards = document.querySelectorAll('.model-card');
    console.log(`SpotlightCard: Found ${modelCards.length} model cards`);
    modelCards.forEach(card => {
        new SpotlightCard(card, { spotlightColor: 'rgba(236, 72, 153, 0.15)' });
    });

    // Add spotlight to progress cards
    const progressCards = document.querySelectorAll('.progress-card');
    console.log(`SpotlightCard: Found ${progressCards.length} progress cards`);
    progressCards.forEach(card => {
        new SpotlightCard(card, { spotlightColor: 'rgba(14, 165, 233, 0.15)' });
    });

    // Add spotlight to stat-card-simple
    const statCardsSimple = document.querySelectorAll('.stat-card-simple');
    console.log(`SpotlightCard: Found ${statCardsSimple.length} simple stat cards`);
    statCardsSimple.forEach(card => {
        new SpotlightCard(card, { spotlightColor: 'rgba(124, 58, 237, 0.12)' });
    });
    
    console.log('SpotlightCard: Initialization complete!');
}

// Export for global use
window.SpotlightCard = SpotlightCard;
window.initializeSpotlightCards = initializeSpotlightCards;
