import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Header from './Header';
import DashboardIcon from '@mui/icons-material/Dashboard';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import ListIcon from '@mui/icons-material/List';
import Link from 'next/link';
import { useRouter } from 'next/router';

const drawerWidth = 240;


function ListTitle(list){
const router = useRouter();
console.log(router.pathname);
  switch(list) {
    case 1:
      return (   router.pathname =="/dashboard" ?   <DashboardIcon sx={{ color: "black"}} /> : <DashboardIcon />  );
      break;
    case 2:

      return (   router.pathname =="/articles" ?   <YoutubeSearchedForIcon sx={{ color: "black"}} /> : <YoutubeSearchedForIcon />  );
        break;  
    case 3:
      return (   router.pathname =="/blogs" ?   <ListIcon sx={{ color: "black"}} /> : <ListIcon />  );
      break;

    default:
      return 'foo';
  }
}

const ls =  [
  { 
      id : 1 , 
      name : 'dashboard',
      path : '/dashboard',
  },
  { 
      id : 2 , 
      name : 'article',
      path : '/articles/',
  },
  { 
      id : 3 , 
      name : 'List Article',
      path : '/blogs',
      
  }
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


  

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// HideOnScroll.propTypes = {
//   children: PropTypes.element.isRequired,
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

const Layout = ({children}) =>{
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (

        <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* <HideOnScroll {...props} /> */}

            <AppBar position="fixed" open={open} style={{ background: 'black'}}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                {/* <Typography variant="h6" noWrap component="div">
                  Mini variant drawer
                </Typography> */}
                
                {/* Header Component Start */}
                
                  <Header  />
                
                {/* Header Component end */}

              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {ls.map((res, index) => (
                  <ListItem button key={res.id}>
                        <Link href={res.path}>
                          <a>
                            <ListItemIcon>
                              {ListTitle(res.id)}
                          </ListItemIcon>
                        </a>
                        </Link>


                       
                        <Link href={res.path}>
                          <a>
                            <ListItemText primary={res.name} /> 
                          </a>
                        </Link>
                       
                       
            </ListItem>   
                ))}
              </List>
              <Divider />
              
              {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List> */}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                
                <main style={{marginTop:50}}>
                  {children}
                </main>


            </Box>
          </Box>
        </>

    );
}



export default Layout;


