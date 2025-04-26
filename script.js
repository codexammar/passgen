document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("themeToggle");
  
    function updateThemeIcon() {
      if (document.documentElement.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️"; // Show Sun when dark
      } else {
        themeToggle.textContent = "🌙"; // Show Moon when light
      }
    }
  
    // On Page Load: check saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark-mode");
    }
    updateThemeIcon();
  
    // When user clicks the theme toggle
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark-mode");
      if (document.documentElement.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
      updateThemeIcon(); // Update button icon
    });
  });
  