const env = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "PROD";

const localConf = {
  environment: env,
  apiUrl: "http://localhost:8000",
  dashUrl: "http://localhost:3000/app",
  homeUrl: "http://localhost:3000",
  stripeCustPortalId: "test_cN25oncgx0WN8fu7ss",
};

const prodConf = {
  environment: env,
  apiUrl: "https://api.jedwal.co",
  dashUrl: "https://app.jedwal.co",
  homeUrl: "https://jedwal.co",
  stripeCustPortalId: "dR65lQeDTar38xO9AA",
};

export default env === "PROD" ? prodConf : localConf;
