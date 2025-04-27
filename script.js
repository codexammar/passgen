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

    websiteInput.addEventListener("input", () => {
        const url = websiteInput.value.trim();
        if (url.length > 0) {
          if (!qr) {
            qr = new QRious({
                element: previewQR,
                size: 120, // Match the CSS width/height
                value: url,
            });              
          } else {
            qr.value = url;
          }
          document.querySelector(".qr-wrapper").style.display = "inline-block"; // <-- SHOW the wrapper
        } else {
          if (qr) {
            qr = null;
          }
          document.querySelector(".qr-wrapper").style.display = "none"; // <-- HIDE the wrapper
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

        // Helper function to toggle visibility
        function updateVisibility() {
        previewName.style.display = toggleName.checked ? "block" : "none";
        previewEmail.style.display = toggleEmail.checked ? "block" : "none";
        previewPhone.style.display = togglePhone.checked ? "block" : "none";
        }

        // Attach event listeners
        toggleName.addEventListener("change", updateVisibility);
        toggleEmail.addEventListener("change", updateVisibility);
        togglePhone.addEventListener("change", updateVisibility);

        // Call once on page load
        updateVisibility();
            
  });  