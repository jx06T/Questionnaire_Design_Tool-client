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
const KVTest = lazy(() => import('./pages/KVTest'));
const Edit = lazy(() => import('./pages/Edit'));
const EditHome = lazy(() => import('./pages/EditHome'));
const Public = lazy(() => import('./pages/Public'));
// const UserList = lazy(() => import('./components/UserList'));


function App() {
  return (
    <Router>
      <IsHeader />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/demo" element={<Demo />} />
        <Route path="/demo/:name" element={<Demo />} />

        {/* <Route path="/users" element={<UserList />} /> */}
        <Route path="/test" element={<Test />} />
        <Route path="/kv-test" element={<KVTest />} />

        <Route path="/design" element={<Design />} />
        <Route path="/preview" element={<Preview />} />

        <Route path="/public/:id" element={<Public />} />
        <Route path="/public" element={<Public />} />
        <Route path="/edit" element={<EditHome />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
      <IsFooter />
    </Router>
  );
}

const excludePaths = [
  '/users',
  '/design',
  '/edit/',
];

function IsHeader() {
  const { pathname } = useLocation();
  const shouldExclude = excludePaths.some(path => pathname.startsWith(path));
  return shouldExclude ? null : <Header />;
}

function IsFooter() {
  const { pathname } = useLocation()
  // return excludePaths.includes(pathname) ? null : <Footer />;
  return <Footer />
}

export default App;
