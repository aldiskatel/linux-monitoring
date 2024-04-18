document.addEventListener('DOMContentLoaded', function() {
    fetchData();
    setInterval(fetchData, 3000); // Update data every 3 seconds
});

function fetchData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Error:', error));
}

function formatSpeed(speed) {
    let formattedSpeed = speed;

    if (speed >= 1000000000) {
        formattedSpeed = (speed / 1000000000).toFixed(2) + " Gbps";
    } else if (speed >= 1000000) {
        formattedSpeed = (speed / 1000000).toFixed(2) + " Mbps";
    } else if (speed >= 1000) {
        formattedSpeed = (speed / 1000).toFixed(2) + " Kbps";
    } else {
        formattedSpeed = speed + " Bps";
    }

    return formattedSpeed;
}

function displayData(data) {
    const systemStats = document.getElementById('system-stats');
    systemStats.innerHTML = `
        <div class="stats-item"><strong>CPU Usage:</strong> ${data.cpu_usage}%</div>
        <div class="stats-item"><strong>RAM Usage:</strong> ${data.ram_usage}%</div>
        <div class="stats-item"><strong>Disk Usage:</strong> ${data.disk_usage}</div>
        <div class="stats-item"><strong>Network:</strong> U <code>${formatSpeed(data.upload_speed)}</code> | D <code>${formatSpeed(data.download_speed)}</code></div>
    `;

    displayNetworkAppUsage(data);
    displayTopProcesses(data);
}

function displayTopProcesses(data) {
    const topProcesses = document.getElementById('top-processes');
    topProcesses.innerHTML = `<h3>Top 5 CPU Consuming Processes</h3>`;
    data.top_processes.forEach(process => {
        const processElement = document.createElement('div');
        processElement.classList.add('top-process');
        processElement.innerHTML = `<strong>${process.name}</strong> (PID: ${process.pid}) - ${process.cpu_percent}% CPU`;
        topProcesses.appendChild(processElement);
    });
}

function displayNetworkAppUsage(data) {
    const networkAppUsage = document.getElementById('network-app-usage');
    networkAppUsage.innerHTML = `<h3>Top 5 Network Consuming Apps</h3>`;
    data.network_app_usage.forEach(app => {
        const appElement = document.createElement('div');
        appElement.classList.add('network-app');
        appElement.innerHTML = `<strong>${app.app_name}</strong> (L: ${app.local_address}, R ${app.remote_address}) - ${app.status}`;
        networkAppUsage.appendChild(appElement);
    });
}