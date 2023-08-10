import Header from './Header.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import './Layout.scss';

function Layout(props) {
  return (
    <div className="layout">
      <Header />
      <Navbar loggedInUser={props.loggedInUser}/>
      <main>
        {
          props.children
        }
      </main>
      <Footer />
    </div>
  );  
}

export default Layout;
