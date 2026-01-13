function enableInteractiveMode() {
            localStorage.setItem('camModeActive', 'true');
            camVideo = document.createElement("video");
            camVideo.autoplay = true;
            camVideo.playsInline = true;
            camVideo.muted = true;
            camVideo.style.display = "none"; 
            document.body.appendChild(camVideo);

            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    stream = mediaStream;
                    camVideo.srcObject = stream;
                    camVideo.onloadedmetadata = () => {
                        camVideo.play();
                        s0.init({ src: camVideo });
                        console.log("Camera initialized in Hydra.");
                        btn.textContent = "[Exit Cam Mode]";
                        btn.classList.add("active");
                        interactiveMode = true;
                    };
                })
                .catch(err => {
                    console.warn("Camera not available:", err);
                    btn.textContent = "[Camera Not Available]";
                    setTimeout(() => {
                        btn.textContent = "[Enter Cam Mode]";
                    }, 2000);
                });
        }

        function disableInteractiveMode() {
            localStorage.removeItem('camModeActive');
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            }
            if (camVideo) {
                camVideo.srcObject = null;
                camVideo.remove();
                camVideo = null;
            }
            
            s0.initVideo("https://upload.wikimedia.org/wikipedia/commons/6/6b/Dieta_digital_pode_ser_sa%C3%ADda_para_uso_seguro_da_internet%2C_diz_diretor_da_Safernet.webm");
            
            btn.textContent = "[Enter Cam Mode]";
            btn.classList.remove("active");
            interactiveMode = false;
            console.log("Interactive mode disabled.");
        }

        btn.addEventListener('click', () => {
            if (!interactiveMode) {
                enableInteractiveMode();
            } else {
                disableInteractiveMode();
            }
        });


       window.onload = () => {
            initHydra();
            
            // Auto-enable cam mode if it was active
            if (localStorage.getItem('camModeActive') === 'true') {
                enableInteractiveMode();
            }
        };