import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import './App.css';

import Home from './pages/Home';
import Design from './pages/Design';
import Preview from './pages/Preview';
import Demo from './pages/Demo';
import Test from './pages/Test';
import UserList from './components/UserList';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <IsHeader />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
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
  // '/demo'
];
function IsHeader() {
  const { pathname } = useLocation()
  return excludePaths.includes(pathname) ? null : <Header />;
}
function IsFooter() {
  const { pathname } = useLocation()
  return excludePaths.includes(pathname) ? null : <Footer />;
}

export default App;
