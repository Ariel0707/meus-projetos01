// Base de dados com os produtos da sua imagem
const PRODUCTS = [
    { id: 1, name: "The Macallan 12", cat: "Single Malt", price: 690, img: "macallan_12.png" },
    { id: 2, name: "Blue Label", cat: "Blended", price: 1100, img: "blue_label.png" },
    { id: 3, name: "Th Mallan 12", cat: "Single Malt", price: 900, img: "mallan_12.png" },
    { id: 4, name: "Lagavelan 16", cat: "Single Malt", price: 950, img: "lagavulin_16.png" },
    { id: 5, name: "Old & Rare", cat: "Single Malt", price: 750, img: "old_rare.png" },
    { id: 6, name: "Chiliivs Regail", cat: "Blended", price: 250, img: "chivas.png" }
];

const App = {
    cart: JSON.parse(localStorage.getItem('hr_cart')) || [],
    currentFilter: 'Todes',

    init() {
        this.render(PRODUCTS);
        this.updateUI();
    },

    // COLOQUE SUAS IMAGENS NA PASTA 'img/' E ATUALIZE OS NOMES ACIMA
    render(data) {
        const grid = document.getElementById('product-grid');
        const filtered = this.currentFilter === 'Todes' 
            ? data 
            : data.filter(p => p.cat === this.currentFilter);

        grid.innerHTML = filtered.map(p => `
            <div class="product-card">
                <img src="img/${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com{p.name}'">
                <h3>${p.name}</h3>
                <small>${p.cat}</small>
                <div class="price">R$ ${p.price.toFixed(2)}</div>
                <button onclick="App.addToCart(${p.id})" class="btn-add">ADICIONAR</button>
            </div>
        `).join('');
    },

    addToCart(id) {
        const p = PRODUCTS.find(x => x.id === id);
        this.cart.push({ ...p, uid: Date.now() });
        this.save();
    },

    save() {
        localStorage.setItem('hr_cart', JSON.stringify(this.cart));
        this.updateUI();
    },

    updateUI() {
        document.getElementById('cart-counter').innerText = this.cart.length;
        const total = this.cart.reduce((sum, i) => sum + i.price, 0);
        document.getElementById('grand-total').innerText = `R$ ${total.toLocaleString('pt-BR')}`;
        
        const list = document.getElementById('cart-items');
        list.innerHTML = this.cart.map(i => `
            <div class="cart-item">
                <span>${i.name}</span>
                <button onclick="App.remove(${i.uid})">&times;</button>
            </div>
        `).join('');
    },

    remove(uid) {
        this.cart = this.cart.filter(i => i.uid !== uid);
        this.save();
    },

    filter(cat, btn) {
        this.currentFilter = cat;
        document.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.render(PRODUCTS);
    }
};

const UI = {
    toggleCart: () => document.getElementById('side-cart').classList.toggle('active')
};

App.init();
