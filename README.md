## next-strapi-image-loader

It's a custom loader that helps you integrate your Strapi apps to Next.js. It does right thing and leaves image optimization to Strapi

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
