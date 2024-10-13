export const formatDate = (joiningDate) => {
  const [day, month, year] = joiningDate.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day); // Month is 0-indexed

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return parsedDate.toLocaleDateString("en-US", options);
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
