# next-strapi-image-loader

This custom image loader seamlessly integrates Strapi apps with Next.js, handling image optimization through Strapi.

## Benefits

✨ Leaves image optimization to Strapi  
✨ No more wrapping every image source with `<Image src={getStrapiUrl(...)} />`, It does it for you.  
✨ Works with any file provider for Strapi

## Getting Started

Install next-strapi-image-loader

```bash
yarn add next-strapi-image-loader
# or
npm install next-strapi-image-loader
```

Modify your `next.config.js`

```js
// next.config.js

const { NextStrapiImageLoader } = require("next-strapi-image-loader");

/** @type {import('next').NextConfig} */
const nextConfig = NextStrapiImageLoader.with({
  reactStrictMode: true,
  // Following options are default options
  strapi: {
    // Breakpoints from your Strapi app see https://docs.strapi.io/dev-docs/plugins/upload#responsive-images
    breakpoints: {
      large: 1000,
      medium: 750,
      small: 500,
    },
    // Public URL of your Strapi App
    publicUrl: "http://localhost:1337",
    // If you are hosting images locally or remotely, this option is used to tell
    // next-strapi-image-loader to ignore those files
    excludeOrigins: [],
    excludeFiles: [],
  },
});

module.exports = nextConfig;
```
