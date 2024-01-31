import Sidebar from '../sidebar/Sidebar';
import './HomePage.css';

const HomePage = () => (
  <div className="homepage">
    <Sidebar/>
    <header className="homepage-header">
      <p>
        Ethan's Website
      </p>
    </header>
  </div>
);

export default HomePage;