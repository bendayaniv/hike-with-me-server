function checkingEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function checkingPassword(password) {
  return password.length >= 6;
}

function checkingPhoneNumber(phoneNumber) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

module.exports = {
  checkingEmail,
  checkingPassword,
  checkingPhoneNumber,
};
