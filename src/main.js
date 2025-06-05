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
const dataRef = storage.ref('data/sample.json');

async function loadJSON() {
    try {
        // Attempt to load from Firebase Storage
        const url = await dataRef.getDownloadURL();
        const res = await fetch(url);
        return await res.json();
    } catch (err) {
        console.warn('Failed to fetch from Firebase, loading local file', err);
        // Fallback to local data file
        const res = await fetch('../data/sample.json');
        return await res.json();
    }
}

function renderChart(data) {
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.label),
            datasets: [{
                label: 'Value',
                data: data.map(d => d.value),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

(async function() {
    const jsonData = await loadJSON();
    document.getElementById('json-output').textContent = JSON.stringify(jsonData, null, 2);
    renderChart(jsonData);
})();
