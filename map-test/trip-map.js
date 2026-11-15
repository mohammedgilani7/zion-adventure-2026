"use strict";

const placeList = document.querySelector("#places");
const detail = document.querySelector("#detail");
const mapStatus = document.querySelector("#map-status");
const placeButtons = new Map();
const orderedPlaces = placeGroups.flatMap(group => group.places);
const pinnedPlaces = orderedPlaces.filter(place => place.point);
const mapCenter = [37.2725735, -112.6451407];
const mapOverview = detail.innerHTML;

let map;
let activePlace = null;
let markers;
let clusters;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function addLink(container, label, href, className) {
  const link = element("a", label, className);
  link.href = href;
  container.append(link);
}

function drivingRoute(destination) {
  const params = new URLSearchParams({ api: "1", destination, travelmode: "driving" });
  return "https://www.google.com/maps/dir/?" + params;
}

function renderPlace(place, inPopup) {
  const fragment = document.createDocumentFragment();
  const title = element(inPopup ? "h3" : "h2", place.name);
  if (!inPopup) title.tabIndex = -1;
  const facts = element("ul", "", "place-facts");
  place.details.forEach(text => facts.append(element("li", text)));
  const actions = element("div", "", "actions");
  if (place.guides.length === 1) {
    addLink(actions, "Full guide", place.guides[0][1], "action primary");
  }
  if (place.shuttle) {
    addLink(actions, "Shuttle information", zionShuttle, "action");
    if (!inPopup) {
      addLink(actions, "Drive to Zion shuttle", drivingRoute(zionVisitorPoint.join(",")), "action");
    }
  } else if (place.point) {
    addLink(actions, "Driving directions", drivingRoute(place.point.join(",")), "action");
  }
  const support = element("div", "", "support-links");
  if (place.guides.length > 1) {
    place.guides.forEach(([name, url]) => addLink(support, name, url));
  }
  if (place.source && (!inPopup || !actions.children.length)) {
    addLink(support, place.sourceLabel || "Official information", place.source);
  }
  fragment.append(title, facts, actions, support);
  return fragment;
}

function selectPlace(place) {
  activePlace = place;
  if (place) detail.replaceChildren(renderPlace(place, false));
  else detail.innerHTML = mapOverview;
  placeButtons.forEach((button, item) => button.setAttribute("aria-pressed", String(item === place)));
}

function markerAt(point, label, value, kind = "") {
  const size = kind === "cluster" ? 42 : 44;
  const icon = L.divIcon({
    className: ("map-marker " + kind).trim(),
    html: String(value),
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
  const marker = L.marker(point, { icon, title: label, alt: label });
  marker.on("add", () => marker.getElement().setAttribute("aria-label", label));
  return marker;
}

function popupFor(place) {
  const content = element("div", "", "place-popup");
  content.append(renderPlace(place, true));
  return content;
}

function openPlace(place) {
  selectPlace(place);
  refreshMarkers();
  const marker = markers.get(place);
  marker.setPopupContent(popupFor(place)).openPopup();
}

function refreshMarkers() {
  clusters.clearLayers();
  const groups = [];
  const zoom = map.getZoom();
  pinnedPlaces.forEach(place => {
    const marker = markers.get(place);
    const projected = map.project(place.point, zoom);
    const alwaysShow = marker.isPopupOpen() || place === activePlace;
    const group = !alwaysShow && groups.find(item => !item.alwaysShow && projected.distanceTo(item.projected) < 52);
    if (group) group.places.push(place);
    else groups.push({ places: [place], projected, alwaysShow });
  });

  groups.forEach(({ places }) => {
    if (places.length === 1) {
      const marker = markers.get(places[0]);
      marker.addTo(map);
      marker.getElement().classList.toggle("is-selected", places[0] === activePlace);
      return;
    }
    const bounds = L.latLngBounds(places.map(place => place.point));
    places.forEach(place => markers.get(place).remove());
    markerAt(bounds.getCenter(), "Zoom to " + places.length + " places", places.length, "cluster")
      .on("click", () => {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17, animate: false });
        if (map.getZoom() === zoom) map.setZoom(Math.min(17, zoom + 1));
      })
      .addTo(clusters);
  });
}

function showMapStatus(message) {
  mapStatus.textContent = message;
  mapStatus.hidden = false;
}

function chooseFromList(place) {
  if (map && place.point) {
    map.closePopup();
    map.setView(place.point, Math.max(map.getZoom(), 13), { animate: false });
    openPlace(place);
    const target = markers.get(place).getPopup().getElement().querySelector("h3");
    target.tabIndex = -1;
    document.querySelector(".map-frame").scrollIntoView({ block: "nearest" });
    target.focus({ preventScroll: true });
  } else {
    selectPlace(place);
    if (map) {
      map.closePopup();
      refreshMarkers();
    }
    detail.scrollIntoView({ block: "nearest" });
    detail.querySelector("h2").focus({ preventScroll: true });
  }
}

placeGroups.forEach(({ name, places }) => {
  const group = element("section", "", "place-group");
  group.append(element("h3", name));
  places.forEach(place => {
    const number = pinnedPlaces.indexOf(place) + 1;
    const symbol = element("span", number ? String(number) : "–", "place-number");
    symbol.setAttribute("aria-hidden", "true");
    const button = element("button", "", "place-button");
    button.type = "button";
    button.append(symbol, element("span", place.name));
    button.addEventListener("click", () => chooseFromList(place));
    placeButtons.set(place, button);
    group.append(button);
  });
  placeList.append(group);
});
selectPlace(null);

try {
  map = L.map("map", { scrollWheelZoom: false, maxZoom: 19 });
  map.setView(mapCenter, 9);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  });
  tiles.on("tileerror", () => showMapStatus("Some map images are unavailable. The place list and guide links still work."));
  tiles.on("loading", () => { mapStatus.hidden = true; });
  tiles.addTo(map);
  clusters = L.layerGroup().addTo(map);
  markers = new Map(pinnedPlaces.map((place, index) => {
    const marker = markerAt(place.point, place.name, index + 1);
    marker.bindPopup(popupFor(place), { minWidth: 170, maxWidth: 255, maxHeight: 236, autoPanPaddingTopLeft: [10, 55], autoPanPaddingBottomRight: [10, 12] });
    marker.on("popupopen", () => {
      selectPlace(place);
      refreshMarkers();
    });
    return [place, marker];
  }));
  map.on("zoomend", refreshMarkers);
  const controls = document.querySelector(".map-controls");
  controls.hidden = false;
  document.querySelector("#overview").addEventListener("click", () => {
    map.closePopup();
    selectPlace(null);
    map.fitBounds(pinnedPlaces.map(place => place.point), { padding: [38, 38], animate: false });
    refreshMarkers();
  });
  document.querySelector("#reset-view").addEventListener("click", () => {
    map.closePopup();
    selectPlace(null);
    map.setView(mapCenter, 9, { animate: false });
    refreshMarkers();
  });
  refreshMarkers();
} catch {
  map = undefined;
  document.querySelector(".map-frame").hidden = true;
  showMapStatus("The map could not load. Choose a place below for its guide and access information.");
}
