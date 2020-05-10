const map = L.map('map', {
    zoomControl: true, maxZoom: 28, minZoom: 1
});

const hash = new L.Hash(map);

map.attributionControl
    .setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');

L.control
    .locate({ locateOptions: { maxZoom: 19 } })
    .addTo(map);

const layerGroup = new L.featureGroup([]);

function setBounds()
{
    if (layerGroup.getLayers().length)
    {
        map.fitBounds(layerGroup.getBounds());
    }
}
const layer_StamenTonerLite_0 = L.tileLayer('http://a.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 22
});

layer_StamenTonerLite_0;
map.addLayer(layer_StamenTonerLite_0);

const timelineImages = [
    '3_1_to_3_8_6.png',
    '3_8_to_3_15_1.png',
    '3_15_3_22_2.png',
    '3_22_to_3_29_3.png',
    '3_29_to_4_5_4.png',
    '4_5_to_4_12_5.png',
];

const bounds = [[39.91080060050416, -74.7631878361313], [41.258722684325505, -73.11208434391962]];

timelineImages.forEach(
    path =>
    {
        const imagePath = `data/${path}`;
        const layer = new L.ImageOverlay(imagePath, bounds);
        layerGroup.addLayer(layer);
    });



const osmGeocoder = new L.Control.Geocoder({
    collapsed: true,
    position: 'topleft',
    text: 'Search',
    title: 'Testing'
}).addTo(map);

document.getElementsByClassName('leaflet-control-geocoder-icon')[0].className += ' fa fa-search';

document.getElementsByClassName('leaflet-control-geocoder-icon')[0].title += 'Search for a place';

setBounds();

L.ImageOverlay.include({
    getBounds: function ()
    {
        return this._bounds;
    }
});

const title = L.DomUtil.create('div', 'timeline-title');
title.style.fontSize = "2rem";
title.style.backgroundColor = "white";
title.style.fontWeight = "bold";
title.style.paddingRight = ".5rem";
title.style.borderBottomRightRadius = ".5rem";
let currentLayer = null;

L.control
    .timelineSlider({
        initializeChange: true,
        timelineItems: [
            "03/01-03/08",
            "03/08-03/15",
            "03/15-03/22",
            "03/22-03/29",
            "03/29-04/05",
            "04/05-04/12"
        ],
        changeMap: params =>
        {
            const { value, label: dateRange } = params;

            currentLayer && map.removeLayer(currentLayer);

            const allLayers = layerGroup.getLayers()

            const targetLayer = allLayers[parseInt(value) - 1] || null;

            currentLayer = targetLayer;

            targetLayer && map.addLayer(targetLayer);

            $(title).html(`NYC NO<sub>2</sub> Air Pollution during COVID-19: ${dateRange}`);
        },
    })
    .addTo(map);


document.querySelector('.leaflet-top.leaflet-left')
    .prepend(title);
