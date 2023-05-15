import { NextConfig } from "next";
import { ImageLoaderProps } from "next/image";
import * as path from "path";

interface NextStrapiConfig {
  breakpoints: Record<string, number>;
  publicUrl: string;
  excludeOrigins: string[];
  excludeFiles: string[];
}

export interface StrapiExtendedNextConfig extends NextConfig {
  strapi?: Partial<NextStrapiConfig>;
}

export class NextStrapiImageLoader {
  private static completeConfiguration(
    strapiConfig: Partial<NextStrapiConfig> = {}
  ) {
    if (!strapiConfig.breakpoints) {
      strapiConfig.breakpoints = {
        large: 1000,
        medium: 750,
        small: 500,
      };
    } else {
      strapiConfig.breakpoints = strapiConfig.breakpoints;
    }

    if (!strapiConfig.excludeOrigins) {
      strapiConfig.excludeOrigins = [];
    } else {
      strapiConfig.excludeOrigins = strapiConfig.excludeOrigins;
    }

    if (!strapiConfig.publicUrl) {
      strapiConfig.publicUrl = "http://localhost:1337";
    } else {
      strapiConfig.publicUrl = strapiConfig.publicUrl;
    }

    if (!strapiConfig.excludeFiles) {
      strapiConfig.excludeFiles = [];
    } else {
      strapiConfig.excludeFiles = strapiConfig.excludeFiles;
    }

    return strapiConfig;
  }

  static with(nextConfig: StrapiExtendedNextConfig) {
    let loaderPath = path.join(
      "node_modules",
      "next-strapi-image-loader",
      "dist",
      "loader.js"
    );
    const strapiConfig = this.completeConfiguration(nextConfig["strapi"]);

    return {
      ...nextConfig,
      images: {
        ...nextConfig["images"],
        loaderFile: loaderPath,
        loader: "custom",
        deviceSizes: Object.values(strapiConfig.breakpoints),
      },
    } as StrapiExtendedNextConfig;
  }

  static loader = (
    { src, width }: ImageLoaderProps,
    mockConfig?: StrapiExtendedNextConfig
  ) => {
    let nextConfig: StrapiExtendedNextConfig;
    if (process.env.NODE_ENV === "test") {
      nextConfig = mockConfig;
    } else {
      nextConfig = require("next.config.js").strapi;
    }

    const config = this.completeConfiguration(nextConfig["strapi"]);

    const breakPoint = Object.entries(config.breakpoints)
      .reverse()
      .find((breakPoint) => {
        const breakPointWidth = breakPoint[1];
        return breakPointWidth >= width;
      });

    const size = breakPoint ? breakPoint[0] + "_" : "";

    if (src.startsWith("http://") || src.startsWith("https://")) {
      const { origin, pathname } = new URL(src);
      if (!config.excludeOrigins.includes(origin)) {
        const {
          dir: rest,
          name: fileName,
          ext: extension,
        } = path.parse(pathname);
        return origin + rest + "/" + size + fileName + extension;
      } else {
        return src;
      }
    } else {
      if (!config.excludeFiles.includes(src)) {
        const { dir: rest, name: fileName, ext: extension } = path.parse(src);
        return config.publicUrl + rest + "/" + size + fileName + extension;
      } else {
        return src;
      }
    }
  };
}
