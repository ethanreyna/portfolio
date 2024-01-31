import './Sidebar.css';
import SidebarButton from './SidebarButton';

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <SidebarButton buttonLabel="home" url="/" />
      <SidebarButton buttonLabel="about" url="/about" />
      <SidebarButton buttonLabel="about" url="/about" />
    </div>
  );
}

export default Sidebar;


