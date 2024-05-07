export const apiURL =
  process.env.BACKEND === "express" && process.env.PORT
    ? `http://localhost:${process.env.PORT}`
    : "";
