let map;
let marker;

// =====================
// MAPY (vrstvy)
// =====================

const lightMap = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    { attribution: "© OpenStreetMap & CARTO" }
);

const darkMap = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    { attribution: "© OpenStreetMap & CARTO" }
);

const aerialMap = L.tileLayer(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    { attribution: "Google Maps" }
);

// =====================
// MAPA INIT
// =====================

map = L.map('map', {
    layers: [lightMap],
    zoomControl: false
}).setView(CONFIG.map.center, CONFIG.map.zoom);

L.control.zoom({ position: 'topright' }).addTo(map);

// Okamžitá oprava velikosti mapy po načtení
setTimeout(() => {
    map.invalidateSize();
}, 100);

// =====================
// VOZIDLO
// =====================

function createLineMarker(lineNumber, color) {
    return L.divIcon({
        className: 'line-marker',
        html: `
            <div class="marker-box" style="background:${color}">
                ${lineNumber}
            </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

marker = L.marker(CONFIG.map.center, {
    icon: createLineMarker(75, "#0000D5")
}).addTo(map);

// =====================
// ZASTÁVKY
// =====================

const stops = [
    { name: "Všebořice 2", lat: 50.6890106, lng: 13.9926833, lines: "76" },
    { name: "Všebořice 1", lat: 50.6884347, lng: 13.9933825, lines: "76" },
    { name: "Na Kohoutě 1", lat: 50.6865197, lng: 13.9964875, lines: "76" },
    { name: "Na Kohoutě 2", lat: 50.6860542, lng: 13.9974603, lines: "76" },
    { name: "Dukelských hrdinů 1", lat: 50.6848944, lng: 13.9990978, lines: "76" },
    { name: "Dukelských hrdinů 2", lat: 50.6846161, lng: 13.9997989, lines: "76" },
    { name: "Kpt. Jaroše 1", lat: 50.6820642, lng: 14.0034075, lines: "76" },
    { name: "Kpt. Jaroše 2", lat: 50.6823350, lng: 14.0032406, lines: "76" },
    { name: "Bukov, rondel", lat: 50.6805192, lng: 14.0068750, lines: "76" },
    { name: "Bukov 1", lat: 50.6789933, lng: 14.0091878, lines: "76" },
    { name: "Bukov 2", lat: 50.6793481, lng: 14.0089997, lines: "76" },
    { name: "Zimní stadion", lat: 50.6768953, lng: 14.0129986, lines: "76" },
    { name: "Městský stadion 1", lat: 50.6763039, lng: 14.0141619, lines: "76" },
    { name: "Městský stadion 2", lat: 50.6749686, lng: 14.0157900, lines: "76" },
    { name: "Beethovenova 1", lat: 50.6728972, lng: 14.0198278, lines: "76" },
    { name: "Beethovenova 2", lat: 50.6731033, lng: 14.0198422, lines: "76" },
    { name: "Šaldova 1", lat: 50.6701469, lng: 14.0231906, lines: "76" },
    { name: "Šaldova 2", lat: 50.6697503, lng: 14.0243017, lines: "76" },
    { name: "Poliklinika 1", lat: 50.6663819, lng: 14.0304078, lines: "76" },
    { name: "Poliklinika 2", lat: 50.6675492, lng: 14.0287103, lines: "" },
    { name: "Poliklinika 3", lat: 50.6663933, lng: 14.0290061, lines: "76" },
    { name: "Hraničář 1", lat: 50.6635972, lng: 14.0330658, lines: "" },
    { name: "Hraničář 2", lat: 50.6630669, lng: 14.0334131, lines: "76" },
    { name: "Hraničář 3", lat: 50.6639747, lng: 14.0330258, lines: "76" },
    { name: "Hraničář 4", lat: 50.6632386, lng: 14.0335150, lines: "43, 46" },
    { name: "Hraničář 5", lat: 50.6618539, lng: 14.0342761, lines: "" },
    { name: "Hraničář 6", lat: 50.6622467, lng: 14.0333014, lines: "" },
    { name: "Divadlo 1", lat: 50.6601639, lng: 14.0353947, lines: "76" },
    { name: "Divadlo 2", lat: 50.6595306, lng: 14.0364417, lines: "76" },
    { name: "Divadlo 3", lat: 50.6595231, lng: 14.0359450, lines: "" },
    { name: "Divadlo 4", lat: 50.6594200, lng: 14.0359917, lines: "" },
    { name: "Divadlo 5", lat: 50.6603356, lng: 14.0353956, lines: "" },
    { name: "Divadlo 6", lat: 50.6594200, lng: 14.0364647, lines: "" },
    { name: "Divadlo 7", lat: 50.6595842, lng: 14.0346822, lines: "" },
    { name: "Divadlo 8", lat: 50.6595764, lng: 14.0344381, lines: "" },
    { name: "Revoluční 1", lat: 50.6595689, lng: 14.0372008, lines: "43, 46" },
    { name: "Revoluční 2", lat: 50.6595917, lng: 14.0377950, lines: "76" },
    { name: "Mírové náměstí 1", lat: 50.6599847, lng: 14.0406103, lines: "76" },
    { name: "Mírové náměstí 2", lat: 50.6601486, lng: 14.0411519, lines: "43, 46" },
    { name: "Mírové náměstí 3", lat: 50.6604767, lng: 14.0425519, lines: "" },
    { name: "Mírové náměstí 4", lat: 50.6605606, lng: 14.0432578, lines: "76, 43, 46" }
];

const stopIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/GoodKubiceek/Projekt-MHD-Usti/main/Stop_Ico.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

// =====================
// CLUSTER
// =====================

const stopCluster = L.markerClusterGroup({
    disableClusteringAtZoom: 17,
    maxClusterRadius: 40,

    iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount();
        let t = (count - 2) / (50 - 2);
        t = Math.max(0, Math.min(1, t));

        const r = 0;
        const g = Math.round(80 + (200 - 80) * t);
        const b = Math.round(255 + (80 - 255) * t);
        const color = `rgb(${r},${g},${b})`;

        return L.divIcon({
            html: `
                <div class="cluster-circle" style="background:${color}">
                    ${count}
                </div>
            `,
            className: "custom-cluster",
            iconSize: L.point(40, 40)
        });
    }
});

stops.forEach(stop => {
    const stopMarker = L.marker([stop.lat, stop.lng], { icon: stopIcon });

    stopMarker.bindPopup(`
        <div style="min-width:150px">
            <b>${stop.name}</b><br>
            Linky: ${stop.lines || "žádné"}
        </div>
    `);

    stopCluster.addLayer(stopMarker);
});

map.addLayer(stopCluster);
// =====================
// OVLÁDÁNÍ MENU A PANELŮ
// =====================

const menuItems = document.querySelectorAll('.main-menu-item');
const contentSidebar = document.getElementById('content-sidebar');
const sidebarTitle = document.getElementById('content-sidebar-title');
const settingsPanel = document.getElementById('settingsPanel');
const closeBtn = document.getElementById('content-sidebar-close');

function triggerMapResize() {
    setTimeout(() => {
        map.invalidateSize();
    }, 300);
}

menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const name = item.getAttribute('data-name');
        const tooltipSpan = item.querySelector('.tooltip');
        const title = tooltipSpan ? tooltipSpan.textContent : 'Panel';

        if (item.classList.contains('active') && contentSidebar.classList.contains('open')) {
            item.classList.remove('active');
            contentSidebar.classList.remove('open');
            if (settingsPanel) settingsPanel.classList.remove('open');
            triggerMapResize();
            return;
        }

        menuItems.forEach(mi => mi.classList.remove('active'));
        item.classList.add('active');

        sidebarTitle.textContent = title;
        contentSidebar.classList.add('open');
        if (settingsPanel) settingsPanel.classList.remove('open');

        // Přepínání obsahu bočního panelu
        const homeContent = document.querySelector('.panel-content[data-panel="home"]');
        const vehicleContent = document.querySelector('.panel-content[data-panel="vehicle-list"]');
        const eventsContent = document.querySelector('.panel-content[data-panel="events"]');
        const aboutContent = document.querySelector('.panel-content[data-panel="about"]');
        const settingsContent = document.querySelector('.panel-content[data-panel="settings"]'); // <-- PŘIDÁNO
        const wipContent = document.querySelector('.panel-content[data-panel="work-in-progress"]');

        if (homeContent) homeContent.style.display = 'none';
        if (vehicleContent) vehicleContent.style.display = 'none';
        if (eventsContent) eventsContent.style.display = 'none';
        if (aboutContent) aboutContent.style.display = 'none';
        if (settingsContent) settingsContent.style.display = 'none'; // <-- PŘIDÁNO
        if (wipContent) wipContent.style.display = 'none';

        if (name === 'home') {
            if (homeContent) homeContent.style.display = 'flex';
        } else if (name === 'list') {
            if (vehicleContent) vehicleContent.style.display = 'flex';
        } else if (name === 'events') {
            if (eventsContent) eventsContent.style.display = 'flex';
        } else if (name === 'about') {
            if (aboutContent) aboutContent.style.display = 'flex';
        } else if (name === 'settings') { // <-- PŘIDÁNO
            if (settingsContent) settingsContent.style.display = 'flex';
        } else {
            if (wipContent) wipContent.style.display = 'flex';
        }

        triggerMapResize();
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        contentSidebar.classList.remove('open');
        menuItems.forEach(mi => mi.classList.remove('active'));
        triggerMapResize();
    });
}

document.addEventListener("click", (e) => {
    const panel = document.getElementById("settingsPanel");
    if (panel && !panel.contains(e.target) && !e.target.closest("#main-menu-settings")) {
        panel.classList.remove("open");
        const settingsItem = document.querySelector('[data-name="settings"]');
        if (settingsItem && !contentSidebar.classList.contains('open')) {
            settingsItem.classList.remove("active");
        }
        triggerMapResize();
    }
});

// =====================
// TOGGLES & MAP SWITCH
// =====================

document.addEventListener("change", (e) => {
    const isStops = e.target.id === "toggleStops" || e.target.getAttribute("data-settingskey") === "map_showstops";
    const isVehicle = e.target.id === "toggleVehicle";

    if (isStops) {
        const checked = e.target.checked;
        document.querySelectorAll("#toggleStops, [data-settingskey='map_showstops']").forEach(el => el.checked = checked);

        if (checked) map.addLayer(stopCluster);
        else map.removeLayer(stopCluster);
    }

    if (isVehicle) {
        if (e.target.checked) map.addLayer(marker);
        else map.removeLayer(marker);
    }

    if (e.target.id === "mapStyle") {
        map.removeLayer(lightMap);
        map.removeLayer(darkMap);
        map.removeLayer(aerialMap);

        if (e.target.value === "light") lightMap.addTo(map);
        if (e.target.value === "dark") darkMap.addTo(map);
        if (e.target.value === "aerial") aerialMap.addTo(map);
    }
});

// =====================
// ŘAZENÍ TABULKY PODLE ID
// =====================
document.addEventListener('click', (e) => {
    const sortBtn = e.target.closest('#sort-id-btn');
    if (!sortBtn) return;

    const table = sortBtn.closest('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const icon = document.getElementById('sort-icon');

    let isAscending = sortBtn.getAttribute('data-order') !== 'asc';
    sortBtn.setAttribute('data-order', isAscending ? 'asc' : 'desc');

    if (isAscending) {
        icon.className = 'mdi mdi-arrow-up font-xs';
    } else {
        icon.className = 'mdi mdi-arrow-down font-xs';
    }

    rows.sort((a, b) => {
        const idA = parseInt(a.querySelector('.vehicle-id').textContent.trim(), 10);
        const idB = parseInt(b.querySelector('.vehicle-id').textContent.trim(), 10);

        return isAscending ? idA - idB : idB - idA;
    });

    rows.forEach(row => tbody.appendChild(row));
});

// =====================
// WEBSOCKET
// =====================

try {
    const socket = new WebSocket(CONFIG.wsUrl);

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (!data.lat || !data.lng) return;

        marker.setLatLng([data.lat, data.lng]);

        if (data.line) {
            marker.setIcon(createLineMarker(data.line, data.color || "#ff3b30"));
        }
    };
} catch (e) {
    console.log("WebSocket offline mode.");
}