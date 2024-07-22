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

const About = lazy(() => import('./pages/other/AboutJ'));
const Privacy = lazy(() => import('./pages/other/Privacy'));
const Contact = lazy(() => import('./pages/other/ContactJ'));
const NotFound = lazy(() => import('./pages/other/NotFound'));
const CallbackDescription = lazy(() => import('./pages/other/CallbackDescription'));
const Cooperation = lazy(() => import('./pages/other/Cooperation'));
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
        {/* <Route path="/test" element={<Test />} /> */}
        {/* <Route path="/kv-test" element={<KVTest />} /> */}

        <Route path="/design" element={<Design />} />
        <Route path="/preview" element={<Preview />} />

        <Route path="/about" element={<About />} />
        <Route path="/callbackdescription" element={<CallbackDescription />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cooperation" element={<Cooperation />} />

        <Route path="/public/:id" element={<Public />} />
        <Route path="/public" element={<Public />} />
        <Route path="/edit" element={<EditHome />} />
        <Route path="/edit/:id" element={<Edit />} />

        <Route path="*" element={<NotFound />} />
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
