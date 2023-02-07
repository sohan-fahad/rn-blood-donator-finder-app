import jwt_decode from "jwt-decode";

export const tokenDecoded = (token) => {
  return jwt_decode(token);
};
