// Load products from /content/products.json and render into #products-grid
async function loadProducts() {
  try {
    const res = await fetch('/content/products.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Nu pot încărca content/products.json');
    const data = await res.json();
    const list = Array.isArray(data.items) ? data.items : [];
    const grid = document.querySelector('#products-grid');
    if (!grid) return;
    grid.innerHTML = list.map(p => {
      const img = (p.images && p.images.length) ? p.images[0] : '/assets/placeholder.png';
      const price = (p.price !== undefined && p.price !== null) ? Number(p.price).toFixed(2) : '';
      const colors = (p.colors || []).map(c => c.color).filter(Boolean).join(', ');
      const sizes = (p.sizes || []).map(s => s.size).filter(Boolean).join(', ');
      return `
        <div class="product-card">
          <img class="product-img" src="${img}" alt="${p.title || ''}">
          <h3 class="product-title">${p.title || ''}</h3>
          ${price ? `<p class="price">${price} RON (TVA inclus)</p>` : ''}
          <p class="pack">Se vinde doar la set de 10 bucăți</p>
          ${colors ? `<p class="meta">Culori: ${colors}</p>` : ''}
          ${sizes ? `<p class="meta">Mărimi: ${sizes}</p>` : ''}
          ${p.description ? `<p class="desc">${p.description}</p>` : ''}
          <button class="btn-add">Adaugă în coș</button>
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error(e);
  }
}
document.addEventListener('DOMContentLoaded', loadProducts);
