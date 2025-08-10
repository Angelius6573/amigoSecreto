let names = [];
        let isDrawing = false;

        function addName() {
            const input = document.getElementById('nameInput');
            const name = input.value.trim();
            
            if (name && !names.includes(name)) {
                names.push(name);
                input.value = '';
                updateNamesList();
                updateDrawButton();
            } else if (names.includes(name)) {
                alert('Este nombre ya está en la lista');
            }
        }

        function removeName(name) {
            names = names.filter(n => n !== name);
            updateNamesList();
            updateDrawButton();
        }

        function updateNamesList() {
            const namesList = document.getElementById('namesList');
            if (names.length === 0) {
                namesList.innerHTML = '<div class="empty-message">Agrega nombres para comenzar el sorteo</div>';
            } else {
                namesList.innerHTML = names.map(name => 
                    `<span class="name-tag">
                        ${name}
                        <button class="remove-btn" onclick="removeName('${name}')">×</button>
                    </span>`
                ).join('');
            }
            const clearBtn = document.querySelector('.clear-btn');
            if (clearBtn) {
                clearBtn.disabled = names.length === 0;
            }
        }

        function updateDrawButton() {
            const drawBtn = document.getElementById('drawBtn');
            const clearBtn = document.querySelector('.clear-btn');
            drawBtn.disabled = names.length < 2;
            if (clearBtn) {
                clearBtn.disabled = names.length === 0;
            }
        }

        function drawName() {
            if (names.length < 2 || isDrawing) return;
            isDrawing = true;
            const resultSection = document.getElementById('resultSection');
            const drawBtn = document.getElementById('drawBtn');
            const clearBtn = document.querySelector('.clear-btn');
            drawBtn.disabled = true;
            if (clearBtn) clearBtn.disabled = true;

            resultSection.innerHTML = '<div class="choosing-box"><span id="choosingText">Eligiendo ganador</span><span id="dots"></span></div>';

            let dots = 0;
            let cycles = 0;
            const maxCycles = 3;
            const dotsSpan = document.getElementById('dots');
            const interval = setInterval(() => {
                dots = (dots + 1) % 4;
                dotsSpan.textContent = '.'.repeat(dots);
                if (dots === 0) cycles++;
                if (cycles === maxCycles) {
                    clearInterval(interval);
                    const randomIndex = Math.floor(Math.random() * names.length);
                    const winner = names[randomIndex];
                    resultSection.innerHTML = `
                        <div class="winner small">
                            🏆 ¡Ganador! 🏆<br>
                            <strong>${winner}</strong>
                        </div>
                    `;
                    isDrawing = false;
                    drawBtn.disabled = false;
                    const removeBtns = document.querySelectorAll('.remove-btn');
                    removeBtns.forEach(btn => {
                        btn.disabled = true;
                        btn.style.pointerEvents = 'none';
                        btn.style.opacity = '0.5';
                    });
                    if (clearBtn) clearBtn.disabled = false;
                }
            }, 500);
        }

        function clearAll() {
            names = [];
            updateNamesList();
            updateDrawButton();
            document.getElementById('resultSection').innerHTML = '';
        }

        document.getElementById('nameInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addName();
            }
        });