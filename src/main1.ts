document.addEventListener("DOMContentLoaded", () => {
  // Modal handling
  const openModalButton = document.getElementById('openModal') as HTMLAnchorElement | null;
  const loginModal = document.getElementById('loginModal') as HTMLDivElement | null;
  const closeModalButton = document.getElementById('closeModal') as HTMLButtonElement | null;

  if (openModalButton && loginModal) {
      openModalButton.addEventListener('click', (event: Event) => {
          event.preventDefault(); // Prevent the default anchor behavior
          loginModal.classList.remove('hidden'); // Show the model
      });
  }

  if (closeModalButton && loginModal) {
      closeModalButton.addEventListener('click', () => {
          loginModal.classList.add('hidden'); // Hide the model
      });
  }

  // Form handling
  const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;
  const errorMessage = document.getElementById("errorMessage") as HTMLParagraphElement | null;

  if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const username = (document.getElementById("username") as HTMLInputElement).value;
          const password = (document.getElementById("password") as HTMLInputElement).value;

          // Simple authentication check
          if (username === "admin" && password === "123") {
              window.location.href = "index.html"; // Redirect on success
          } else {
              if (errorMessage) {
                  errorMessage.style.display = "block"; // Show error message
                  errorMessage.textContent = "Invalid username or password.";
              }
          }
      });
  }
});
