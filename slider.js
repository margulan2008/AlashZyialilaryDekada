let currentIndex = 0;
const catalog = document.getElementById('catalog');
const items = Array.from(catalog.children);

function updateSlider() {
    items.forEach((item, i) => {
        item.classList.remove('active', 'left', 'right');
        item.style.display = 'none';
    });

   
    items[currentIndex].classList.add('active');
    items[currentIndex].style.display = 'block';

   
    if (currentIndex > 0) {
        items[currentIndex - 1].classList.add('left');
        items[currentIndex - 1].style.display = 'block';
    }
    
    if (currentIndex < items.length - 1) {
        items[currentIndex + 1].classList.add('right');
        items[currentIndex + 1].style.display = 'block';
    }
}

function moveSlider(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > items.length - 1) currentIndex = items.length - 1;
    updateSlider();
}

updateSlider();


const searchInput = document.getElementById('searchInput');
    const clearInput = document.getElementById('clearInput');
    if (searchInput && clearInput) {
        searchInput.addEventListener('input', function() {
            clearInput.style.display = this.value ? 'inline-block' : 'none';
        });
        clearInput.addEventListener('click', function() {
            searchInput.value = '';
            clearInput.style.display = 'none';
            searchInput.focus();
        });
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                
                const val = this.value.trim().toLowerCase();
                const cards = document.querySelectorAll('.book-card h3');
                for (const card of cards) {
                    if (card.textContent.toLowerCase().includes(val)) {
                        card.scrollIntoView({behavior:'smooth', block:'center'});
                        card.classList.add('highlight');
                        setTimeout(()=>card.classList.remove('highlight'),1200);
                        break;
                    }
                }
            }
        });
    }