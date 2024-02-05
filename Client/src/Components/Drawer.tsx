import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import "../../public/Drawer.css"
import { useNavigate } from 'react-router-dom';

export default function Drawer() {
  const navigate = useNavigate()
  const [state, setState] = React.useState({

    left: false,


  });

  const handleDrawerPick = (pick: string) => {
    console.log(pick)
    switch (pick) {
      case 'Home':
        console.log('Home')
        navigate('/')
        break;
      case 'Add Song':
        console.log('Add Song')
        navigate('/add')
        break;
      default:
        break;
    }
  }

  const toggleDrawer =
    (anchor: string, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState((prevState) => ({ ...prevState, [anchor]: open }));
      };

  const list = (anchor: string) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home', "Add Song"].map((text, index) => (
          <ListItem key={text} disablePadding>

            <button onClick={() => handleDrawerPick(text)}>{text}</button>

          </ListItem>
        ))}
      </List>
      <Divider />

    </Box>
  );

  return (
    <div>
      {(['top'] as const).map((anchor: string) => (
        <React.Fragment key={anchor}>
          <MenuSharpIcon fontSize={'large'} className='hamburger' onClick={toggleDrawer(anchor, true)} />
          <SwipeableDrawer
            anchor={anchor as 'left' | 'top' | 'right' | 'bottom'}
            open={state[anchor as keyof typeof state]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}