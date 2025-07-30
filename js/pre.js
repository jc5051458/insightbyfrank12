// Hide preloader when window is fully loaded
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");
  
    // Wait a little for fade-out to finish
    setTimeout(() => {
      preloader.style.display = "none";
      mainContent.style.display = "block";
    }, 4000); // Match CSS fadeOut duration + delay
  });