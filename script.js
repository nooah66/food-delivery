const dishes = [
  { id: 'beef-ragu', name: 'Sunday Beef Ragu', category: 'beef', tag: 'Slow-cooked favorite', price: 18, time: '8-hour slow cook', description: 'Fork-tender beef, silky tomato sauce, fresh pappardelle, a little parmesan.', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85', alt: 'Fresh pappardelle pasta with a rich slow-cooked sauce' },
  { id: 'pot-roast', name: 'Cozy Pot Roast', category: 'beef', tag: 'Comfort in a bowl', price: 19, time: 'Low & slow', description: 'Tender beef, buttery potatoes, sweet carrots, and rich Sunday-style gravy.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', alt: 'A hearty, colorful bowl of fresh comfort food' },
  { id: 'herb-chicken', name: 'Herby Roast Chicken', category: 'chicken', tag: 'A fresh classic', price: 17, time: 'Roasted fresh', description: 'Golden chicken, garden herbs, lemony greens, and crispy little potatoes.', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85', alt: 'Golden roast chicken served with fresh herbs and vegetables' },
  { id: 'chicken-bowl', name: 'Green Garden Bowl', category: 'chicken', tag: 'Bright & nourishing', price: 16, time: 'Made to order', description: 'Herb chicken, greens, crunchy cucumber, grains, and our tangy house dressing.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85', alt: 'Fresh green salad bowl with vegetables and grains' },
  { id: 'mushroom-stew', name: 'Wild Mushroom Stew', category: 'plant', tag: 'Plant-based goodness', price: 16, time: 'Gently simmered', description: 'Earthy mushrooms, butter beans, garden thyme, and toasted sourdough.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', alt: 'A nourishing bowl of vegetables and grains' },
  { id: 'market-bowl', name: 'Market Day Bowl', category: 'plant', tag: 'Straight from the garden', price: 15, time: 'Made to order', description: 'Seasonal vegetables, fluffy grains, greens, and a bright lemon tahini.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85', alt: 'A vibrant bowl of fresh seasonal vegetables' }
];

const grid = document.querySelector('#menu-grid');
const cartCount = document.querySelector('.cart-count');
const toast = document.querySelector('.toast');
let cart = 0;
let toastTimer;

function renderDishes(category = 'all') {
  const shown = category === 'all' ? dishes : dishes.filter((dish) => dish.category === category);
  grid.innerHTML = shown.map((dish) => `
    <article class="dish-card">
      <div class="dish-image-wrap"><img class="dish-image" src="${dish.image}" alt="${dish.alt}" loading="lazy" /><span class="dish-tag">${dish.tag}</span></div>
      <div class="dish-content">
        <div class="dish-title-row"><h3>${dish.name}</h3><span class="dish-price">$${dish.price}</span></div>
        <p class="dish-description">${dish.description}</p>
        <div class="dish-meta"><span class="dish-time"><span>✳</span>${dish.time}</span><button class="add-button" type="button" data-add="${dish.id}" aria-label="Add ${dish.name} to bag">+ Add to bag</button></div>
      </div>
    </article>`).join('');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

document.querySelector('.category-tabs').addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  document.querySelectorAll('.category-tab').forEach((tab) => tab.classList.remove('active'));
  button.classList.add('active');
  renderDishes(button.dataset.category);
});

grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const dish = dishes.find((item) => item.id === button.dataset.add);
  cart += 1;
  cartCount.textContent = cart;
  cartCount.setAttribute('aria-label', `${cart} items in bag`);
  showToast(`${dish.name} added to your bag`);
});

document.querySelector('.cart-button').addEventListener('click', () => {
  showToast(cart ? `Your bag has ${cart} ${cart === 1 ? 'delicious dish' : 'delicious dishes'} in it.` : 'Your bag is waiting for something delicious.');
});

document.querySelector('.location-button').addEventListener('click', () => {
  const location = window.prompt('Where should we deliver your good food?');
  if (location && location.trim()) {
    document.querySelector('.location-button').innerHTML = `<span>⌖</span> Delivering to <strong>${location.trim().replace(/[<>]/g, '')}</strong>`;
    showToast(`We'll deliver to ${location.trim().replace(/[<>]/g, '')}`);
  }
});

const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
  const nav = document.querySelector('.main-nav');
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  document.querySelector('.main-nav').classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();
renderDishes();
