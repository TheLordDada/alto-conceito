/**
 * ALTO CONCEITO - SCRIPT DO PAINEL DO LOJISTA (ADMIN)
 * Acesso exclusivo: joaoguilherme11jg10@gmail.com
 */

// Chaves do LocalStorage
const STORAGE_PRODUCTS = 'alto_conceito_produtos';
const STORAGE_CONFIG = 'alto_conceito_config';
const STORAGE_SESSION = 'alto_conceito_session_admin';

// Credenciais Autorizadas
const AUTH_EMAIL = 'joaoguilherme11jg10@gmail.com';
const AUTH_PASS = 'J11ao20gui10';

// Catálogo Padrão de Recuperação
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

// Estado
let products = [];
let config = {};
let filterSearch = '';

document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    setupAdminListeners();
});

// ==========================================
// AUTENTICAÇÃO
// ==========================================
function checkSession() {
    const hasSession = localStorage.getItem(STORAGE_SESSION);
    if (hasSession === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');

    loadData();
    updateMetrics();
    renderProductsTable();
    populateConfigForm();
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const pass = document.getElementById('loginPassword').value.trim();
    const remember = document.getElementById('rememberLogin').checked;

    if (email === AUTH_EMAIL.toLowerCase() && pass === AUTH_PASS) {
        if (remember) {
            localStorage.setItem(STORAGE_SESSION, 'true');
        } else {
            sessionStorage.setItem(STORAGE_SESSION, 'true');
        }
        showToast('✓ Bem-vindo ao painel, João Guilherme!');
        showDashboard();
    } else {
        alert('E-mail ou senha incorretos! Verifique os dados digitados.');
    }
}

function handleLogout() {
    if (confirm('Deseja realmente sair do painel do lojista?')) {
        localStorage.removeItem(STORAGE_SESSION);
        sessionStorage.removeItem(STORAGE_SESSION);
        showToast('Sessão encerrada com sucesso.');
        showLogin();
    }
}

// ==========================================
// CARREGAR E SALVAR DADOS
// ==========================================
function loadData() {
    try {
        const savedProds = localStorage.getItem(STORAGE_PRODUCTS);
        products = savedProds ? JSON.parse(savedProds) : [...DEFAULT_PRODUCTS];
    } catch (e) {
        products = [...DEFAULT_PRODUCTS];
    }

    try {
        const savedCfg = localStorage.getItem(STORAGE_CONFIG);
        config = savedCfg ? { ...DEFAULT_CONFIG, ...JSON.parse(savedCfg) } : { ...DEFAULT_CONFIG };
    } catch (e) {
        config = { ...DEFAULT_CONFIG };
    }
}

function saveProducts() {
    localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(products));
    updateMetrics();
}

function saveConfig() {
    localStorage.setItem(STORAGE_CONFIG, JSON.stringify(config));
    updateMetrics();
}

function updateMetrics() {
    document.getElementById('metricTotalProducts').innerText = products.length;
    document.getElementById('metricInStock').innerText = products.filter(p => p.inStock).length;
    
    const uniqueCats = new Set(products.map(p => p.category));
    document.getElementById('metricCategories').innerText = uniqueCats.size || 6;

    const formattedZap = config.whatsapp ? `+${config.whatsapp.slice(0,2)} (${config.whatsapp.slice(2,4)}) ${config.whatsapp.slice(4)}` : '(18) 99638-7204';
    document.getElementById('metricWhatsApp').innerText = formattedZap;
}

