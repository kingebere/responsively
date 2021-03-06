import React from 'react';
import { Router } from '@reach/router';
import { AuthProvider } from './Components/Auth/AuthProvider';
import Navbar from './Components/Navs/Navbar';
import MainPageContent from './Components/Main/MainPageContent';
import Footer from './Components/Footer';
import LogIn from './Components/Auth/LogIn';
import SignUp from './Components/Auth/SignUp';
import ForgotPassword from './Components/Auth/ForgotPassword';
import Collection from './Components/Collection/Collection';
import Upload from './Components/Upload/Upload';
import Album from './Components/Paths/Album';
import SearchResultsAll from './Components/Search/SearchResultsAll';
import Profile from './Components/Profile/Profile';
import AddedBy from './Components/Profile/AddedBy';

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Router>
          <MainPageContent path='/' />
          
          <LogIn path='/login' />
          <SignUp path='/signup' />
          <ForgotPassword path='/forgotPassword' />
          <Collection collection='Collection' path='/collection/:user' />
          <Collection collection='Wishlist' path='/wishlist/:user' />
          <Profile path='/profile/:user' />
          <AddedBy path='/addedBy/:user' />
          <Upload path='/upload' />
          <Album path='albums/:id' />

          <SearchResultsAll path='search/:q/*' />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
