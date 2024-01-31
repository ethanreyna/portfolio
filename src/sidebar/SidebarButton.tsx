import { Button } from '@mui/material';

interface SidebarButtonProps {
    buttonLabel: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({buttonLabel}) => (
    <div className="SidebarButton">
      <div>
        <Button variant='text'>{buttonLabel}</Button>
      </div>
    </div>
);

export default SidebarButton;