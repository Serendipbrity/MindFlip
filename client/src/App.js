
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import FlashCards from './components/FlashCards';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
       <div className="App">
        <FlashCards/>
      </div>
   </ApolloProvider>
  );
}

export default App;
