const lotsEl = document.getElementById("lots");
const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

function card(lot) {
  const status = lot.status?.toLowerCase() === "available" ? "Available" : "Sold";
  const disabled = status === "Sold" ? "aria-disabled='true'" : "";
  const viewMapUrl = lot.location?.lat && lot.location?.lng
    ? `https://www.google.com/maps?q=${lot.location.lat},${lot.location.lng}`
    : (lot.location?.address ? `https://www.google.com/maps?q=${encodeURIComponent(lot.location.address)}` : "#");

  return `
  <article class="card">
    <img src="${lot.image || 'assets/img/placeholder.jpg'}" alt="${lot.title} image" />
    <div class="card-body">
      <h3>${lot.title}</h3>
      <span class="badge">${status}</span>
      <div class="meta">
        ${lot.size_m2 ? `${lot.size_m2} m²` : ""} ${lot.price ? ` • $${lot.price.toLocaleString()}` : ""}
      </div>
      <div class="meta">${lot.location?.address || ""}</div>
      <div class="actions">
        <a class="btn secondary" href="${viewMapUrl}" target="_blank" rel="noopener">View on Map</a>
        <a class="btn" href="#" ${disabled}>I'm Interested</a>
      </div>
    </div>
  </article>`;
}

async function loadLots() {
  try {
    const res = await fetch("data/lots.json");
    const data = await res.json();
    lotsEl.innerHTML = data.map(card).join("");
  } catch (e) {
    lotsEl.innerHTML = "<p>Could not load lots. Please try again.</p>";
    console.error(e);
  }
}

loadLots();
