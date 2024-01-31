import Sidebar from '../components/sidebar/Sidebar';
import './Page.css';

const AboutPage = () => (
  <div className="mainpage">
    <Sidebar/>
    <header className="mainpage-header">
      <p>
        About page
      </p>
    </header>
  </div>
);

export default AboutPage;