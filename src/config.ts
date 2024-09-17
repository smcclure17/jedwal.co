const env = process.env.ENVIRONMENT ?? "PROD";

export default {
  environment: env,
  apiUrl: env !== "DEV" ? "https://api.jedwal.co" : "http://localhost:8000",
};
