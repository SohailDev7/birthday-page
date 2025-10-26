export const calculateAge = () => {
  const birthYear = 2007;
  const today = new Date();
  const birthdayThisYear = new Date(today.getFullYear(), 5, 14); // June 14 (month is 0-indexed)
  let age = today.getFullYear() - birthYear;

  if (today < birthdayThisYear) {
    age--;
  }

  return age;
};

export const isBirthday = () => {
  const today = new Date();
  return today.getMonth() === 5 && today.getDate() === 14; // June 14
};

export const getNextBirthday = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  let nextBirthday = new Date(currentYear, 5, 14); // June 14
  
  if (today > nextBirthday) {
    nextBirthday = new Date(currentYear + 1, 5, 14);
  }
  
  return nextBirthday;
};