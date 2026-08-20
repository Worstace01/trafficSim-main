document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('simCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let vehicles = [];
    let nsSignalGreen = true; // true = N/S Green, false = E/W Green
    let signalTimer = 0;

    const vehicleCount = document.getElementById('vehicleCount');
    const avgSpeed = document.getElementById('avgSpeed');
    const signalState = document.getElementById('signalState');
    const flowStatus = document.getElementById('flowStatus');

    const addCarBtn = document.getElementById('addCarBtn');
    const toggleLightBtn = document.getElementById('toggleLightBtn');
    const resetSimBtn = document.getElementById('resetSimBtn');

    class Vehicle {
        constructor(dir) {
            this.dir = dir; // 'NS', 'SN', 'EW', 'WE'
            this.color = ['#38bdf8', '#f43f5e', '#fbbf24', '#a855f7', '#34d399'][Math.floor(Math.random() * 5)];
            this.speed = 2 + Math.random() * 1.5;

            if (dir === 'NS') { this.x = 280; this.y = -20; }
            if (dir === 'SN') { this.x = 310; this.y = 440; }
            if (dir === 'EW') { this.x = -20; this.y = 220; }
            if (dir === 'WE') { this.x = 620; this.y = 190; }
        }

        update() {
            let canMove = true;
            // Stop line check
            if (this.dir === 'NS' && !nsSignalGreen && this.y > 140 && this.y < 160) canMove = false;
            if (this.dir === 'SN' && !nsSignalGreen && this.y < 280 && this.y > 250) canMove = false;
            if (this.dir === 'EW' && nsSignalGreen && this.x > 220 && this.x < 250) canMove = false;
            if (this.dir === 'WE' && nsSignalGreen && this.x < 370 && this.x > 340) canMove = false;

            if (canMove) {
                if (this.dir === 'NS') this.y += this.speed;
                if (this.dir === 'SN') this.y -= this.speed;
                if (this.dir === 'EW') this.x += this.speed;
                if (this.dir === 'WE') this.x -= this.speed;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            if (this.dir === 'NS' || this.dir === 'SN') {
                ctx.roundRect(this.x, this.y, 14, 24, 4);
            } else {
                ctx.roundRect(this.x, this.y, 24, 14, 4);
            }
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initVehicles() {
        vehicles = [];
        for (let i = 0; i < 8; i++) spawnVehicle();
    }

    function spawnVehicle() {
        const dirs = ['NS', 'SN', 'EW', 'WE'];
        vehicles.push(new Vehicle(dirs[Math.floor(Math.random() * dirs.length)]));
    }

    function drawRoads() {
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Asphalt Road Grid
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(260, 0, 80, 420); // N/S Road
        ctx.fillRect(0, 170, 600, 80); // E/W Road

        // Road Lines (Dashed)
        ctx.strokeStyle = '#f8fafc';
        ctx.setLineDash([12, 12]);
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(300, 0); ctx.lineTo(300, 420);
        ctx.moveTo(0, 210); ctx.lineTo(600, 210);
        ctx.stroke();
        ctx.setLineDash([]);

        // Traffic Light Signals
        // N/S Signal
        ctx.fillStyle = nsSignalGreen ? '#10b981' : '#f43f5e';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(245, 155, 8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(355, 265, 8, 0, Math.PI * 2); ctx.fill();

        // E/W Signal
        ctx.fillStyle = nsSignalGreen ? '#f43f5e' : '#10b981';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(245, 265, 8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(355, 155, 8, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
    }

    function animate() {
        drawRoads();

        vehicles.forEach((v, index) => {
            v.update();
            v.draw();
            // Remove offscreen
            if (v.x > 650 || v.x < -30 || v.y > 450 || v.y < -30) {
                vehicles.splice(index, 1);
                spawnVehicle();
            }
        });

        // Update Stats
        if (vehicleCount) vehicleCount.textContent = vehicles.length;
        if (avgSpeed) avgSpeed.textContent = `${Math.round(35 + Math.random() * 10)} km/h`;
        if (signalState) signalState.textContent = nsSignalGreen ? "NORTH-SOUTH GREEN" : "EAST-WEST GREEN";
        if (flowStatus) flowStatus.textContent = vehicles.length > 15 ? "Heavy Congestion" : "Optimal Flow";

        requestAnimationFrame(animate);
    }

    if (addCarBtn) {
        addCarBtn.addEventListener('click', () => {
            for (let i = 0; i < 5; i++) spawnVehicle();
        });
    }

    if (toggleLightBtn) {
        toggleLightBtn.addEventListener('click', () => {
            nsSignalGreen = !nsSignalGreen;
        });
    }

    if (resetSimBtn) {
        resetSimBtn.addEventListener('click', initVehicles);
    }

    initVehicles();
    animate();
});
