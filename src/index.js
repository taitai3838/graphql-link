const { GraphQLServer } = require("graphql-yoga");

// defined data
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  },
  {
    id: "link-1",
    url: "www.graphql.com",
    description: "Fullstack GraphQL"
  },
  {
    id: "link-2",
    url: "www.gra.com",
    description: " GraphQL"
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    feed: () => links,
    //filter only id you want
    link: (root, args) => {
      let link = links.filter(function(value) {
        return value.id === args.id;
      });
      return link[0];
    }
  },
  Mutation: {
    // 2
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    //filter link and update it
    updateLink: (root, args) => {
      let link = links.filter(function(value) {
        return value.id == args.id;
      });
      link[0].url = args.url;
      link[0].description = args.description;
      return link[0];
    },
    //filter out id you don't want
    deleteLink: (root, args) => {
      let link = links.filter(function(value) {
        return value.id !== args.id;
      });
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
