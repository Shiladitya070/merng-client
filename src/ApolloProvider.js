import { InMemoryCache, ApolloClient, createHttpLink } from "@apollo/client";

const httplink = createHttpLink({
  uri: "http://localhost:5000",
});

const client = new ApolloClient({
  link: httplink,
  cache: new InMemoryCache(),
});

export { client };
