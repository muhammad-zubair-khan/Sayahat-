// For Production
export const api = `https://sayahat-api.onrender.com/api`;
//For localhost
// export const api = `http://localhost:5000/api`;
export const imageApi = `https://sayahat-api.onrender.com`;

export const ImageUrl = (fileName) => {
  return `${imageApi}/public/${fileName}`;
};
