import { NextStrapiImageLoader, StrapiExtendedNextConfig } from "../src";

describe("StrapiNextImageLoader Test", () => {
  let config: StrapiExtendedNextConfig;

  beforeEach(() => {
    config = {
      strapi: {},
    };
  });

  // Resolve: cannot test in current circumstances
  // it("Should use default attributes when not specified", () => {
  //   expect(config.strapi?.excludeOrigins).toEqual([]);
  //   expect(config.strapi?.excludeFiles).toEqual([]);
  //   expect(config.strapi?.publicUrl).toEqual("http://localhost:1337");
  //   expect(config.strapi?.breakpoints).toEqual({
  //     large: 1000,
  //     medium: 750,
  //     small: 500,
  //   });
  // });

  it("Relative links with variety of width should be optimized", () => {
    const smallImage = NextStrapiImageLoader.loader(
      {
        src: "/uploads/test.jpeg",
        width: 64,
      },
      config
    );
    expect(smallImage).toEqual("http://localhost:1337/uploads/small_test.jpeg");

    const mediumImage = NextStrapiImageLoader.loader(
      {
        src: "/uploads/test.jpeg",
        width: 550,
      },
      config
    );
    expect(mediumImage).toEqual(
      "http://localhost:1337/uploads/medium_test.jpeg"
    );

    const largeImage = NextStrapiImageLoader.loader(
      {
        src: "/uploads/test.jpeg",
        width: 850,
      },
      config
    );
    expect(largeImage).toEqual("http://localhost:1337/uploads/large_test.jpeg");

    const defaultImage = NextStrapiImageLoader.loader(
      {
        src: "/uploads/test.jpeg",
        width: 1500,
      },
      config
    );
    expect(defaultImage).toEqual("http://localhost:1337/uploads/test.jpeg");
  });

  it("Files inside excludeFiles should not be considered", () => {
    config = {
      strapi: {
        excludeFiles: ["/uploads/test.jpeg"],
      },
    };

    const defaultImage = NextStrapiImageLoader.loader(
      {
        src: "/uploads/test.jpeg",
        width: 550,
      },
      config
    );
    expect(defaultImage).toEqual("/uploads/test.jpeg");
  });

  it("Links with variety of width should be optimized", () => {
    const smallImage = NextStrapiImageLoader.loader(
      {
        src: "http://example.com/uploads/test.jpeg",
        width: 64,
      },
      config
    );
    expect(smallImage).toEqual("http://example.com/uploads/small_test.jpeg");

    const mediumImage = NextStrapiImageLoader.loader(
      {
        src: "http://example.com/uploads/test.jpeg",
        width: 550,
      },
      config
    );
    expect(mediumImage).toEqual("http://example.com/uploads/medium_test.jpeg");

    const largeImage = NextStrapiImageLoader.loader(
      {
        src: "http://example.com/uploads/test.jpeg",
        width: 850,
      },
      config
    );
    expect(largeImage).toEqual("http://example.com/uploads/large_test.jpeg");

    const defaultImage = NextStrapiImageLoader.loader(
      {
        src: "http://example.com/uploads/test.jpeg",
        width: 1500,
      },
      config
    );
    expect(defaultImage).toEqual("http://example.com/uploads/test.jpeg");
  });

  it("Origins inside excludeOrigins should not be considered", () => {
    config = {
      strapi: {
        excludeOrigins: ["http://example.com"],
      },
    };

    const defaultImage = NextStrapiImageLoader.loader(
      {
        src: "http://example.com/uploads/test.jpeg",
        width: 550,
      },
      config
    );

    expect(defaultImage).toEqual("http://example.com/uploads/test.jpeg");
  });
});
