import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "orca-ha-orca",
  apiKey: process.env.API_KEY!,
});
