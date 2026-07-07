/* ============================================================
   Espacio de EG — app.js
   Encuentra tu espacio en Guinea · Plataforma de alquiler para Guinea Ecuatorial
   ============================================================ */

/* ---------- Utilidades ---------- */
const fmt = n => new Intl.NumberFormat('es-ES').format(n) + ' FCFA';

/* Imagen de reserva (SVG) si falla la foto remota */
function fallbackImg(tipo){
  const col = tipo === 'oficina' || tipo === 'local' ? '#0072CE' : '#009739';
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'>"
    + "<rect width='640' height='400' fill='#eef4ef'/>"
    + "<rect width='640' height='400' fill='url(#g)'/>"
    + "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>"
    + "<stop offset='0' stop-color='" + col + "' stop-opacity='.16'/>"
    + "<stop offset='1' stop-color='#F9D616' stop-opacity='.18'/></linearGradient></defs>"
    + "<g fill='" + col + "' opacity='.85'>"
    + "<rect x='120' y='170' width='150' height='150' rx='6'/>"
    + "<rect x='285' y='120' width='120' height='200' rx='6'/>"
    + "<rect x='420' y='190' width='110' height='130' rx='6'/>"
    + "<path d='M120 170 l75 -55 75 55 z'/><path d='M285 120 l60 -45 60 45 z'/></g>"
    + "<text x='320' y='372' font-family='Segoe UI,Arial' font-size='22' fill='#12261b' text-anchor='middle' opacity='.6'>Espacio de EG · Guinea Ecuatorial</text>"
    + "</svg>";
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

/* ---------- Datos: propiedades de ejemplo ---------- */
const LISTINGS = [
  { id:1, titulo:'Apartamento moderno 2 hab. en Ela Nguema', tipo:'apartamento', ciudad:'Malabo',
    barrio:'Ela Nguema', precio:450000, hab:2, banos:1, m2:78, tel:'+240 222 145 780',
    desc:'Apartamento luminoso y recién reformado en el barrio de Ela Nguema, a 10 minutos del centro de Malabo. Cocina equipada, agua y luz incluidas. Zona tranquila y bien comunicada.',
    img:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', destacado:true },

  { id:2, titulo:'Oficina céntrica 120 m² en Avenida de la Independencia', tipo:'oficina', ciudad:'Malabo',
    barrio:'Centro', precio:1200000, hab:0, banos:2, m2:120, tel:'+240 222 300 114',
    desc:'Espacio de oficina en pleno centro financiero de Malabo. Planta diáfana, aire acondicionado, recepción y parking. Ideal para empresas y despachos profesionales.',
    img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', destacado:true },

  { id:3, titulo:'Villa con jardín 4 hab. frente al mar en Sipopo', tipo:'casa', ciudad:'Sipopo',
    barrio:'Sipopo Resort', precio:3500000, hab:4, banos:3, m2:280, tel:'+240 222 998 020',
    desc:'Espectacular villa en la exclusiva zona de Sipopo, con jardín privado, piscina y vistas al Atlántico. Amueblada, seguridad 24h y a pocos minutos del Palacio de Congresos.',
    img:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', destacado:true },

  { id:4, titulo:'Estudio amueblado en el centro de Bata', tipo:'apartamento', ciudad:'Bata',
    barrio:'Paseo Marítimo', precio:280000, hab:1, banos:1, m2:42, tel:'+240 222 507 661',
    desc:'Acogedor estudio junto al Paseo Marítimo de Bata. Totalmente amueblado, ideal para profesionales o estudiantes. Cerca de comercios, bancos y restaurantes.',
    img:'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80' },

  { id:5, titulo:'Apartamento familiar 3 hab. en Nuevo Bata', tipo:'apartamento', ciudad:'Bata',
    barrio:'Nuevo Bata', precio:600000, hab:3, banos:2, m2:105, tel:'+240 222 412 339',
    desc:'Amplio apartamento familiar en Nuevo Bata, con salón espacioso, tres dormitorios y balcón. Edificio con ascensor y aparcamiento. Zona residencial en crecimiento.',
    img:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80' },

  { id:6, titulo:'Local comercial 90 m² en zona céntrica de Malabo', tipo:'local', ciudad:'Malabo',
    barrio:'Los Ángeles', precio:850000, hab:0, banos:1, m2:90, tel:'+240 222 771 458',
    desc:'Local a pie de calle con gran escaparate, ideal para tienda, restaurante o servicios. Mucho tránsito peatonal en el barrio de Los Ángeles.',
    img:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80' },

  { id:7, titulo:'Casa de 3 habitaciones en Mongomo', tipo:'casa', ciudad:'Mongomo',
    barrio:'Centro', precio:750000, hab:3, banos:2, m2:160, tel:'+240 222 664 210',
    desc:'Casa independiente con patio en Mongomo, cerca de la Basílica de la Inmaculada Concepción. Tres dormitorios, salón amplio y cocina exterior. Barrio tranquilo.',
    img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },

  { id:8, titulo:'Apartamento de lujo 2 hab. con vistas en Malabo II', tipo:'apartamento', ciudad:'Malabo',
    barrio:'Malabo II', precio:950000, hab:2, banos:2, m2:96, tel:'+240 222 189 553',
    desc:'Apartamento de alto standing en Malabo II, con acabados de calidad, aire acondicionado en todas las estancias y plaza de garaje. Seguridad y generador propio.',
    img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },

  { id:9, titulo:'Oficina compartida / coworking en Bata', tipo:'oficina', ciudad:'Bata',
    barrio:'Centro', precio:350000, hab:0, banos:2, m2:60, tel:'+240 222 220 907',
    desc:'Puestos de oficina en espacio de coworking en el centro de Bata. Internet de fibra, sala de reuniones y recepción compartida. Contratos flexibles mensuales.',
    img:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80' },

  { id:10, titulo:'Chalet con piscina 5 hab. en Ciudad de la Paz', tipo:'casa', ciudad:'Ciudad de la Paz (Oyala)',
    barrio:'Zona residencial', precio:2800000, hab:5, banos:4, m2:340, tel:'+240 222 010 442',
    desc:'Chalet de nueva construcción en Ciudad de la Paz (Oyala), la nueva capital. Cinco dormitorios, piscina, jardín amplio y garaje doble. Entorno moderno y seguro.',
    img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },

  { id:11, titulo:'Apartamento económico 1 hab. en Ebebiyín', tipo:'apartamento', ciudad:'Ebebiyín',
    barrio:'Centro', precio:200000, hab:1, banos:1, m2:48, tel:'+240 222 335 178',
    desc:'Apartamento sencillo y económico en Ebebiyín, cerca de la frontera. Bien conservado, ideal para una persona o pareja. Agua incluida.',
    img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80' },

  { id:12, titulo:'Bungalow junto a la playa en Luba', tipo:'casa', ciudad:'Luba',
    barrio:'Costa de Luba', precio:520000, hab:2, banos:1, m2:88, tel:'+240 222 447 690',
    desc:'Encantador bungalow a pocos metros de la playa en Luba, isla de Bioko. Dos habitaciones, terraza y vistas al mar. Perfecto para descansar los fines de semana.',
    img:'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80' }
];

/* ---------- Zonas icónicas (ilustraciones SVG) ---------- */
const ZONAS = [
  { ciudad:'Malabo', sub:'Capital · Isla de Bioko',
    illu:"<svg viewBox='0 0 300 180' preserveAspectRatio='xMidYMid slice'>"
      + "<rect width='300' height='180' fill='#0072CE'/><rect y='120' width='300' height='60' fill='#0a4f86'/>"
      + "<path d='M0 130 q40 -12 80 0 t80 0 t80 0 t80 0 v50 H0z' fill='#0f5f9e' opacity='.6'/>"
      + "<g fill='#f4efe6'><rect x='120' y='55' width='24' height='75'/><rect x='156' y='55' width='24' height='75'/>"
      + "<path d='M120 55 l12 -26 12 26z'/><path d='M156 55 l12 -26 12 26z'/><rect x='144' y='70' width='12' height='60'/></g>"
      + "<circle cx='250' cy='40' r='18' fill='#F9D616' opacity='.9'/></svg>" },
  { ciudad:'Bata', sub:'Ciudad más grande · Región continental',
    illu:"<svg viewBox='0 0 300 180' preserveAspectRatio='xMidYMid slice'>"
      + "<rect width='300' height='180' fill='#009739'/><rect y='125' width='300' height='55' fill='#0a6e2c'/>"
      + "<g fill='#f4efe6'><rect x='138' y='30' width='24' height='100'/><path d='M138 30 l12 -20 12 20z'/>"
      + "<circle cx='150' cy='16' r='5' fill='#F9D616'/><rect x='134' y='45' width='32' height='6'/>"
      + "<rect x='134' y='70' width='32' height='6'/><rect x='134' y='95' width='32' height='6'/></g>"
      + "<g fill='#0a6e2c'><path d='M40 130 q10 -30 22 0z'/><path d='M240 130 q12 -34 26 0z'/></g></svg>" },
  { ciudad:'Sipopo', sub:'Zona de lujo · Costa de Bioko',
    illu:"<svg viewBox='0 0 300 180' preserveAspectRatio='xMidYMid slice'>"
      + "<rect width='300' height='180' fill='#00a3d9'/><rect y='120' width='300' height='60' fill='#e9d9a8'/>"
      + "<path d='M0 120 q75 -18 150 0 t150 0 v10 H0z' fill='#0093c6'/>"
      + "<g fill='#0a6e2c'><path d='M60 120 c-4 -30 -20 -40 -30 -44 c18 2 30 14 34 30 c2 -18 14 -30 30 -34 c-14 8 -28 20 -34 48z'/></g>"
      + "<rect x='150' y='84' width='90' height='36' fill='#fff' opacity='.92'/><path d='M150 84 l45 -20 45 20z' fill='#EF3340'/>"
      + "<circle cx='245' cy='40' r='16' fill='#F9D616'/></svg>" },
  { ciudad:'Mongomo', sub:'Basílica · Región continental',
    illu:"<svg viewBox='0 0 300 180' preserveAspectRatio='xMidYMid slice'>"
      + "<rect width='300' height='180' fill='#037a30'/><rect y='128' width='300' height='52' fill='#0a5f27'/>"
      + "<g fill='#f4efe6'><rect x='120' y='70' width='60' height='60'/>"
      + "<path d='M150 30 c18 0 30 16 30 34 h-60 c0 -18 12 -34 30 -34z'/><circle cx='150' cy='24' r='5' fill='#F9D616'/>"
      + "<rect x='132' y='90' width='14' height='40'/><rect x='154' y='90' width='14' height='40'/></g>"
      + "<circle cx='250' cy='44' r='15' fill='#F9D616' opacity='.9'/></svg>" }
];

/* ---------- Estado ---------- */
let state = { zona:'', tipo:'', hab:'', precio:'', sort:'recent' };
let allListings = LISTINGS.slice();

/* ---------- Helpers ---------- */
function tipoLabel(t){ return {apartamento:'Apartamento',casa:'Casa',oficina:'Oficina',local:'Local'}[t] || t; }

function cardHTML(p){
  const habTxt = (p.tipo==='oficina'||p.tipo==='local') ? (p.m2 + ' m²') : (p.hab + ' hab.');
  return "<article class='card' data-id='" + p.id + "' tabindex='0'>"
    + "<div class='card-media'>"
    + "<img src='" + p.img + "' alt='" + p.titulo + "' loading='lazy' "
    + "onerror=\"this.onerror=null;this.src='" + fallbackImg(p.tipo) + "'\">"
    + "<div class='card-badges'><span class='badge green'>" + tipoLabel(p.tipo) + "</span>"
    + (p.destacado ? "<span class='badge blue'>Destacado</span>" : "") + "</div>"
    + "<button class='fav' data-fav aria-label='Guardar favorito'>♡</button>"
    + "</div>"
    + "<div class='card-body'>"
    + "<div class='card-price'>" + fmt(p.precio) + "<small>/mes</small></div>"
    + "<h3 class='card-title'>" + p.titulo + "</h3>"
    + "<p class='card-loc'>📍 " + (p.barrio ? p.barrio + ', ' : '') + p.ciudad + "</p>"
    + "<div class='card-feats'><span>🛏️ " + habTxt + "</span>"
    + "<span>🛁 " + p.banos + " baño" + (p.banos!==1?'s':'') + "</span>"
    + "<span>📐 " + p.m2 + " m²</span></div>"
    + "</div></article>";
}

/* ---------- Filtrado + orden ---------- */
function applyFilters(){
  let list = allListings.filter(function(p){
    if(state.zona && p.ciudad !== state.zona) return false;
    if(state.tipo && p.tipo !== state.tipo) return false;
    if(state.hab !== '' && Number(p.hab) < Number(state.hab)) return false;
    if(state.precio && p.precio > Number(state.precio)) return false;
    return true;
  });
  if(state.sort==='price-asc') list.sort((a,b)=>a.precio-b.precio);
  else if(state.sort==='price-desc') list.sort((a,b)=>b.precio-a.precio);
  else list.sort((a,b)=>b.id-a.id);

  document.getElementById('listingsGrid').innerHTML = list.map(cardHTML).join('');
  document.getElementById('emptyState').hidden = list.length !== 0;

  const parts = [];
  if(state.tipo) parts.push(tipoLabel(state.tipo).toLowerCase() + 's');
  if(state.zona) parts.push('en ' + state.zona);
  document.getElementById('resultsInfo').textContent =
    list.length + ' propiedad' + (list.length!==1?'es':'') +
    (parts.length ? ' · ' + parts.join(' ') : ' disponibles');
  document.getElementById('statCount').textContent = allListings.length;
}

/* ---------- Modal detalle ---------- */
function openModal(id){
  const p = allListings.find(x=>x.id===Number(id));
  if(!p) return;
  const habTxt = (p.tipo==='oficina'||p.tipo==='local') ? '—' : p.hab;
  const wa = p.tel.replace(/[^0-9]/g,'');
  document.getElementById('modalBody').innerHTML =
    "<div class='modal-media'><img src='" + p.img + "' alt='" + p.titulo + "' "
    + "onerror=\"this.onerror=null;this.src='" + fallbackImg(p.tipo) + "'\"></div>"
    + "<div class='modal-content'>"
    + "<span class='badge green'>" + tipoLabel(p.tipo) + "</span>"
    + "<h2 id='modalTitle'>" + p.titulo + "</h2>"
    + "<p class='card-loc'>📍 " + (p.barrio ? p.barrio + ', ' : '') + p.ciudad + ", Guinea Ecuatorial</p>"
    + "<div class='modal-price'>" + fmt(p.precio) + " <small style='font-size:1rem;color:var(--muted)'>/mes</small></div>"
    + "<div class='modal-feats'><div><b>" + habTxt + "</b>Habitaciones</div>"
    + "<div><b>" + p.banos + "</b>Baños</div><div><b>" + p.m2 + " m²</b>Superficie</div></div>"
    + "<p>" + p.desc + "</p>"
    + "<div class='modal-contact'>"
    + "<a class='btn-contact' href='tel:" + wa + "'>📞 Llamar: " + p.tel + "</a>"
    + "<a class='btn-contact wa' href='https://wa.me/" + wa + "' target='_blank' rel='noopener'>💬 WhatsApp</a>"
    + "</div></div>";
  document.getElementById('modal').hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  document.getElementById('modal').hidden = true;
  document.body.style.overflow = '';
}

/* ---------- Zonas ---------- */
function renderZonas(){
  document.getElementById('zonasGrid').innerHTML = ZONAS.map(function(z){
    return "<button class='zona-card' data-zona='" + z.ciudad + "'>"
      + "<div class='zone-illu'>" + z.illu + "</div>"
      + "<span class='zone-arrow'>→</span>"
      + "<div class='zone-label'><b>" + z.ciudad + "</b><span>" + z.sub + "</span></div>"
      + "</button>";
  }).join('');
}

/* ---------- Eventos ---------- */
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('year').textContent = new Date().getFullYear();
  renderZonas();
  applyFilters();

  document.getElementById('searchForm').addEventListener('submit', function(e){
    e.preventDefault();
    state.zona = document.getElementById('fZona').value;
    state.tipo = document.getElementById('fTipo').value;
    state.hab  = document.getElementById('fHab').value;
    state.precio = document.getElementById('fPrecio').value;
    applyFilters();
    document.getElementById('listings').scrollIntoView({behavior:'smooth'});
  });

  document.getElementById('sortBy').addEventListener('change', function(e){ state.sort=e.target.value; applyFilters(); });

  document.getElementById('clearFilters').addEventListener('click', function(){
    state = { zona:'', tipo:'', hab:'', precio:'', sort:'recent' };
    ['fZona','fTipo','fHab','fPrecio'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('sortBy').value='recent';
    applyFilters();
  });

  document.getElementById('listingsGrid').addEventListener('click', function(e){
    const fav = e.target.closest('[data-fav]');
    if(fav){ e.stopPropagation(); fav.classList.toggle('on');
      fav.textContent = fav.classList.contains('on') ? '♥' : '♡'; return; }
    const card = e.target.closest('.card'); if(card) openModal(card.dataset.id);
  });
  document.getElementById('listingsGrid').addEventListener('keydown', function(e){
    if(e.key==='Enter'){ const card=e.target.closest('.card'); if(card) openModal(card.dataset.id); }
  });

  document.getElementById('zonasGrid').addEventListener('click', function(e){
    const z = e.target.closest('.zona-card'); if(!z) return;
    state.zona = z.dataset.zona;
    document.getElementById('fZona').value = z.dataset.zona;
    applyFilters();
    document.getElementById('listings').scrollIntoView({behavior:'smooth'});
  });

  document.getElementById('modal').addEventListener('click', function(e){ if(e.target.dataset.close!==undefined) closeModal(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });

  document.getElementById('publishForm').addEventListener('submit', function(e){
    e.preventDefault();
    const g = id => document.getElementById(id).value;
    const nuevo = {
      id: Math.max.apply(null, allListings.map(x=>x.id)) + 1,
      titulo:g('pTitulo'), tipo:g('pTipo'), ciudad:g('pZona'), barrio:g('pBarrio'),
      precio:Number(g('pPrecio'))||0, hab:Number(g('pHab'))||0, banos:Number(g('pBanos'))||0,
      m2: Number(g('pHab'))>0 ? Number(g('pHab'))*35+30 : 60,
      tel:g('pTel'), desc:g('pDesc')||'Sin descripción.', img:fallbackImg(g('pTipo')), destacado:false
    };
    allListings.unshift(nuevo);
    state = { zona:'', tipo:'', hab:'', precio:'', sort:'recent' };
    ['fZona','fTipo','fHab','fPrecio'].forEach(id=>document.getElementById(id).value='');
    applyFilters();
    document.getElementById('publishNote').hidden=false;
    document.getElementById('publishForm').reset();
    setTimeout(function(){ document.getElementById('publishNote').hidden=true; }, 6000);
    document.getElementById('listings').scrollIntoView({behavior:'smooth'});
  });

  document.getElementById('navToggle').addEventListener('click', function(){
    document.querySelector('.main-nav').classList.toggle('open');
  });
  document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click', function(){
    document.querySelector('.main-nav').classList.remove('open');
  }));
});
