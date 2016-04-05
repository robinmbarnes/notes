export const getLeftForElement = (el) =>
  (el.offsetLeft - el.scrollLeft + el.clientLeft);

export const getTopForElement = (el) =>
  (el.offsetTop - el.scrollTop + el.clientTop);
