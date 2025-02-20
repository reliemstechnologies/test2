function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because getMonth() returns 0-indexed months
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

module.exports = formatDate;
