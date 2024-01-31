import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

interface SidebarButtonProps {
    buttonLabel: string;
    url: string;
}


const SidebarButton: React.FC<SidebarButtonProps> = ({buttonLabel, url}) => {
    const navigate = useNavigate(); 

    const handleClick = () => {
      navigate(url); 
    };

    return(
    <div className="SidebarButton">
      <div>
        <div className="text-black hover:cursor-pointer hover:bg-black rounded-full hover:text-white bg-white px-2 py-2" onClick={handleClick}>{buttonLabel}</div>
      </div>
    </div>

)};

export default SidebarButton;