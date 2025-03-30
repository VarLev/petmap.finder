import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';
import MapIcon from '@mui/icons-material/Map';

type LayoutProps = {
    children: ReactNode;
    pageType: "map" | "form";
    setPageType: Dispatch<SetStateAction<"map" | "form">>
}

const Layout: FC<LayoutProps> = ({children, pageType, setPageType}) => {
  
  return (
    <div className='bg-[white] w-[calc(100%-200px)] mx-auto rounded-[20px] h-[100%] min-w-[600px]'>
        {children}
        <BottomNavigation
            showLabels
            value={pageType}
            onChange={(_, newValue) => setPageType(newValue)}
            className='rounded-[20px]'
        >
            <BottomNavigationAction value='form' icon={<EditNoteIcon fontSize='large' sx={{color: pageType === 'form' ? "#2F00B6" : 'grey'}}/>} />
            <BottomNavigationAction value='map' icon={<MapIcon fontSize='large' sx={{color: pageType === 'map' ? "#2F00B6" : 'grey'}}/>} />
        </BottomNavigation>
    </div>
  )
}

export default Layout;