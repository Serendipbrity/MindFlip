import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlashCards from './components/FlashCards';
import Home from './components/Home';
import Login from './components/Login'; 
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Stats from './components/Stats';
import Features from './components/Features';
import { useState } from 'react';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  
  return (
    <ApolloProvider client={client}>
       <div data-theme="mytheme">
       <Router>
          <Routes>
            <Route path="/" element={<Home drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />} />
            <Route path="/flashcards" element={<FlashCards />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/features" element={<Features />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </Router>
      </div>
   </ApolloProvider>
  );
}

export default App;
