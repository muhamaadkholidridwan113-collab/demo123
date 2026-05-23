document.addEventListener('DOMContentLoaded', () => {
  // --- Uptime Tracker ---
  const startTime = Date.now();
  const uptimeValue = document.getElementById('uptime-value');

  function updateUptime() {
    const elapsed = Date.now() - startTime;
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);

    const pad = (num) => String(num).padStart(2, '0');
    uptimeValue.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  
  setInterval(updateUptime, 1000);
  updateUptime();

  // --- Real-time Metrics Simulation (CPU & RAM) ---
  const cpuValue = document.getElementById('cpu-value');
  const cpuProgress = document.getElementById('cpu-progress');
  const ramValue = document.getElementById('ram-value');
  const ramProgress = document.getElementById('ram-progress');

  let currentCpu = 2.4;
  let currentRam = 42.8;

  function simulateMetrics() {
    // Random walk simulation for organic shifts
    const cpuDelta = (Math.random() - 0.5) * 5; // -2.5% to +2.5%
    const ramDelta = (Math.random() - 0.5) * 2; // -1% to +1%

    currentCpu = Math.max(1.0, Math.min(99.0, currentCpu + cpuDelta));
    currentRam = Math.max(10.0, Math.min(95.0, currentRam + ramDelta));

    // Update CPU DOM
    cpuValue.textContent = `${currentCpu.toFixed(1)}%`;
    cpuProgress.style.width = `${currentCpu}%`;

    // Update RAM DOM
    ramValue.textContent = `${currentRam.toFixed(1)}%`;
    ramProgress.style.width = `${currentRam}%`;
  }

  setInterval(simulateMetrics, 2500);

  // --- Request Counter ---
  const requestsValue = document.getElementById('requests-value');
  const triggerBtn = document.getElementById('trigger-request-btn');
  let totalRequests = Math.floor(Math.random() * 500) + 1000;

  requestsValue.textContent = totalRequests.toLocaleString('id-ID');

  triggerBtn.addEventListener('click', () => {
    totalRequests += 1;
    requestsValue.textContent = totalRequests.toLocaleString('id-ID');
    
    // Add micro-animation effect
    triggerBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      triggerBtn.style.transform = 'scale(1)';
    }, 100);
  });

  // --- Light / Dark Mode Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  
  // Load saved preference or fallback to dark
  const savedMode = localStorage.getItem('theme-mode') || 'dark';
  document.documentElement.setAttribute('data-theme-mode', savedMode);

  themeToggle.addEventListener('click', () => {
    const currentMode = document.documentElement.getAttribute('data-theme-mode');
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme-mode', newMode);
    localStorage.setItem('theme-mode', newMode);

    // Micro-animation spin
    themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
  });

  // --- Color Gradient Customizer ---
  const colorDots = document.querySelectorAll('.color-dot');
  
  // Load saved color theme
  const savedColorTheme = localStorage.getItem('color-theme') || 'aurora';
  document.documentElement.setAttribute('data-color-theme', savedColorTheme);
  
  // Set active dot class
  colorDots.forEach(dot => {
    if (dot.getAttribute('data-theme') === savedColorTheme) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  colorDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      // Remove active class from all
      colorDots.forEach(d => d.classList.remove('active'));
      
      // Add to selected
      const selectedTheme = e.target.getAttribute('data-theme');
      e.target.classList.add('active');
      
      // Apply theme to document
      document.documentElement.setAttribute('data-color-theme', selectedTheme);
      localStorage.setItem('color-theme', selectedTheme);
    });
  });

  // --- API Console Simulator ---
  const fetchApiBtn = document.getElementById('fetch-api-btn');
  const apiOutput = document.getElementById('api-output');

  const dummyDataList = [
    {
      status: "success",
      endpoint: "/api/v1/status",
      latency: "12ms",
      data: {
        server_name: "AetherServer Node-01",
        engine: "Node.js v20.x",
        location: "Localhost",
        environment: "development"
      }
    },
    {
      status: "success",
      endpoint: "/api/v1/users",
      latency: "24ms",
      data: {
        count: 3,
        users: [
          { id: 1, name: "Lukman", role: "Administrator" },
          { id: 2, name: "Budi", role: "Developer" },
          { id: 3, name: "Siti", role: "Viewer" }
        ]
      }
    },
    {
      status: "success",
      endpoint: "/api/v1/sysinfo",
      latency: "45ms",
      data: {
        os: "Darwin / macOS",
        arch: "arm64",
        total_memory_gb: 16,
        free_memory_gb: 6.42
      }
    }
  ];

  fetchApiBtn.addEventListener('click', () => {
    apiOutput.textContent = "// Mengambil data dari server...";
    fetchApiBtn.disabled = true;

    // Simulate network delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * dummyDataList.length);
      const selectedData = dummyDataList[randomIndex];
      
      // Show simulated JSON response
      apiOutput.textContent = JSON.stringify(selectedData, null, 2);
      fetchApiBtn.disabled = false;
      
      // Auto-increment request counter since it's a simulated API request
      totalRequests += 1;
      requestsValue.textContent = totalRequests.toLocaleString('id-ID');
    }, 600);
  });
});
