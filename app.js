// Mock profiles for Kenya demo
const profiles = [
  { name: "Amina", age: 24, county: "Nairobi", distance: "2.1 km", bio: "Coffee, sunsets & good vibes. Love hiking Ngong Hills.", interests: ["Hiking", "Coffee", "Music"], img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop" },
  { name: "Brian", age: 28, county: "Kiambu", distance: "8.4 km", bio: "Techie by day, nyama choma by night. Looking for genuine connection.", interests: ["Tech", "Food", "Travel"], img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
  { name: "Wanjiku", age: 26, county: "Nairobi", distance: "4.7 km", bio: "Church girl who loves Sheng and good conversation.", interests: ["Church", "Sheng", "Reading"], img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop" },
  { name: "Otieno", age: 31, county: "Kisumu", distance: "340 km", bio: "Lake side life. Fishing, music, and family.", interests: ["Music", "Fishing", "Family"], img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop" },
  { name: "Fatuma", age: 23, county: "Mombasa", distance: "480 km", bio: "Coastal energy. Beach walks and biryani.", interests: ["Beach", "Food", "Dance"], img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop" },
  { name: "Kamau", age: 29, county: "Nakuru", distance: "150 km", bio: "Rift Valley views and outdoor adventures.", interests: ["Adventure", "Photography", "Sports"], img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" }
];

let userLocation = null;

function renderPreview() {
  const stack = document.getElementById("previewCards");
  stack.innerHTML = "";
  profiles.slice(0, 3).forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "profile-card";
    card.style.top = `${i * 12}px`;
    card.style.left = `${i * 8}px`;
    card.style.zIndex = 10 - i;
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div class="card-info">
        <h3>${p.name}, ${p.age}</h3>
        <div class="meta">${p.county} · ${p.distance}</div>
        <p>${p.bio}</p>
        <div class="tags">${p.interests.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
    `;
    stack.appendChild(card);
  });
}

function renderMatches(filterCounty = "", filterAge = "") {
  const grid = document.getElementById("matches");
  grid.innerHTML = "";
  const filtered = profiles.filter(p => {
    if (filterCounty && p.county !== filterCounty) return false;
    if (filterAge) {
      const [min, max] = filterAge.includes("+") ? [36, 99] : filterAge.split("-").map(Number);
      if (p.age < min || p.age > max) return false;
    }
    return true;
  });
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div class="match-info">
        <h3>${p.name}, ${p.age}</h3>
        <div class="meta">${p.county} · ${p.distance}</div>
        <p>${p.bio.slice(0, 80)}...</p>
        <div class="tags">${p.interests.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <button class="btn-primary" style="width:100%;margin-top:0.8rem;" onclick="alert('Demo: Liked ${p.name}! Full matching needs backend.')">Like</button>
      </div>
    `;
    grid.appendChild(card);
  });
  if (!filtered.length) grid.innerHTML = "<p>No matches for these filters yet.</p>";
}

function getLocation() {
  const status = document.getElementById("locationStatus");
  if (!navigator.geolocation) {
    status.textContent = "Geolocation not supported.";
    return;
  }
  status.textContent = "Requesting location...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      status.textContent = `Location found! (${userLocation.lat.toFixed(2)}, ${userLocation.lng.toFixed(2)}) — showing nearby demo profiles.`;
      // In real app, send coords to backend for matching
    },
    (err) => {
      status.textContent = "Location permission denied. Using county filters instead.";
    }
  );
}

document.getElementById("locateBtn").addEventListener("click", getLocation);
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("discover").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("countyFilter").addEventListener("change", (e) => renderMatches(e.target.value, document.getElementById("ageFilter").value));
document.getElementById("ageFilter").addEventListener("change", (e) => renderMatches(document.getElementById("countyFilter").value, e.target.value));
document.getElementById("loginBtn").addEventListener("click", () => alert("Demo login. Real version uses email/phone + OTP or Google."));

renderPreview();
renderMatches();
