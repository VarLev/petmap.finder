import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

type LayoutProps = {
    children: ReactNode;
    pageType: "map" | "form";
    setPageType: Dispatch<SetStateAction<"map" | "form">>
}

const Layout: FC<LayoutProps> = ({children, pageType, setPageType}) => {
  return (
    <div className='bg-[white] w-[400px] rounded-[20px] h-[100%]'>
        {children}
        <BottomNavigation
            showLabels
            value={pageType}
            onChange={(_, newValue) => setPageType(newValue)}
            className='rounded-[20px]'
        >
            <BottomNavigationAction value='form' icon={<>Форма</>} />
            <BottomNavigationAction value='map' icon={<>Карта</>} />
        </BottomNavigation>
    </div>
  )
}

export default Layout;