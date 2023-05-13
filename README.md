## next-strapi-image-loader

It's a custom loader that helps you integrate your Strapi apps to Next.js. It does right thing and leaves image optimization to Strapi

## Benefits

1. Leaves image optimization to Strapi
2. No more wrapping every image source with `<Image src={getStrapiUrl(...)} />` it does it for you.
3. Works with any file provider for Strapi

## How to use it

```js
// next.config.js

const { NextStrapiImageLoader } = require("next-strapi-image-loader");

/** @type {import('next').NextConfig} */
const nextConfig = NextStrapiImageLoader.with({
  reactStrictMode: true,
  // Following options are default options
  stripe: {
    breakpoints: {
      large: 1000,
      medium: 750,
      small: 500,
    },
    publicUrl: "http://localhost:1337",
    excludeOrigins: [],
    excludeFiles: [],
  },
});
```
