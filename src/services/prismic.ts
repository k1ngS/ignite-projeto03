import * as prismic from "@prismicio/client";
import sm from "../../sm.json";

export const createClient = (config = {}) => {
  try {
    const client = prismic.createClient(process.env.PRISMIC_ACCESS_ENDPOINT, {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      ...config,
    });
  
    
    return client;
  } catch (error) {
    console.error('Error creating Prismic Client: ', error);
    throw error;
  }
};
