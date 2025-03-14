export const getPublicIdFromUrl = (url) => {  
  const regex = /([^\/]+)\.(jpg|jpeg|png|gif|heic)$/;
  const match = url.match(regex);

  if (match) {
      return match[1]; 
  }

  return null;
};