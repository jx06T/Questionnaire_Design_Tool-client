import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
const Home = lazy(() => import('./pages/Home'));
const Design = lazy(() => import('./pages/Design'));
const Preview = lazy(() => import('./pages/Preview'));
const Demo = lazy(() => import('./pages/Demo'));
const DemoHome = lazy(() => import('./pages/DemoHome'));
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

const Page = (props) => {
  useEffect(() => {
    document.title = props.title + " - JXQDT" || "";
  }, [props.title]);
  return props.children;
};

function App() {
  return (
    <Router>
      <IsHeader />
      <Routes>
        {/* <Route path="/users" element={<UserList />} /> */}
        {/* <Route path="/test" element={<Test />} /> */}
        {/* <Route path="/kv-test" element={<KVTest />} /> */}

        <Route exact path="/" element={<Page title="Home"><Home /></Page>} />

        <Route path="/demo" element={<Page title="Demo"><DemoHome /></Page>} />
        <Route path="/demo/:name" element={<Page title="Demo"><Demo /></Page>} />

        <Route path="/design" element={<Page title="Design"><Design /></Page>} />
        <Route path="/preview" element={<Page title="Preview"><Preview /></Page>} />

        <Route path="/about" element={<Page title="About"><About /></Page>} />
        <Route path="/callbackdescription" element={<Page title="About-CallbackDescription"><CallbackDescription /></Page>} />
        <Route path="/privacy" element={<Page title="Privacy"><Privacy /></Page>} />
        <Route path="/contact" element={<Page title="Contact"><Contact /></Page>} />
        <Route path="/cooperation" element={<Page title="About-Cooperation"><Cooperation /></Page>} />

        <Route path="/public/:id" element={<Page title="Public"><Public /></Page>} />
        <Route path="/public" element={<Page title="Public"><Public /></Page>} />
        <Route path="/edit" element={<Page title="Edit"><EditHome /></Page>} />
        <Route path="/edit/:id" element={<Page title="Edit"><Edit /></Page>} />

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
