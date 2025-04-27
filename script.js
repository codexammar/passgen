document.addEventListener("DOMContentLoaded", function() {
  
    // Dark Mode Toggle
    const themeToggle = document.getElementById("themeToggle");
  
    function updateThemeIcon() {
      if (document.documentElement.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️"; // Sun when dark
      } else {
        themeToggle.textContent = "🌙"; // Moon when light
      }
    }
  
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark-mode");
    }
    updateThemeIcon();
  
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark-mode");
      if (document.documentElement.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
      updateThemeIcon();
    });
  
    // ✨ Live Preview Update
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
  
    const previewName = document.getElementById("previewName");
    const previewEmail = document.getElementById("previewEmail");
    const previewPhone = document.getElementById("previewPhone");
  
    nameInput.addEventListener("input", () => {
      previewName.textContent = nameInput.value || "Your Name";
    });
  
    emailInput.addEventListener("input", () => {
      previewEmail.textContent = emailInput.value || "youremail@example.com";
    });
  
    phoneInput.addEventListener("input", () => {
      previewPhone.textContent = phoneInput.value || "123-456-7890";
    });

    // ✨ CropperJS for Profile Photo
    const photoInput = document.getElementById("photo");
    const previewPhoto = document.querySelector(".preview-photo");

    const cropperModal = document.getElementById("cropperModal");
    const cropperImage = document.getElementById("cropperImage");
    const cropButton = document.getElementById("cropButton");
    const cancelCropButton = document.getElementById("cancelCropButton");

    let cropper;

    photoInput.addEventListener("change", function() {
    const file = photoInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
        cropperImage.src = e.target.result;
        cropperModal.classList.remove("hidden");

        if (cropper) {
            cropper.destroy();
        }

        cropper = new Cropper(cropperImage, {
            aspectRatio: 1, // Force circle crop
            viewMode: 1,
            background: false,
            movable: true,
            zoomable: true,
            scalable: false,
            rotatable: false,
            cropBoxResizable: true,
        });
        };
        reader.readAsDataURL(file);
    }
    });

    cropButton.addEventListener("click", function() {
    const croppedCanvas = cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        imageSmoothingQuality: 'high',
    });

    previewPhoto.style.backgroundImage = `url('${croppedCanvas.toDataURL()}')`;
    previewPhoto.style.backgroundSize = "cover";
    previewPhoto.style.backgroundPosition = "center";
    previewPhoto.style.backgroundRepeat = "no-repeat";

    cropper.destroy();
    cropperModal.classList.add("hidden");
    });

    cancelCropButton.addEventListener("click", function() {
    if (cropper) {
        cropper.destroy();
    }
    cropperModal.classList.add("hidden");
    });

    // ✨ Live QR Code Generation
    const websiteInput = document.getElementById("website");
    const previewQR = document.getElementById("previewQR");

    let qr;

    const toggleQR = document.getElementById("toggleQR");
    const qrWrapper = document.querySelector(".qr-wrapper");

    toggleQR.addEventListener("change", () => {
    if (toggleQR.checked) {
        qrWrapper.classList.remove("fade-hidden");
    } else {
        qrWrapper.classList.add("fade-hidden");
    }
    });

    websiteInput.addEventListener("input", () => {
        const url = websiteInput.value.trim();
        
        if (url.length > 0) {
          if (!qr) {
            qr = new QRious({
              element: previewQR,
              size: 120,
              value: url,
            });
          } else {
            qr.value = url;
          }
          if (toggleQR.checked) {
            qrWrapper.classList.remove("fade-hidden"); // Fade in
          }
        } else {
          if (qr) {
            qr = null;
          }
          qrWrapper.classList.add("fade-hidden"); // Fade out
        }
    });
      
    
    // ✨ Alignment Button Live Update Logic
    const alignmentMappings = {
        "alignName": document.getElementById("previewName"),
        "alignEmail": document.getElementById("previewEmail"),
        "alignPhone": document.getElementById("previewPhone")
    };
    
    document.querySelectorAll('.alignment-group').forEach(group => {
        const previewElement = alignmentMappings[group.id];
        
        group.querySelectorAll('.alignment-button').forEach(button => {
        button.addEventListener('click', () => {
            // Unselect other buttons
            group.querySelectorAll('.alignment-button').forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
    
            // Get desired alignment from button
            const alignment = button.getAttribute("data-align");
            
            // Update corresponding preview field
            previewElement.style.textAlign = alignment;
        });
        });
    });
  

      // --- Visibility Toggles ---
        const toggleName = document.getElementById("toggleName");
        const toggleEmail = document.getElementById("toggleEmail");
        const togglePhone = document.getElementById("togglePhone");

        // (Preview elements already declared earlier)

        function updateVisibility() {
        if (toggleName.checked) {
            previewName.classList.remove("hidden");
        } else {
            previewName.classList.add("hidden");
        }

        if (toggleEmail.checked) {
            previewEmail.classList.remove("hidden");
        } else {
            previewEmail.classList.add("hidden");
        }

        if (togglePhone.checked) {
            previewPhone.classList.remove("hidden");
        } else {
            previewPhone.classList.add("hidden");
        }
        }

        // Attach event listeners
        toggleName.addEventListener("change", updateVisibility);
        toggleEmail.addEventListener("change", updateVisibility);
        togglePhone.addEventListener("change", updateVisibility);

        // Call once on page load
        updateVisibility();

        // --- Color Pickers Initialization ---
        // Background Color Picker
        const pickrBackground = Pickr.create({
            el: '#bgColorButton',
            theme: 'classic',
            default: '#ffffff',
            components: {
                preview: true,
                opacity: true,
                hue: true,
                interaction: {
                    hex: true,
                    rgba: true,
                    input: true
                }
            }
        });

        // Update pass preview and Pickr button live
        pickrBackground.on('change', (color) => {
            const hexColor = color.toHEXA().toString();

            // Update pass preview background
            document.querySelector('.pass-preview').style.backgroundColor = color.toRGBA().toString();

            // Force Pickr button update properly
            const button = pickrBackground.getRoot().button;
            if (button) {
                button.style.background = hexColor;
                button.style.backgroundImage = 'none';
            }

            // Force Pickr to apply color internally too
            pickrBackground.applyColor(true);
        });


        // Text Color Picker
        const pickrText = Pickr.create({
            el: '#textColorButton',
            theme: 'classic',
            default: '#000000',
            components: {
                preview: true,
                opacity: true,
                hue: true,
                interaction: {
                    hex: true,
                    rgba: true,
                    input: true
                }
            }
        });

        // Update text fields and Pickr button live
        pickrText.on('change', (color) => {
            const hexColor = color.toHEXA().toString();

            // Update text color live
            document.querySelectorAll('.fade-field').forEach(field => {
                field.style.color = hexColor;
            });

            // Force Pickr button update properly
            const button = pickrText.getRoot().button;
            if (button) {
                button.style.background = hexColor;
                button.style.backgroundImage = 'none';
            }

            // Force Pickr to apply color internally too
            pickrText.applyColor(true);
        });

        function generatePassJson() {
            // Capture user inputs
            const name = nameInput.value || "Your Name";
            const email = emailInput.value || "youremail@example.com";
            const phone = phoneInput.value || "123-456-7890";
            const qrUrl = websiteInput.value || "https://example.com";
        
            // Capture colors
            const bgColor = window.getComputedStyle(document.querySelector('.pass-preview')).backgroundColor || "rgb(255,255,255)";
            const textColor = window.getComputedStyle(document.querySelector('.fade-field')).color || "rgb(0,0,0)";
        
            // Format colors correctly for pass.json (Wallet expects rgb)
            const formattedBgColor = bgColor;
            const formattedTextColor = textColor;
        
            // Build pass.json object
            const passJson = {
                formatVersion: 1,
                passTypeIdentifier: "pass.example.passgen", // Dummy value
                serialNumber: Date.now().toString(), // Unique ID based on time
                teamIdentifier: "ABCDE12345", // Dummy value
                organizationName: "PassGen",
                description: "Generated Pass",
                backgroundColor: formattedBgColor,
                foregroundColor: formattedTextColor,
                labelColor: formattedTextColor,
                logoText: "PassGen",
                barcode: {
                    format: "PKBarcodeFormatQR",
                    message: qrUrl,
                    messageEncoding: "iso-8859-1"
                },
                generic: {
                    primaryFields: [
                        {
                            key: "name",
                            label: "Name",
                            value: name
                        }
                    ],
                    secondaryFields: [
                        {
                            key: "email",
                            label: "Email",
                            value: email
                        }
                    ],
                    auxiliaryFields: [
                        {
                            key: "phone",
                            label: "Phone",
                            value: phone
                        }
                    ]
                }
            };
        
            return passJson;
        }
        function formatColor(colorString) {
            // Make sure colors are formatted as "rgb(r,g,b)"
            const ctx = document.createElement('canvas').getContext('2d');
            ctx.fillStyle = colorString;
            return ctx.fillStyle; // Browser auto-converts to rgb format
        }                

        // --- Create the PKPASS ---
        const downloadPassButton = document.getElementById('generatePass'); // Reuse your button for now
        const downloadImageButton = document.getElementById('downloadPNG');

        async function forceQRToImage() {
            const qrCanvas = document.getElementById('previewQR');
            if (!qrCanvas) return;
        
            // Create an image from the QR canvas
            const qrDataUrl = qrCanvas.toDataURL('image/png');
            const img = new Image();
            img.src = qrDataUrl;
        
            await new Promise(resolve => {
                img.onload = () => {
                    // Replace the canvas with the new image in the DOM
                    qrCanvas.replaceWith(img);
                    img.id = "previewQR"; // Keep the same ID so nothing else breaks
                    resolve();
                };
            });
        }        

        downloadImageButton.addEventListener('click', async () => {
            const passPreview = document.querySelector('.pass-preview');
            const qrCanvas = document.getElementById('previewQR');
        
            // Capture the preview as a canvas
            html2canvas(passPreview, {
                backgroundColor: null,
                scale: 5,
                useCORS: true,
                allowTaint: true
            }).then(capturedCanvas => {
                const ctx = capturedCanvas.getContext('2d');
        
                // Now draw the QR code manually on top
                if (qrCanvas) {
                    const qrRect = qrCanvas.getBoundingClientRect();
                    const previewRect = passPreview.getBoundingClientRect();
        
                    const offsetX = (qrRect.left - previewRect.left) * 5; // Adjust for scale
                    const offsetY = (qrRect.top - previewRect.top) * 5;
                    const width = qrRect.width * 5;
                    const height = qrRect.height * 5;
        
                    ctx.drawImage(qrCanvas, offsetX, offsetY, width, height);
                }
        
                // Create download link
                const image = capturedCanvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = 'wallet-pass.png';
                link.click();
            });
        });


        // Disable button initially
        downloadPassButton.disabled = true;

        // Enable it after cropping a photo
        cropButton.addEventListener('click', function() {
            downloadPassButton.disabled = false;
        });

        downloadPassButton.addEventListener('click', async () => {
            // 1. Generate pass.json
            const passJson = generatePassJson();
            const passJsonString = JSON.stringify(passJson, null, 2);

            // 2. Capture profile picture as blob
            const previewPhoto = document.querySelector('.preview-photo');
            const logoDataUrl = previewPhoto.style.backgroundImage.slice(5, -2); // get inside url('...')
            const logoBlob = await fetch(logoDataUrl).then(r => r.blob());

            // 3. Create dummy icon.png
            const iconCanvas = document.createElement('canvas');
            iconCanvas.width = 29;
            iconCanvas.height = 29;
            const iconCtx = iconCanvas.getContext('2d');
            iconCtx.fillStyle = '#000'; // Black square
            iconCtx.fillRect(0, 0, 29, 29);
            const iconBlob = await new Promise(resolve => iconCanvas.toBlob(resolve, 'image/png'));

            // 4. Setup JSZip
            const zip = new JSZip();
            zip.file('pass.json', passJsonString);
            zip.file('logo.png', logoBlob);
            zip.file('icon.png', iconBlob);

            // 5. Generate manifest.json
            const manifest = {};
            const passJsonHash = sha1(passJsonString);
            manifest['pass.json'] = passJsonHash;

            const logoArrayBuffer = await logoBlob.arrayBuffer();
            manifest['logo.png'] = sha1(new Uint8Array(logoArrayBuffer));

            const iconArrayBuffer = await iconBlob.arrayBuffer();
            manifest['icon.png'] = sha1(new Uint8Array(iconArrayBuffer));

            zip.file('manifest.json', JSON.stringify(manifest, null, 2));

            // 6. Create dummy signature
            zip.file('signature', '');

            // 7. Create .pkpass file
            const pkpassBlob = await zip.generateAsync({ type: 'blob' });

            // 8. Trigger download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pkpassBlob);
            link.download = 'yourpass.pkpass';
            link.click();
        });

  });  