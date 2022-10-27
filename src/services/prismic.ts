import * as prismic from "@prismicio/client";
import sm from "../../sm.json";

export const createClient = (config = {}) => {
  const client = prismic.createClient(process.env.PRISMIC_ACCESS_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return client;
};
