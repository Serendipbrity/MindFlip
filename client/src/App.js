import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlashCards from './components/FlashCards';
import Home from './components/Home';
import Login from './components/Login'; 
import SignUp from './components/SignUp';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
       <div data-theme="mytheme">
       <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flashcards" element={<FlashCards />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
      </Router>
      </div>
   </ApolloProvider>
  );
}

export default App;
