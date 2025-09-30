export const removeKeyFromLocalStorage = (key: string = "bInfo") => {
  localStorage.removeItem(key);
  return;
};
