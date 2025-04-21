const env = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "PROD";

export default {
  environment: env,
  apiUrl: env !== "DEV" ? "https://api.jedwal.co" : "http://localhost:8000",
  dashUrl:
    env !== "DEV" ? "https://app.jedwal.co" : "http://localhost:3000/app",
  homeUrl: env !== "DEV" ? "https://jedwal.co" : "http://localhost:3000",
  stripeCustPortalId:
    env !== "DEV" ? "dR65lQeDTar38xO9AA" : "test_cN25oncgx0WN8fu7ss",
  stripeProductId:
    env !== "DEV" ? "14keWjajb5n29RCeUU" : "test_dR67vP7iT8dPbny7ss",
};
