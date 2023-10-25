export const capitalizeFirstLetter = (text: string) => {
  if (!text || typeof text !== "string") {
    return "";
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const snakeCaseToTitleCase = (text: string) => {
  if (!text || typeof text !== "string") {
    return "";
  }

  let words = text.split("_");

  words = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return "";
  });

  return words.join(" ");
};
