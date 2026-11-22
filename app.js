/**
 * ALTO CONCEITO - LOJA VIRTUAL DO CLIENTE (STOREFRONT)
 * Inspirado na marca @alto_conceit0
 */

// Chaves do LocalStorage
const STORAGE_PRODUCTS = 'alto_conceito_produtos';
const STORAGE_CONFIG = 'alto_conceito_config';
const STORAGE_CART = 'alto_conceito_carrinho';

// Catálogo Inicial Padrão
const DEFAULT_PRODUCTS = [
    {
        id: 'prod_1',
        name: 'Camiseta Oversized Minimal Black',
        category: 'camisetas',
        price: 139.90,
        promoPrice: 119.90,
        sizes: ['P', 'M', 'G', 'GG'],
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        badge: 'Lançamento',
        description: 'Camiseta gola alta canelada 3cm, tecido 100% algodão penteado 240g de alta gramatura. Caimento streetwear impecável.',
        inStock: true
    },
    {
        id: 'prod_2',
        name: 'Camisa Social Slim Alfaiataria Preta',
        category: 'camisas',
        price: 189.90,
        promoPrice: null,
        sizes: ['M', 'G', 'GG'],
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
        badge: 'Destaque',
        description: 'Traje de presença marcante. Tecido com toque acetinado e elastano para máximo conforto e elegância em eventos noturnos.',
        inStock: true
    },
    {
        id: 'prod_3',
        name: 'Calça Alfaiataria Street Chumbo',
        category: 'calcas',
        price: 229.90,
        promoPrice: 199.90,
        sizes: ['38', '40', '42', '44'],
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
        badge: 'Mais Vendido',
        description: 'Modelagem slim com barra italiana e corte moderno. Combina tanto com tênis casual quanto sapato social.',
        inStock: true
    },
    {
        id: 'prod_4',
        name: 'Bermuda Cargo Sarja Streetwear Dark',
        category: 'bermudas',
        price: 159.90,
        promoPrice: 139.90,
        sizes: ['38', '40', '42', '44'],
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
        badge: 'Promoção',
        description: 'Bolsos utilitários laterais, cordão ajustável e acabamento reforçado. Ideal para compor visual urbano imponente.',
        inStock: true
    },
    {
        id: 'prod_5',
        name: 'Jaqueta Puffer All Black Premium',
        category: 'jaquetas',
        price: 349.90,
        promoPrice: 299.90,
        sizes: ['P', 'M', 'G', 'GG'],
        image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
        badge: 'Lançamento',
        description: 'Isolamento térmico leve, zíperes reforçados em metal preto fosco e gola alta. O ápice do estilo para dias frios.',
        inStock: true
    },
    {
        id: 'prod_6',
        name: 'Camiseta Boxy Off-White Conceito',
        category: 'camisetas',
        price: 149.90,
        promoPrice: null,
        sizes: ['P', 'M', 'G', 'GG'],
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
        badge: null,
        description: 'Corte quadrado boxy, caimento solto e estampa minimalista centralizada nas costas. Estilo autêntico.',
        inStock: true
    },
    {
        id: 'prod_7',
        name: 'Camisa Manga Curta Linho Bege',
        category: 'camisas',
        price: 179.90,
        promoPrice: 159.90,
        sizes: ['M', 'G', 'GG'],
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
        badge: 'Destaque',
        description: 'Tecido nobre de linho misto com respirabilidade superior. Botões amadeirados e caimento refinado.',
        inStock: true
    },
    {
        id: 'prod_8',
        name: 'Corrente Veneziana Prata 925 + Pingente',
        category: 'acessorios',
        price: 99.90,
        promoPrice: 79.90,
        sizes: ['Único (60cm)'],
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
        badge: null,
        description: 'Acessório chave para elevar qualquer visual básico. Brilho sofisticado e fecho resistente.',
        inStock: true
    }
];

const DEFAULT_CONFIG = {
    storeName: 'ALTO CONCEITO',
    storeSubtitle: 'ROUPAS MASCULINAS',
    slogan: 'MAIS QUE ROUPAS. ESTILO DE VIDA',
    announcement: '📦 ENVIAMOS P/ TODO O BRASIL • 🚀 LANÇAMENTOS TODA SEMANA • 🏅 MELHORES TRAJES, PELO MELHOR PREÇO',
    whatsapp: '5518996387204',
    instagram: 'alto_conceit0',
    telegram: 'alto_conceito',
    heroBadge: 'NOVA COLEÇÃO 2026',
    heroTitle: 'TRAJES & MODA MASCULINA DE ALTO NÍVEL',
    heroSubtitle: 'Peças exclusivas selecionadas para quem não aceita o comum. Vista poder, elegância e autenticidade todos os dias.',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80'
};

