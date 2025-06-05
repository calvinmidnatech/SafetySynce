// Firebase configuration placeholder
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Change this path to your data file in Firebase Storage
const dataRef = storage.ref('data/driver_hours.json');

async function loadJSON() {
    try {
        // Attempt to load from Firebase Storage
        const url = await dataRef.getDownloadURL();
        const res = await fetch(url);
        return await res.json();
    } catch (err) {
        console.warn('Failed to fetch from Firebase, loading local file', err);
        // Fallback to local data file
        const res = await fetch('../data/driver_hours.json');
        return await res.json();
    }
}

function renderChart(data) {
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Total Hours',
                data: Object.values(data),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function hoursBetween(start, end) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return (eh + em / 60) - (sh + sm / 60);
}

function renderTable(data) {
    const tbody = document.querySelector('#data-table tbody');
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.date}</td>
            <td>${row.clockIn}</td>
            <td>${row.clockOut}</td>
            <td>${row.hours.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

(async function() {
    const rawData = await loadJSON();
    const withHours = rawData.map(r => ({ ...r, hours: hoursBetween(r.clockIn, r.clockOut) }));

    const totals = {};
    withHours.forEach(r => {
        totals[r.name] = (totals[r.name] || 0) + r.hours;
    });

    renderChart(totals);
    renderTable(withHours);
})();
