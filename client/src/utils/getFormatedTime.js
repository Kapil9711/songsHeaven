const getFormatedTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return `${min}:${sec}`;
};

export default getFormatedTime;
