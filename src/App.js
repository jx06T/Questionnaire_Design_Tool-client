import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
const Home = lazy(() => import('./pages/Home'));
const Design = lazy(() => import('./pages/Design'));
const Preview = lazy(() => import('./pages/Preview'));
const Demo = lazy(() => import('./pages/Demo'));
const Test = lazy(() => import('./pages/Test'));
// const UserList = lazy(() => import('./components/UserList'));


function App() {
  return (
    <Router>
      <IsHeader />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/users" element={<UserList />} /> */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/test" element={<Test />} />
        <Route path="/design" element={<Design />} />
        <Route path="/preview" element={<Preview />} /> 
      </Routes>
      <IsFooter />
    </Router>
  );
}

const excludePaths = [
  '/users',
  '/design'
];
function IsHeader() {
  const { pathname } = useLocation()
  return excludePaths.includes(pathname) ? null : <Header />;
}
function IsFooter() {
  const { pathname } = useLocation()
  // return excludePaths.includes(pathname) ? null : <Footer />;
  return <Footer />
}

export default App;
