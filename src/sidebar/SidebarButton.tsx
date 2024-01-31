import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        <Button variant='text' onClick={handleClick}>{buttonLabel}</Button>
      </div>
    </div>

)};

export default SidebarButton;