// Estado da Aplicação
let products = [];
let config = {};
let cart = [];
let currentCategory = 'todos';
let searchQuery = '';
let currentSort = 'novos';
let selectedSizes = {}; // { [productId]: size }

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderConfig();
    renderProducts();
    updateCartUI();
    setupEventListeners();
});

function loadState() {
    try {
        const savedProds = localStorage.getItem(STORAGE_PRODUCTS);
        products = savedProds ? JSON.parse(savedProds) : [...DEFAULT_PRODUCTS];
    } catch (e) {
        products = [...DEFAULT_PRODUCTS];
    }

    try {
        const savedConfig = localStorage.getItem(STORAGE_CONFIG);
        config = savedCfg = savedConfig ? { ...DEFAULT_CONFIG, ...JSON.parse(savedConfig) } : { ...DEFAULT_CONFIG };
    } catch (e) {
        config = { ...DEFAULT_CONFIG };
    }

    try {
        const savedCart = localStorage.getItem(STORAGE_CART);
        cart = savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
        cart = [];
    }
}

function saveCart() {
    localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
}

// ==========================================
// RENDERIZAÇÃO DA LOJA
// ==========================================
function renderConfig() {
    const annEl = document.getElementById('tickerText');
    if (annEl) annEl.innerText = config.announcement;

    document.querySelectorAll('.store-name-text').forEach(el => el.innerText = config.storeName);
    document.querySelectorAll('.store-slogan-text').forEach(el => el.innerText = config.slogan);

    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) heroTitle.innerText = config.heroTitle;

    const heroSub = document.getElementById('heroSubtitle');
    if (heroSub) heroSub.innerText = config.heroSubtitle;

    const heroBadge = document.getElementById('heroBadge');
    if (heroBadge) heroBadge.innerText = config.heroBadge;

    const heroBg = document.getElementById('heroSection');
    if (heroBg && config.heroImage) {
        heroBg.style.backgroundImage = `linear-gradient(to bottom, rgba(9,9,11,0.55), rgba(9,9,11,0.95)), url('${config.heroImage}')`;
    }

    const instaLink = document.getElementById('linkInstagram');
    if (instaLink) instaLink.href = `https://instagram.com/${config.instagram.replace('@', '')}`;

    const zapLink = document.getElementById('linkWhatsAppHeader');
    if (zapLink) zapLink.href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Olá! Vim pelo site da Alto Conceito!')}`;
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    if (!grid) return;

    let filtered = products.filter(p => {
        const matchCategory = currentCategory === 'todos' || p.category === currentCategory;
        const matchSearch = !searchQuery || 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (currentSort === 'menor') {
        filtered.sort((a, b) => (a.promoPrice || a.price) - (b.promoPrice || b.price));
    } else if (currentSort === 'maior') {
        filtered.sort((a, b) => (b.promoPrice || b.price) - (a.promoPrice || a.price));
    } else if (currentSort === 'alfabetico') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    grid.innerHTML = filtered.map(prod => {
        const currentPrice = prod.promoPrice || prod.price;
        const hasDiscount = prod.promoPrice && prod.promoPrice < prod.price;
        const selectedSize = selectedSizes[prod.id] || (prod.sizes && prod.sizes[0]) || 'Único';

        let badgeHtml = '';
        if (prod.badge) {
            let badgeBg = 'bg-white text-black';
            if (prod.badge === 'Lançamento') badgeBg = 'bg-white text-black font-extrabold';
            if (prod.badge === 'Promoção') badgeBg = 'bg-red-600 text-white';
            if (prod.badge === 'Destaque') badgeBg = 'bg-yellow-500 text-black font-bold';
            badgeHtml = `<span class="badge-tag ${badgeBg} shadow-lg">${prod.badge}</span>`;
        }

        const sizesHtml = prod.sizes && prod.sizes.length > 0 ? `
            <div class="flex items-center gap-1.5 flex-wrap my-2">
                <span class="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mr-1">Tam:</span>
                ${prod.sizes.map(s => `
                    <button type="button" 
                        onclick="selectSize('${prod.id}', '${s}')"
                        class="size-btn ${selectedSize === s ? 'selected' : ''}">
                        ${s}
                    </button>
                `).join('')}
            </div>
        ` : '';

        return `
            <div class="product-card flex flex-col justify-between group">
                <div class="relative">
                    <div class="product-image-container cursor-pointer" onclick="openProductDetail('${prod.id}')">
                        <img src="${prod.image}" alt="${prod.name}" class="product-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <span class="text-xs text-white font-medium flex items-center gap-1.5">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                Ver detalhes
                            </span>
                        </div>
                    </div>

                    <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        ${badgeHtml}
                        ${!prod.inStock ? '<span class="badge-tag bg-zinc-800 text-zinc-400 border border-zinc-700">Esgotado</span>' : ''}
                    </div>
                </div>

                <div class="p-4 flex flex-col flex-grow justify-between">
                    <div>
                        <span class="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">${prod.category}</span>
                        <h3 class="text-sm sm:text-base font-bold text-white mt-1 line-clamp-2 cursor-pointer hover:text-zinc-300 transition-colors" onclick="openProductDetail('${prod.id}')">
                            ${prod.name}
                        </h3>

                        ${sizesHtml}
                    </div>

                    <div class="pt-3 border-t border-white/5 flex items-center justify-between mt-2">
                        <div>
                            ${hasDiscount ? `
                                <div class="text-[11px] text-zinc-400 line-through">R$ ${prod.price.toFixed(2).replace('.', ',')}</div>
                            ` : ''}
                            <div class="text-base sm:text-lg font-extrabold text-white">
                                R$ ${currentPrice.toFixed(2).replace('.', ',')}
                            </div>
                        </div>

                        <button 
                            type="button"
                            ${!prod.inStock ? 'disabled' : ''}
                            onclick="addToCart('${prod.id}')"
                            class="p-2.5 rounded-xl ${prod.inStock ? 'bg-white text-black hover:bg-zinc-200 active:scale-95' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'} transition-all flex items-center gap-1.5 font-bold text-xs"
                            title="Adicionar à Sacola">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                            <span class="hidden sm:inline">Adicionar</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function selectSize(prodId, size) {
    selectedSizes[prodId] = size;
    renderProducts();
}

// ==========================================
// SACOLA / CARRINHO DE COMPRAS
// ==========================================
function addToCart(prodId) {
    const prod = products.find(p => p.id === prodId);
    if (!prod || !prod.inStock) return;

    const chosenSize = selectedSizes[prodId] || (prod.sizes && prod.sizes[0]) || 'Único';
    const existingIndex = cart.findIndex(item => item.id === prodId && item.size === chosenSize);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: prod.id,
            name: prod.name,
            category: prod.category,
            price: prod.promoPrice || prod.price,
            image: prod.image,
            size: chosenSize,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    openCart();
    showToast(`✓ "${prod.name}" adicionado à sacola!`);
}

function updateCartQuantity(index, delta) {
    if (!cart[index]) return;
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(index) {
    if (!cart[index]) return;
    const name = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showToast(`Removido: ${name}`);
}

function updateCartUI() {
    const countEl = document.getElementById('cartCountBadge');
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    if (countEl) {
        countEl.innerText = totalCount;
        countEl.classList.toggle('hidden', totalCount === 0);
    }

    const itemsContainer = document.getElementById('cartItemsList');
    const emptyCartMsg = document.getElementById('emptyCartMsg');
    const cartFooter = document.getElementById('cartFooter');
    const subtotalEl = document.getElementById('cartSubtotal');

    if (!itemsContainer) return;

    if (cart.length === 0) {
        itemsContainer.innerHTML = '';
        if (emptyCartMsg) emptyCartMsg.classList.remove('hidden');
        if (cartFooter) cartFooter.classList.add('hidden');
        return;
    }

    if (emptyCartMsg) emptyCartMsg.classList.add('hidden');
    if (cartFooter) cartFooter.classList.remove('hidden');

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (subtotalEl) subtotalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

    itemsContainer.innerHTML = cart.map((item, idx) => `
        <div class="flex items-center gap-3 p-3 bg-zinc-900/60 rounded-xl border border-white/5">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover bg-zinc-800 flex-shrink-0">
            <div class="flex-grow min-w-0">
                <h4 class="text-xs font-bold text-white truncate">${item.name}</h4>
                <div class="text-[11px] text-zinc-400 mt-0.5">Tam: <span class="font-bold text-white">${item.size}</span></div>
                <div class="text-xs font-bold text-white mt-1">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0">
                <button type="button" onclick="updateCartQuantity(${idx}, -1)" class="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold text-xs">-</button>
                <span class="w-6 text-center text-xs font-bold">${item.quantity}</span>
                <button type="button" onclick="updateCartQuantity(${idx}, 1)" class="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold text-xs">+</button>
                <button type="button" onclick="removeFromCart(${idx})" class="p-1 text-zinc-500 hover:text-red-400 ml-1" title="Remover item">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </div>
        </div>
    `).join('');
}

function openCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
        drawer.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
    }
}

function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (drawer && overlay) {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        showToast('Adicione produtos à sacola antes de finalizar!');
        return;
    }

    const clientName = (document.getElementById('cartClientName')?.value || '').trim();
    const clientAddress = (document.getElementById('cartClientAddress')?.value || '').trim();
    const deliveryType = document.querySelector('input[name="deliveryType"]:checked')?.value || 'Envio para todo Brasil';

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    let msg = `🛍️ *NOVO PEDIDO - ${config.storeName}* 🏅\n`;
    msg += `-------------------------------------------\n`;
    if (clientName) msg += `👤 *Cliente:* ${clientName}\n`;
    msg += `📦 *Modalidade:* ${deliveryType}\n`;
    if (clientAddress) msg += `📍 *Endereço / Cidade:* ${clientAddress}\n`;
    msg += `-------------------------------------------\n\n`;
    msg += `📋 *ITENS ESCOLHIDOS:*\n`;

    cart.forEach((item, i) => {
        msg += `${i + 1}. *${item.name}*\n`;
        msg += `   • Tamanho: *${item.size}* | Qtd: ${item.quantity}\n`;
        msg += `   • Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });

    msg += `💰 *VALOR TOTAL:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    msg += `-------------------------------------------\n`;
    msg += `Olá! Gostaria de confirmar a disponibilidade e combinar a forma de pagamento (PIX / Cartão)!`;

    const zapUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(zapUrl, '_blank');
}

// ==========================================
// MODAL DE DETALHES DO PRODUTO (QUICK VIEW)
// ==========================================
function openProductDetail(prodId) {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;

    const modal = document.getElementById('productDetailModal');
    if (!modal) return;

    document.getElementById('detailImage').src = prod.image;
    document.getElementById('detailCategory').innerText = prod.category;
    document.getElementById('detailTitle').innerText = prod.name;
    document.getElementById('detailDescription').innerText = prod.description || 'Peça confeccionada com alto padrão de qualidade e acabamento impecável.';

    const currentPrice = prod.promoPrice || prod.price;
    document.getElementById('detailPrice').innerText = `R$ ${currentPrice.toFixed(2).replace('.', ',')}`;

    const oldPriceEl = document.getElementById('detailOldPrice');
    if (prod.promoPrice && prod.promoPrice < prod.price) {
        oldPriceEl.innerText = `R$ ${prod.price.toFixed(2).replace('.', ',')}`;
        oldPriceEl.classList.remove('hidden');
    } else {
        oldPriceEl.classList.add('hidden');
    }

    const sizesContainer = document.getElementById('detailSizes');
    const selectedSize = selectedSizes[prod.id] || (prod.sizes && prod.sizes[0]) || 'Único';
    sizesContainer.innerHTML = prod.sizes && prod.sizes.length > 0 ? prod.sizes.map(s => `
        <button type="button" 
            onclick="selectSize('${prod.id}', '${s}'); openProductDetail('${prod.id}');"
            class="size-btn ${selectedSize === s ? 'selected' : ''}">
            ${s}
        </button>
    `).join('') : '<span class="text-xs text-zinc-400">Tamanho Único</span>';

    const addBtn = document.getElementById('detailAddBtn');
    addBtn.onclick = () => {
        addToCart(prod.id);
        closeProductDetail();
    };

    modal.classList.remove('hidden');
}

function closeProductDetail() {
    const modal = document.getElementById('productDetailModal');
    if (modal) modal.classList.add('hidden');
}

// ==========================================
// EVENT LISTENERS E UTILITÁRIOS
// ==========================================
function setupEventListeners() {
    document.querySelectorAll('.cat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.cat-pill').forEach(p => {
                p.classList.remove('bg-white', 'text-black', 'border-white');
                p.classList.add('bg-zinc-900', 'text-zinc-300', 'border-zinc-800');
            });
            pill.classList.remove('bg-zinc-900', 'text-zinc-300', 'border-zinc-800');
            pill.classList.add('bg-white', 'text-black', 'border-white');

            currentCategory = pill.dataset.category;
            renderProducts();
        });
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderProducts();
        });
    }

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }
}

// Toast Notificação
let toastTimeout = null;
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.innerText = message;
    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }, 2800);
}
