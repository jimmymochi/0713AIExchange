import config from "../site.config.json";

export const siteConfig = config;

export const siteUrl = (path = "/") =>
  new URL(path, siteConfig.canonicalUrl).toString();

export const siteDisplayDate = siteConfig.date.split("-").join("／");
