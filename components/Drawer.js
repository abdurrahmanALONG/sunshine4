import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import TranslateIcon from '@material-ui/icons/Translate';
import EcoIcon from '@material-ui/icons/Eco';
import PersonIcon from '@material-ui/icons/Person';
import CodeIcon from '@material-ui/icons/Code';
import React from 'react';

// styling for drawer
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
  icon: {
    minWidth: "40px",
  },
  logo: {
    cursor: "pointer"
  }
}));

//Categories content
const goalCataegories = [
  {
    catName: "articles",
    sections: [
    ]
  },
  {
    catName: "videos",
    sections: [
    ]
  },
]

export default function MyDrawer(props) {
  // States and functions 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [clickedItemIndex, setClickedItemIndex] = React.useState("");

  const handleClick = (i) => {
    if (open && clickedItemIndex!==i) {
      setClickedItemIndex(i);
    }
    else {
      setClickedItemIndex(i);
      setOpen(!open);
    }

  };

  const iconSwitch = (catName) => {
    switch(catName) {
      case 'articles':
        return <TranslateIcon />
        break;
      
      case 'videos':
        return <EcoIcon />
        break;

      default:
        return <EcoIcon />
    }
  }

  // html - rendered code
  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link href="/">
            <Typography variant="h6" className={classes.logo} noWrap>
              Insights
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
            {goalCataegories.map((cat, i) => (
               <list>
                 <Link key={cat.catName} href={`/${cat.catName}`}>
                    <ListItem button key={cat.catName} >
                      <ListItemIcon className={classes.icon}>
                        {iconSwitch(cat.catName)}
                      </ListItemIcon>
                      <ListItemText primary={`${cat.catName.toUpperCase()}`} />
                    </ListItem>
                </Link>

               </list> 
            ))
            }
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}