import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "nextblogtutorial",
  apiKey: process.env.API_KEY,
});
