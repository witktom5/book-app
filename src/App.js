import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/PrivateRoute';

import Search from './pages/Search';
import SearchResults from './pages/SearchResults';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Router>
        <SearchProvider>
          <Layout>
            <Routes>
              <Route path='/' element={<Search />} />
              <Route path='/results' element={<SearchResults />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/profile' element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />} />
              </Route>
            </Routes>
          </Layout>
        </SearchProvider>
      </Router>
      <ToastContainer
        position='top-right'
        autoClose={3500}
        hideProgressBar={true}
        newestOnTop={false}
        theme='colored'
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
