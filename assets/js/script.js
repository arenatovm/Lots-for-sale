const lotsEl = document.getElementById("lots");
const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

/** === Config (we'll set this later when we create the API) === */
const API_ENDPOINT = "https://bv3gb8nge7.execute-api.us-east-1.amazonaws.com/"; // <- leave empty for now; we'll fill with API Gateway URL later

function card(lot) {
  const status = lot.status?.toLowerCase() === "available" ? "Available" : "Sold";
  const isSold = status === "Sold";
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
        <button class="btn interest-btn" data-lot-id="${lot.id}" data-lot-title="${lot.title}" ${isSold ? "disabled" : ""}>
          I'm Interested
        </button>
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

/** ========== Modal logic ========== */
const modal = document.getElementById("interest-modal");
const form = document.getElementById("interest-form");
const modalClose = document.getElementById("modal-close");
const cancelBtn = document.getElementById("cancel");
const lotIdInput = document.getElementById("lotId");
const modalSubtitle = document.getElementById("modal-subtitle");
const submitBtn = document.getElementById("submit");

function openModal(lotId, lotTitle) {
  lotIdInput.value = lotId;
  modalSubtitle.textContent = `Inquiry for: ${lotTitle}`;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  form.reset();
}

// open modal from any interest button
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".interest-btn");
  if (btn) {
    openModal(btn.dataset.lotId, btn.dataset.lotTitle);
  }
});

modalClose.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
// close when clicking outside the dialog
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// handle submit (UI-only for now)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    lotId: lotIdInput.value,
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    message: form.message.value.trim()
  };

  // simple client-side validation
  if (!payload.name || !payload.email) {
    alert("Please enter your name and a valid email.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    if (!API_ENDPOINT) {
      // No backend yet: simulate success
      await new Promise(r => setTimeout(r, 700));
    } else {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Request failed");
    }
    alert("Thanks! We received your interest and will contact you soon.");
    closeModal();
  } catch (err) {
    console.error(err);
    alert("Sorry, something went wrong. Please try again.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send";
  }
});
