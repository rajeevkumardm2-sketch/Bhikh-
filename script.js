
/*
  अपनी असली UPI जानकारी यहाँ भरो।
  उदाहरण वाली जानकारी को अपनी जानकारी से बदलना जरूरी है।
*/
const UPI_ID = "yourname@upi";
const PAYEE_NAME = "Your Name";

const amountInput = document.getElementById("customAmount");
const payButton = document.getElementById("payButton");
const qrImage = document.getElementById("upiQr");
const toast = document.getElementById("toast");

function showMessage(message) {
  toast.textContent = message;
  toast.style.display = "block";

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// Donation amount buttons
const amountButtons = document.querySelectorAll(".amount");

amountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    amountButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    amountInput.value = button.dataset.amount;
  });
});

// Highlight preset amount when manually entered
amountInput.addEventListener("input", () => {
  amountButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.amount === amountInput.value
    );
  });
});

// Warn if the uploaded QR image is missing
qrImage.addEventListener("error", () => {
  qrImage.alt = "QR image nahi mili. images/upi-qr.png check karein.";
  showMessage("QR image nahi mili. File ka naam aur path check karein.");
});

// Open UPI payment app
payButton.addEventListener("click", () => {
  const amount = Number(amountInput.value);

  if (!UPI_ID || UPI_ID === "yourname@upi" || !UPI_ID.includes("@")) {
    showMessage("script.js mein apni sahi UPI ID bharein.");
    return;
  }

  if (!PAYEE_NAME || PAYEE_NAME === "Your Name") {
    showMessage("script.js mein apna sahi naam bharein.");
    return;
  }

  if (!Number.isFinite(amount) || amount < 1 || amount > 100000) {
    showMessage("₹1 se ₹1,00,000 ke beech sahi amount bharein.");
    return;
  }

  const paymentURL =
    "upi://pay" +
    "?pa=" + encodeURIComponent(UPI_ID) +
    "&pn=" + encodeURIComponent(PAYEE_NAME) +
    "&am=" + encodeURIComponent(amount.toFixed(2)) +
    "&cu=INR" +
    "&tn=" + encodeURIComponent("Voluntary personal support");

  window.location.href = paymentURL;
});
