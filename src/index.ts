import { NextConfig } from "next";
import { ImageLoader } from "next/image";
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

let config: NextStrapiConfig = {
  breakpoints: {
    large: 1000,
    medium: 750,
    small: 500,
  },
  publicUrl: "http://localhost:1337",
  excludeOrigins: [],
  excludeFiles: [],
};

export class NextStrapiImageLoader {
  static with(nextConfig: StrapiExtendedNextConfig) {
    const loaderPath = path.join(__dirname, "loader.js");

    if (!!nextConfig.strapi?.breakpoints) {
      config.breakpoints = nextConfig.strapi.breakpoints;
    }

    if (!!nextConfig.strapi?.excludeOrigins) {
      config.excludeOrigins = nextConfig.strapi.excludeOrigins;
    }

    if (!!nextConfig.strapi?.publicUrl) {
      config.publicUrl = nextConfig.strapi.publicUrl;
    }

    if (!!nextConfig.strapi?.excludeFiles) {
      config.excludeFiles = nextConfig.strapi.excludeFiles;
    }

    return {
      ...nextConfig,
      images: {
        loaderFile: loaderPath,
        loader: "custom",
        deviceSizes: Object.values(config.breakpoints),
      },
      strapi: config,
    } as StrapiExtendedNextConfig;
  }

  static loader: ImageLoader = ({ src, width }) => {
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
