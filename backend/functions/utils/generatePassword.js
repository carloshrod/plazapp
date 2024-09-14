export const generatePassword = (num) => {
  let lowercase = "abcdefghijklmnopqrstuvwxyz";
  let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numbers = "0123456789";
  let specialChars = "!#$%&?_-";

  const chars = lowercase + uppercase + numbers + specialChars;
  let password = "";

  for (let i = 0; i < num; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
};
