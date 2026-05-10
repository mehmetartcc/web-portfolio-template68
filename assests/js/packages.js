// ============================================
// EĞİTİM PAKETLERİ - JSON VE localStorage
// ============================================

let allPackages = [];
let favorites = JSON.parse(localStorage.getItem('packageFavorites')) || [];
let cart = JSON.parse(localStorage.getItem('packageCart')) || [];

console.log('📦 packages.js yüklendi');

// ============================================
// 1. JSON VERİSİNİ YÜKLE
// ============================================

async function loadPackages() {
    try {
        const response = await fetch('packages.json');
        const data = await response.json();
        allPackages = data.paketler;
        
        console.log('✅ JSON yüklendi:', allPackages.length, 'paket');
        
        displayPackages(allPackages);
        updateBadges();
    } catch (error) {
        console.error('❌ JSON yüklenemedi:', error);
    }
}

// ============================================
// 2. PAKETLERİ EKRANA YAZDIR
// ============================================

function displayPackages(packages) {
    const grid = document.getElementById('packagesGrid');
    if (!grid) {
        console.log('⚠️ packagesGrid bulunamadı');
        return;
    }
    
    console.log('📝 Paketler gösteriliyor:', packages.length);
    grid.innerHTML = '';
    
    packages.forEach(paket => {
        const isFavorite = favorites.includes(paket.id);
        const isInCart = cart.includes(paket.id);
        
        const card = document.createElement('div');
        card.className = 'package-card';
        card.style.borderLeftColor = paket.renk;
        
        card.innerHTML = `
            <div class="package-header" style="background: linear-gradient(135deg, ${paket.renk}20, ${paket.renk}05); position: relative; padding: 1.5rem;">
                <div class="package-icon" style="font-size: 2.5rem; margin-bottom: 0.5rem;">${paket.icon}</div>
                <h3 class="package-title" style="margin: 0; font-size: 1.25rem;">${paket.ad}</h3>
            </div>
            
            <div class="package-content" style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column;">
                <div class="package-price" style="margin-bottom: 0.5rem;">
                    <span class="price-amount" style="font-size: 2rem; font-weight: 700; color: ${paket.renk};">${paket.fiyat}</span>
                    <span class="price-currency" style="color: #999; margin-left: 0.25rem;">₺</span>
                </div>
                <p class="package-duration" style="color: #666; font-size: 0.9rem; margin: 0.5rem 0;">⏱️ ${paket.sure}</p>
                <p class="package-description" style="color: #666; font-size: 0.95rem; margin-bottom: 1rem;">${paket.aciklama}</p>
                
                <ul class="package-features" style="list-style: none; padding: 0; margin: 1rem 0; flex: 1;">
                    ${paket.ozellikler.map(ozellik => `
                        <li style="padding: 0.5rem 0; color: #333; font-size: 0.9rem; border-bottom: 1px solid #eee;">✓ ${ozellik}</li>
                    `).join('')}
                </ul>
                
                <div class="package-actions" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1rem;">
                    <button class="btn-favorite" 
                            onclick="toggleFavorite(${paket.id})"
                            style="padding: 0.75rem; border: 2px solid ${isFavorite ? paket.renk : '#ddd'}; background: ${isFavorite ? paket.renk : 'white'}; color: ${isFavorite ? 'white' : '#333'}; border-radius: 5px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                        ${isFavorite ? '❤️ Favorilerde' : '🤍 Favorilere Ekle'}
                    </button>
                    <button class="btn-cart-add" 
                            onclick="toggleCart(${paket.id})"
                            style="padding: 0.75rem; border: none; background: ${isInCart ? '#10B981' : paket.renk}; color: white; border-radius: 5px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                        ${isInCart ? '✓ Sepette' : '🛒 Sepete Ekle'}
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// ============================================
// 3. FAVORİLERE EKLE / ÇIKAR
// ============================================

function toggleFavorite(packageId) {
    console.log('❤️ Favori tıklandı:', packageId);
    
    const index = favorites.indexOf(packageId);
    const paket = allPackages.find(p => p.id === packageId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        console.log(`❌ ${paket.ad} favorilerden çıkarıldı`);
    } else {
        favorites.push(packageId);
        console.log(`✅ ${paket.ad} favorilere eklendi`);
    }
    
    localStorage.setItem('packageFavorites', JSON.stringify(favorites));
    displayPackages(allPackages);
    updateBadges();
}

// ============================================
// 4. SEPETE EKLE / ÇIKAR
// ============================================

function toggleCart(packageId) {
    console.log('🛒 Sepet tıklandı:', packageId);
    
    const index = cart.indexOf(packageId);
    const paket = allPackages.find(p => p.id === packageId);
    
    if (index > -1) {
        cart.splice(index, 1);
        console.log(`❌ ${paket.ad} sepetten çıkarıldı`);
    } else {
        cart.push(packageId);
        console.log(`✅ ${paket.ad} sepete eklendi`);
    }
    
    localStorage.setItem('packageCart', JSON.stringify(cart));
    displayPackages(allPackages);
    updateBadges();
}

// ============================================
// 5. BADGE'LERİ GÜNCELLE
// ============================================

function updateBadges() {
    const favBadge = document.querySelector('.fav-badge');
    const cartBadge = document.querySelector('.cart-badge');
    
    if (favBadge) {
        favBadge.textContent = favorites.length;
        favBadge.style.display = favorites.length > 0 ? 'flex' : 'none';
    }
    
    if (cartBadge) {
        cartBadge.textContent = cart.length;
        cartBadge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
    
    console.log(`📊 Favoriler: ${favorites.length}, Sepet: ${cart.length}`);
}

// ============================================
// 6. FAVORİLER SAYFASINI AÇ
// ============================================

function openFavorites() {
    console.log('❤️ Favoriler sayfası açılıyor');
    
    const favoritePakets = allPackages.filter(p => favorites.includes(p.id));
    const totalPrice = favoritePakets.reduce((sum, p) => sum + p.fiyat, 0);
    
    let html = `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Favori Paketler</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Inter', sans-serif; background: #f5f5f5; }
                .nav-back { padding: 1rem; background: white; border-bottom: 1px solid #ddd; }
                .back-btn { padding: 0.75rem 1.5rem; background: #DC2626; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
                .back-btn:hover { background: #991B1B; }
                .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
                .header { text-align: center; margin-bottom: 2rem; }
                .header h1 { color: #EC4899; font-size: 2rem; }
                .packages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
                .package-card { background: white; border-radius: 8px; overflow: hidden; border-left: 5px solid #EC4899; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .package-header { padding: 1.5rem; background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05)); }
                .package-icon { font-size: 2rem; margin-bottom: 0.5rem; }
                .package-title { margin: 0; font-size: 1.25rem; }
                .package-content { padding: 1.5rem; }
                .price-amount { font-size: 1.75rem; font-weight: 700; color: #EC4899; }
                .remove-btn { width: 100%; padding: 0.75rem; background: #DC2626; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; margin-top: 1rem; }
                .remove-btn:hover { background: #991B1B; }
                .empty-message { text-align: center; padding: 3rem; color: #999; }
                .total-section { text-align: center; padding: 2rem; background: white; border-radius: 8px; margin-top: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .total-section h2 { color: #EC4899; font-size: 1.75rem; }
            </style>
        </head>
        <body>
            <div class="nav-back">
                <button class="back-btn" onclick="history.back()">← Geri Dön</button>
            </div>
            <div class="container">
                <div class="header">
                    <h1>❤️ Favori Paketlerim</h1>
                    <p style="color: #666;">${favoritePakets.length} paket kaydedildi</p>
                </div>
                
                ${favoritePakets.length === 0 ? `
                    <div class="empty-message">
                        <p>❌ Henüz favori paket eklemediniz</p>
                    </div>
                ` : `
                    <div class="packages-grid">
                        ${favoritePakets.map(p => `
                            <div class="package-card">
                                <div class="package-header">
                                    <div class="package-icon">${p.icon}</div>
                                    <h3 class="package-title">${p.ad}</h3>
                                </div>
                                <div class="package-content">
                                    <div><span class="price-amount">${p.fiyat}</span> <span style="color: #999;">₺</span></div>
                                    <p style="color: #666; margin: 0.5rem 0;">⏱️ ${p.sure}</p>
                                    <button class="remove-btn" onclick="removeFav(${p.id})">❌ Favorilerden Çıkar</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="total-section">
                        <h2>💰 Toplam Değer: ${totalPrice} ₺</h2>
                    </div>
                `}
            </div>
            <script>
                function removeFav(id) {
                    let fav = JSON.parse(localStorage.getItem('packageFavorites')) || [];
                    fav = fav.filter(f => f !== id);
                    localStorage.setItem('packageFavorites', JSON.stringify(fav));
                    location.reload();
                }
            </script>
        </body>
        </html>
    `;
    
    window.open().document.write(html);
}

// ============================================
// 7. SEPET SAYFASINI AÇ
// ============================================

function openCart() {
    console.log('🛒 Sepet sayfası açılıyor');
    
    const cartPakets = allPackages.filter(p => cart.includes(p.id));
    const total = cartPakets.reduce((sum, p) => sum + p.fiyat, 0);
    
    let html = `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sepetim</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Inter', sans-serif; background: #f5f5f5; }
                .nav-back { padding: 1rem; background: white; border-bottom: 1px solid #ddd; }
                .back-btn { padding: 0.75rem 1.5rem; background: #DC2626; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
                .back-btn:hover { background: #991B1B; }
                .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
                .header { text-align: center; margin-bottom: 2rem; }
                .header h1 { color: #10B981; font-size: 2rem; }
                .packages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
                .package-card { background: white; border-radius: 8px; overflow: hidden; border-left: 5px solid #10B981; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .package-header { padding: 1.5rem; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); }
                .package-icon { font-size: 2rem; margin-bottom: 0.5rem; }
                .package-title { margin: 0; font-size: 1.25rem; }
                .package-content { padding: 1.5rem; }
                .price-amount { font-size: 1.75rem; font-weight: 700; color: #10B981; }
                .remove-btn { width: 100%; padding: 0.75rem; background: #DC2626; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; margin-top: 1rem; }
                .remove-btn:hover { background: #991B1B; }
                .empty-message { text-align: center; padding: 3rem; color: #999; }
                .total-section { text-align: center; padding: 2rem; background: white; border-radius: 8px; margin-top: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
                .total-section h2 { color: #10B981; font-size: 1.75rem; }
                .checkout-btn { padding: 1rem 2rem; background: #10B981; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem; font-weight: bold; margin-top: 1rem; }
                .checkout-btn:hover { background: #059669; }
            </style>
        </head>
        <body>
            <div class="nav-back">
                <button class="back-btn" onclick="history.back()">← Geri Dön</button>
            </div>
            <div class="container">
                <div class="header">
                    <h1>🛒 Sepetim</h1>
                    <p style="color: #666;">${cartPakets.length} paket seçildi</p>
                </div>
                
                ${cartPakets.length === 0 ? `
                    <div class="empty-message">
                        <p>❌ Sepetiniz boş</p>
                    </div>
                ` : `
                    <div class="packages-grid">
                        ${cartPakets.map(p => `
                            <div class="package-card">
                                <div class="package-header">
                                    <div class="package-icon">${p.icon}</div>
                                    <h3 class="package-title">${p.ad}</h3>
                                </div>
                                <div class="package-content">
                                    <div><span class="price-amount">${p.fiyat}</span> <span style="color: #999;">₺</span></div>
                                    <p style="color: #666; margin: 0.5rem 0;">⏱️ ${p.sure}</p>
                                    <p style="color: #666; font-size: 0.9rem;">${p.aciklama}</p>
                                    <button class="remove-btn" onclick="removeCart(${p.id})">❌ Sepetten Çıkar</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="total-section">
                        <h2>💰 Toplam Tutar: ${total} ₺</h2>
                        <button class="checkout-btn" onclick="checkout(${total})">💳 Satın Al (${total} ₺)</button>
                    </div>
                `}
            </div>
            <script>
                function removeCart(id) {
                    let c = JSON.parse(localStorage.getItem('packageCart')) || [];
                    c = c.filter(x => x !== id);
                    localStorage.setItem('packageCart', JSON.stringify(c));
                    location.reload();
                }
                
                function checkout(total) {
                    alert('✅ Satın alma işlemi başarılı!\\nToplam: ' + total + ' ₺');
                    localStorage.setItem('packageCart', JSON.stringify([]));
                    location.reload();
                }
            </script>
        </body>
        </html>
    `;
    
    window.open().document.write(html);
}

// ============================================
// 8. SAYFA YÜKLENDİĞİNDE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Paketler sayfası başlatılıyor...');
    loadPackages();
});
