export const formatDate = (d) => {
  const date = new Date(d);
  // Options for formatting
  const options = {
    weekday: "short", // 'Tue'
    year: "numeric", // '2024'
    month: "short", // 'Oct'
    day: "numeric", // '17'
  };
  const timeOptions = {
    hour: "2-digit", // '00'
    minute: "2-digit", // '00'
    hour12: true, // Use 24-hour time
  };
  // Format the date
  const formattedDate = date.toLocaleString("en-US", options);
  const formatedTime = date.toLocaleString("en-US", timeOptions);

  const output = { time: formatedTime, date: formattedDate };
  return output;
};

export const isJoiningDateThisMonth = (member) => {
  const currentDate = new Date();

  // Parse joiningDate from DD-MM-YYYY format
  const [day, month, year] = member.joiningDate.split("-").map(Number);
  const joiningDate = new Date(year, month - 1, day); // Month is 0-indexed

  return (
    currentDate.getMonth() === joiningDate.getMonth() &&
    currentDate.getFullYear() === joiningDate.getFullYear()
  );
};
export let indianCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
export const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // month is zero-indexed
};

export const formatUrl = (url) => {
  const basePath = "C:/code/Gym App/react-app-AK-FIT/public";
  const correctedUrl = url.replace(/\\/g, "/");
  const relativePath = correctedUrl.replace(basePath, "");
  return relativePath;

  // const originalPath = 'C:/code/Gym App/react-app-AK-FIT/backend/image_krishnan.jpg';
  // const truncatedPath = truncatePath(originalPath);
  // console.log(truncatedPath); //
  //   return
};
