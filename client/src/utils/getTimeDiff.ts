const getTimeDiff = (createdAt: string) => {
  const currentDate = new Date();
  const messageDate = new Date(createdAt);

  const diffInMs = currentDate.getTime() - messageDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return diffInMinutes === 0
      ? "now"
      : `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }
};

export default getTimeDiff;
