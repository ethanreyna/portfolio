import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

interface SidebarButtonProps {
    buttonLabel: string;
    url?: string;
    externalLink?: string;
}


const SidebarButton: React.FC<SidebarButtonProps> = ({buttonLabel, url, externalLink}) => {
    const navigate = useNavigate(); 

    const handleClick = () => {
      if(externalLink){
        window.open(externalLink, '_blank');
      } else if (url){
        navigate(url); 
      }
    };

    return(
    <div className="SidebarButton">
    <div className="relative flex items-center">
        <div className="px-4 py-2 text-black hover:cursor-pointer hover:bg-black hover:text-white bg-white rounded-full" onClick={handleClick}>
          {buttonLabel}
          </div>
    </div>
    </div>

)};

export default SidebarButton;