import generateUniqueId from "generate-unique-id";

export const generateAlphaNumericUniqueId = (
    length: number = 20,
    useLetters: boolean = true,
    useNumbers: boolean = true,
) => {
  return generateUniqueId({
    length,
    useLetters,
    useNumbers,
  });
};