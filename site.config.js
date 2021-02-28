module.exports = {
  siteMetadata: {
    title: "Marco Madera",
    author: {
      name: "Marco Madera",
      image: "/profile.jpg",
      summary: "Desarrollador Frontend por afición",
      email: "me@marcomadera.com",
    },
    description:
      "Comparto mis conocimientos, pensamientos y opiniones sobre la programación",
    siteUrl:
      process.env.NODE_ENV === "production"
        ? "https://marcomadera.com"
        : "http://localhost:3000",
    language: "es-MX",
    logo: "https://marcomadera.com/logo512.png",
    social: {
      twitter: "madera_marco",
      gitHub: "MarcoMadera",
      linkedIn: "marcomadera",
      facebook: "marco.mad.lop",
    },
    postsPerPage: 4,
    commentsPerPost: 5,
  },
  imageCloudProvider: "https://res.cloudinary.com/marcomadera/image/upload",
};
