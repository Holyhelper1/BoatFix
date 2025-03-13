// export const getPublicIdFromUrl = (url) => {
//     const regex = /\/([^\/]+)\.(jpg|jpeg|png|gif|heic)$/;
//     const match = url.match(regex);
  
//     if (match) {
//       return match[1]; 
//     }
  
//     return null;
//   };

export const getPublicIdFromUrl = (url) => {
  // Убираем экранирование перед символом /
  const regex = /([^\/]+)\.(jpg|jpeg|png|gif|heic)$/;
  const match = url.match(regex);

  if (match) {
      return match[1]; 
  }

  return null;
};


// Пример использования
const imageUrl = "https://res.cloudinary.com/dgdfwffbt/image/upload/v1741779320/y8dteo50bekriyc3ftcz.jpg";
const publicId = getPublicIdFromUrl(imageUrl); // "y8dteo50bekriyc3ftcz"
console.log(publicId);