// ==========================================
// RENDERIZAR TABELA DE ROUPAS
// ==========================================
function renderProductsTable() {
    const tbody = document.getElementById('adminProductsTbody');
    if (!tbody) return;

    let filtered = products;
    if (filterSearch) {
        filtered = products.filter(p => 
            p.name.toLowerCase().includes(filterSearch.toLowerCase()) || 
            p.category.toLowerCase().includes(filterSearch.toLowerCase())
        );
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="py-8 text-center text-xs text-zinc-500">
                    Nenhuma peça encontrada. Clique em "+ Nova Roupa" para adicionar.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(prod => `
        <tr class="hover:bg-zinc-900/60 transition-colors">
            <td class="py-3 px-4">
                <img src="${prod.image}" class="w-12 h-14 object-cover rounded-xl bg-zinc-800 shadow" onerror="this.src='https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=100&q=80'">
            </td>
            <td class="py-3 px-4">
                <div class="font-bold text-white text-xs sm:text-sm">${prod.name}</div>
                <div class="text-[11px] text-zinc-400 mt-0.5">${(prod.sizes || []).join(', ')}</div>
            </td>
            <td class="py-3 px-4">
                <span class="text-[10px] uppercase font-bold text-zinc-300 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                    ${prod.category}
                </span>
            </td>
            <td class="py-3 px-4 font-bold text-xs text-white">
                R$ ${prod.price.toFixed(2).replace('.', ',')}
            </td>
            <td class="py-3 px-4 font-bold text-xs ${prod.promoPrice ? 'text-emerald-400' : 'text-zinc-500'}">
                ${prod.promoPrice ? `R$ ${prod.promoPrice.toFixed(2).replace('.', ',')}` : '—'}
            </td>
            <td class="py-3 px-4">
                <button type="button" onclick="toggleStock('${prod.id}')" class="text-xs font-semibold px-3 py-1 rounded-full border transition-all ${prod.inStock ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60' : 'bg-red-950/60 border-red-500/40 text-red-400 hover:bg-red-900/60'}">
                    ${prod.inStock ? '✓ Em Estoque' : '✕ Esgotado'}
                </button>
            </td>
            <td class="py-3 px-4 text-right space-x-1.5">
                <button type="button" onclick="openEditProduct('${prod.id}')" class="p-2 text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all" title="Editar Peça">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button type="button" onclick="deleteProduct('${prod.id}')" class="p-2 text-zinc-400 hover:text-red-400 bg-zinc-800 hover:bg-red-950/40 rounded-xl transition-all" title="Excluir Peça">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </td>
        </tr>
    `).join('');
}

function filterAdminProducts(val) {
    filterSearch = val.trim();
    renderProductsTable();
}

function toggleStock(prodId) {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;
    prod.inStock = !prod.inStock;
    saveProducts();
    renderProductsTable();
    showToast(`Status de estoque atualizado!`);
}

function deleteProduct(prodId) {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;
    if (confirm(`Tem certeza que deseja excluir "${prod.name}" do catálogo?`)) {
        products = products.filter(p => p.id !== prodId);
        saveProducts();
        renderProductsTable();
        showToast('Peça excluída do catálogo!');
    }
}

// ==========================================
// MODAL NOVO / EDITAR PRODUTO
// ==========================================
function openProductModal() {
    document.getElementById('modalTitle').innerText = 'Adicionar Nova Roupa';
    document.getElementById('prodEditId').value = '';
    document.getElementById('productForm').reset();
    document.getElementById('imagePreview').src = '';
    document.getElementById('imagePreviewContainer').classList.add('hidden');
    document.getElementById('productModal').classList.remove('hidden');
}

function openEditProduct(prodId) {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;

    document.getElementById('modalTitle').innerText = 'Editar Roupa';
    document.getElementById('prodEditId').value = prod.id;
    document.getElementById('prodName').value = prod.name;
    document.getElementById('prodCategory').value = prod.category;
    document.getElementById('prodPrice').value = prod.price;
    document.getElementById('prodPromoPrice').value = prod.promoPrice || '';
    document.getElementById('prodBadge').value = prod.badge || '';
    document.getElementById('prodDescription').value = prod.description || '';
    document.getElementById('prodImageUrl').value = prod.image || '';

    // Checkboxes de Tamanho
    const sizeCheckboxes = document.querySelectorAll('input[name="prodSizes"]');
    sizeCheckboxes.forEach(cb => {
        cb.checked = prod.sizes && prod.sizes.includes(cb.value);
    });

    // Preview
    const previewContainer = document.getElementById('imagePreviewContainer');
    const preview = document.getElementById('imagePreview');
    if (prod.image) {
        preview.src = prod.image;
        previewContainer.classList.remove('hidden');
    }

    document.getElementById('productModal').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('productModal').classList.add('hidden');
}

function handleImageFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2.5 * 1024 * 1024) {
        alert('A foto selecionada é muito grande. Escolha uma foto de até 2.5 MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const base64 = event.target.result;
        document.getElementById('prodImageUrl').value = base64;
        document.getElementById('imagePreview').src = base64;
        document.getElementById('imagePreviewContainer').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function saveProduct(e) {
    e.preventDefault();

    const id = document.getElementById('prodEditId').value;
    const name = document.getElementById('prodName').value.trim();
    const category = document.getElementById('prodCategory').value;
    const price = parseFloat(document.getElementById('prodPrice').value) || 0;
    const promoVal = document.getElementById('prodPromoPrice').value;
    const promoPrice = promoVal ? parseFloat(promoVal) : null;
    const badge = document.getElementById('prodBadge').value || null;
    const description = document.getElementById('prodDescription').value.trim();
    const image = document.getElementById('prodImageUrl').value.trim() || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';

    const selectedSizesList = Array.from(document.querySelectorAll('input[name="prodSizes"]:checked')).map(cb => cb.value);

    if (!name || price <= 0) {
        alert('Informe o nome da roupa e um preço válido!');
        return;
    }

    if (id) {
        const idx = products.findIndex(p => p.id === id);
        if (idx > -1) {
            products[idx] = {
                ...products[idx],
                name,
                category,
                price,
                promoPrice,
                badge,
                description,
                image,
                sizes: selectedSizesList.length > 0 ? selectedSizesList : ['Único']
            };
        }
    } else {
        const newProduct = {
            id: 'prod_' + Date.now(),
            name,
            category,
            price,
            promoPrice,
            badge,
            description,
            image,
            sizes: selectedSizesList.length > 0 ? selectedSizesList : ['Único'],
            inStock: true
        };
        products.unshift(newProduct);
    }

    saveProducts();
    renderProductsTable();
    closeProductModal();
    showToast('✓ Peça salva com sucesso no catálogo!');
}

// ==========================================
// CONFIGURAÇÃO DA LOJA (CUSTOMIZADOR)
// ==========================================
function populateConfigForm() {
    document.getElementById('cfgStoreName').value = config.storeName || '';
    document.getElementById('cfgStoreSlogan').value = config.slogan || '';
    document.getElementById('cfgAnnouncement').value = config.announcement || '';
    document.getElementById('cfgWhatsapp').value = config.whatsapp || '';
    document.getElementById('cfgInstagram').value = config.instagram || '';
    document.getElementById('cfgHeroBadge').value = config.heroBadge || '';
    document.getElementById('cfgHeroTitle').value = config.heroTitle || '';
    document.getElementById('cfgHeroSubtitle').value = config.heroSubtitle || '';
    document.getElementById('cfgHeroImage').value = config.heroImage || '';
}

function saveConfigForm(e) {
    e.preventDefault();

    config.storeName = document.getElementById('cfgStoreName').value.trim() || 'ALTO CONCEITO';
    config.slogan = document.getElementById('cfgStoreSlogan').value.trim() || 'MAIS QUE ROUPAS. ESTILO DE VIDA';
    config.announcement = document.getElementById('cfgAnnouncement').value.trim() || '';
    config.whatsapp = document.getElementById('cfgWhatsapp').value.replace(/\D/g, '') || '5518996387204';
    config.instagram = document.getElementById('cfgInstagram').value.trim() || 'alto_conceit0';
    config.heroBadge = document.getElementById('cfgHeroBadge').value.trim() || 'NOVA COLEÇÃO';
    config.heroTitle = document.getElementById('cfgHeroTitle').value.trim() || 'TRAJES & MODA MASCULINA';
    config.heroSubtitle = document.getElementById('cfgHeroSubtitle').value.trim() || '';
    config.heroImage = document.getElementById('cfgHeroImage').value.trim() || '';

    saveConfig();
    showToast('✓ Configurações da loja atualizadas com sucesso!');
}

// ==========================================
// BACKUP E RESTAURAÇÃO
// ==========================================
function exportCatalogJson() {
    const backupData = {
        config: config,
        products: products,
        exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `alto_conceito_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('✓ Arquivo de backup exportado!');
}

function importCatalogJson(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            if (data.products && Array.isArray(data.products)) {
                products = data.products;
                saveProducts();
            }
            if (data.config) {
                config = { ...config, ...data.config };
                saveConfig();
            }
            updateMetrics();
            renderProductsTable();
            populateConfigForm();
            showToast('✓ Catálogo importado com sucesso!');
        } catch (err) {
            alert('Erro ao carregar o arquivo JSON. Certifique-se de que é um backup válido.');
        }
    };
    reader.readAsText(file);
}

function resetDefaultCatalog() {
    if (confirm('Deseja restaurar todas as roupas e configurações para o modelo padrão da Alto Conceito?')) {
        products = [...DEFAULT_PRODUCTS];
        config = { ...DEFAULT_CONFIG };
        saveProducts();
        saveConfig();
        updateMetrics();
        renderProductsTable();
        populateConfigForm();
        showToast('✓ Catálogo padrão restaurado!');
    }
}

// ==========================================
// NAVEGAÇÃO ENTRE ABAS
// ==========================================
function switchTab(tabName) {
    document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-black');
        btn.classList.add('text-zinc-400');
    });

    const activeContent = document.getElementById(`tab_${tabName}`);
    const activeBtn = document.getElementById(`tabBtn_${tabName}`);

    if (activeContent) activeContent.classList.remove('hidden');
    if (activeBtn) {
        activeBtn.classList.remove('text-zinc-400');
        activeBtn.classList.add('bg-white', 'text-black');
    }
}

function setupAdminListeners() {
    const fileInput = document.getElementById('prodImageFile');
    if (fileInput) {
        fileInput.addEventListener('change', handleImageFile);
    }

    const urlInput = document.getElementById('prodImageUrl');
    if (urlInput) {
        urlInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            const previewContainer = document.getElementById('imagePreviewContainer');
            const preview = document.getElementById('imagePreview');
            if (val) {
                preview.src = val;
                previewContainer.classList.remove('hidden');
            } else {
                previewContainer.classList.add('hidden');
            }
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
