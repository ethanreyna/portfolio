import Sidebar from '../components/sidebar/Sidebar';
import './Page.css';

const HomePage = () => (
  <div className="mainpage">
    <Sidebar/>
    <header className="mainpage-header">
      <p>
        Ethan's Website
      </p>
    </header>
  </div>
);

export default HomePage;