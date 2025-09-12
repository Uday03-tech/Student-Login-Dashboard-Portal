const form = document.querySelector("form");

// Attach submit handler only if form exists
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (document.title === "Login Page") {
      handleLogin();
    } else if (document.title === "Signup") {
      handleSignup();
    }
  });
}

// -------------------- LOGIN --------------------
function handleLogin() {
  const emailInput = document.querySelector(".field.email input");
  const passwordInput = document.querySelector(".field.password input");

  let valid = true;

  if (emailInput.value.trim() === "") {
    setError(emailInput, "Email can't be blank");
    valid = false;
  } else if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailInput.value)) {
    setError(emailInput, "Enter a valid email address");
    valid = false;
  } else clearError(emailInput);

  if (passwordInput.value.trim() === "") {
    setError(passwordInput, "Password can't be blank");
    valid = false;
  } else if (passwordInput.value.length < 6) {
    setError(passwordInput, "Password must be at least 6 characters");
    valid = false;
  } else clearError(passwordInput);

  if (!valid) return;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    u => u.email === emailInput.value && u.password === passwordInput.value
  );

  if (user) {
    // Store full name and email in sessionStorage
    sessionStorage.setItem("username", user.name);
    sessionStorage.setItem("useremail", user.email);
    window.location.href = "dashboard.html";
  } else {
    alert("Incorrect email or password");
  }
}

// -------------------- SIGNUP --------------------
function handleSignup() {
  const nameInput = document.querySelector(".field.name input");
  const emailInput = document.querySelector(".field.email input");
  const passwordInput = document.querySelector(".field.password input");
  const cpasswordInput = document.querySelector(".field.cpassword input");

  let valid = true;

  if (nameInput.value.trim() === "") {
    setError(nameInput, "Name can't be blank");
    valid = false;
  } else clearError(nameInput);

  if (emailInput.value.trim() === "") {
    setError(emailInput, "Email can't be blank");
    valid = false;
  } else if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailInput.value)) {
    setError(emailInput, "Enter a valid email address");
    valid = false;
  } else clearError(emailInput);

  if (passwordInput.value === "") {
    setError(passwordInput, "Password can't be blank");
    valid = false;
  } else if (passwordInput.value.length < 6) {
    setError(passwordInput, "Password must be at least 6 characters");
    valid = false;
  } else clearError(passwordInput);

  if (cpasswordInput.value === "") {
    setError(cpasswordInput, "Confirm Password can't be blank");
    valid = false;
  } else if (cpasswordInput.value !== passwordInput.value) {
    setError(cpasswordInput, "Passwords do not match");
    valid = false;
  } else clearError(cpasswordInput);

  if (!valid) return;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.some(u => u.email === emailInput.value)) {
    alert("Email already registered!");
    return;
  }

  users.push({
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Please login.");
  window.location.href = "index.html";
}

// -------------------- ERROR HANDLING --------------------
function setError(input, message) {
  const field = input.closest(".field");
  field.classList.add("error");
  field.querySelector(".error-txt").innerText = message;
}

function clearError(input) {
  const field = input.closest(".field");
  field.classList.remove("error");
  field.querySelector(".error-txt").innerText = "";
}

// Show/Hide password toggle
document.querySelectorAll(".toggle-pass").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const input = checkbox.closest(".field").querySelector("input[type='password'], input[type='text']");
    input.type = checkbox.checked ? "text" : "password";
  });
});

// DASHBOARD SESSION
if (document.title === "Student Dashboard") {
  const logoutBtn = document.querySelector(".logout");
  const username = sessionStorage.getItem("username") || "Student Name";
  const useremail = sessionStorage.getItem("useremail") || "email@example.com";

  // If no user in session, redirect back
  if (!sessionStorage.getItem("username") || !sessionStorage.getItem("useremail")) {
    window.location.href = "index.html";
  }

  // Show name and email in Profile Overview
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  if (profileName) profileName.textContent = username;
  if (profileEmail) profileEmail.textContent = useremail;

  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.href = "index.html";
    });
  }
}
// Navbar toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}
