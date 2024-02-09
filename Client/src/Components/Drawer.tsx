import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

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
      sx={{ width: "100%", backgroundColor: "#343434" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
     
    >
      <List style={{ display: "flex", flexDirection: "column", gap: 15 }} >
        {['Home', "Add Song"].map((text, index) => (
          <ListItem key={text} disablePadding >

            <button className={'drawer-item'}  onClick={() => handleDrawerPick(text)}>{text}</button>

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
          <MenuSharpIcon style={{scale: "3"}} fontSize={'inherit'} className='hamburger' onClick={toggleDrawer(anchor, true)} />
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