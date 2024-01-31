import './Sidebar.css';
import SidebarButton from './SidebarButton';

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <SidebarButton buttonLabel="home" url="/" />
      <SidebarButton buttonLabel="about" url="/about" />
      <SidebarButton buttonLabel="linkedin" externalLink="https://www.linkedin.com/in/ethan-reyna-1086a314b/" />
      <SidebarButton buttonLabel="resume" url="/" />

    </div>
  );
}

export default Sidebar;


