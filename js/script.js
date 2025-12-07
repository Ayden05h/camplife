// -----------------------------
// Campus Life Super App JS
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {
    console.log("Campus Life Super App Loaded");

    // -----------------------------
    // 1. WEATHER WIDGET (Home Page)
    // -----------------------------
    const weatherEl = document.getElementById("weather");
    if (weatherEl) {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=33.77&longitude=-118.26&current_weather=true")
            .then(res => res.json())
            .then(data => {
                weatherEl.innerHTML = `Current Temperature: ${data.current_weather.temperature}°C, Wind: ${data.current_weather.windspeed} km/h`;
            })
            .catch(err => {
                weatherEl.innerHTML = "Unable to load weather data.";
                console.error(err);
            });
    }

    // -----------------------------
    // 2. EVENTS PAGE
    // -----------------------------
    const eventsList = document.getElementById("eventsList");
    const fallbackEvent = document.getElementById("fallbackEvent");

    if (eventsList) {
        // Example events (replace with external API if desired)
        const events = [
            { name: "Spring Festival", date: "2025-04-15", location: "Campus Quad" },
            { name: "Tech Talk", date: "2025-04-20", location: "Auditorium" },
            { name: "Art Exhibit", date: "2025-04-25", location: "Art Building" }
        ];

        // Hide fallback card
        if (fallbackEvent) fallbackEvent.style.display = "none";

        // Render events dynamically
        events.forEach(evt => {
            const col = document.createElement("div");
            col.className = "col-md-4";

            const card = document.createElement("article");
            card.className = "card p-3 shadow-sm h-100";

            card.innerHTML = `
                <h3 class="h5">${evt.name}</h3>
                <p>Date: ${evt.date}</p>
                <p>Location: ${evt.location}</p>
                <button class="btn btn-primary rsvpBtn">RSVP</button>
            `;

            col.appendChild(card);
            eventsList.appendChild(col);

            // RSVP Button
            const btn = card.querySelector(".rsvpBtn");
            btn.addEventListener("click", () => {
                alert(`You have RSVPed for "${evt.name}"!`);
            });
        });
    }

    // -----------------------------
    // 3. CLUBS PAGE
    // -----------------------------
    const clubsContainer = document.getElementById("clubsContainer");
    const fallbackClub = document.getElementById("fallbackClub");
    const clubSearch = document.getElementById("clubSearch");

    if (clubsContainer) {
        // Example clubs (replace with external API if desired)
        let clubs = [
            { name: "Coding Club", description: "Learn to code together." },
            { name: "Marvel Club", description: "Explore Superheros." },
            { name: "Music Club", description: "Come listen and Jam with us." },
            { name: "Intermural Sports Club", description: "Play and compete with other colleges." }
        ];

        // Hide fallback card
        if (fallbackClub) fallbackClub.style.display = "none";

        function renderClubs(list) {
            clubsContainer.innerHTML = "";
            list.forEach(club => {
                const col = document.createElement("div");
                col.className = "col-md-4";

                const card = document.createElement("article");
                card.className = "card shadow-sm p-3 h-100";

                card.innerHTML = `
                    <h3 class="h5">${club.name}</h3>
                    <p>${club.description}</p>
                    <button class="btn btn-success joinBtn">Join Club</button>
                `;

                col.appendChild(card);
                clubsContainer.appendChild(col);

                // Join button
                const btn = card.querySelector(".joinBtn");
                btn.addEventListener("click", () => {
                    alert(`You joined "${club.name}"!`);
                });
            });
        }

        renderClubs(clubs);

        // -----------------------------
        // 4. CLUB SEARCH FILTER
        // -----------------------------
        if (clubSearch) {
            clubSearch.addEventListener("input", e => {
                const query = e.target.value.toLowerCase();
                const filtered = clubs.filter(club => club.name.toLowerCase().includes(query));
                renderClubs(filtered);
            });
        }
    }
});
