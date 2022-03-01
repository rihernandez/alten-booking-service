import passwordValidator from "password-validator";

export const schema = new passwordValidator();
schema
  .is()
  .symbols()
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

export const malformedPassword = {
  password: [
    "Must have minimum length 8",
    "Must have maximum length 100",
    "Must have uppercase letters",
    "Must have lowercase letters",
    "Must have at least 2 digits",
    "Should not have spaces",
  ],
};
