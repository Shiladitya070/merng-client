import { InMemoryCache, ApolloClient, createHttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";

const httplink = createHttpLink({
  uri: "https://merng-backend.fly.dev/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwttoken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httplink),
  cache: new InMemoryCache(),
});

export { client };
