import { useContext, useEffect, useState } from 'react'
import {
  AppBar,
  Badge,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  Slider,
  Toolbar,
  Typography,
  TextField,
  SelectChangeEvent
} from '@mui/material';

import axios from 'axios';

import { CartProductsContext } from './Contexts/CartProductsContext';

import TopBar from './Components/TopBar';

import {
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import ProductCard from './Components/ProductCard';

type Props = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function App(props: Props) {

  //#region states
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const
    { updateCart } = useContext(CartProductsContext),
    [minPrice, setMinPrice] = useState<number>(0),
    [maxPrice, setMaxPrice] = useState<number>(0),
    [color, setColor] = useState<string>(null!),
    [condition, setCondition] = useState<string>(null!),
    filterString = `?q=&condition=${condition}&color=${color}&min_price=${minPrice}&max_price=${maxPrice}`;

  //#endregion


  useEffect(() => {
    console.log("change");
    axios.get('/products').then(({ data }) => {
        
        console.log(data);
    }).catch((err) => { console.log("Error", err); });
}, []);

  //#region drawer

  const drawerWidth = 240;

  //#region drawer events
  // const handleDrawerClose = () => {
  //   setIsClosing(true);
  //   setMobileOpen(false);
  // }, handleDrawerTransitionEnd = () => {
  //   setIsClosing(false);
  // }, handleDrawerToggle = () => {
  //   if (!isClosing) {
  //     setMobileOpen(!mobileOpen);
  //   }
  // };


  //#endregion

  const container = window !== undefined ? () => window().document.body : undefined;


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}

              </ListItemIcon>
              Price:
              <ListItemText primary={text} />
              <Slider min={0}
                getAriaLabel={() => 'Minimum distance'}
                valueLabelDisplay="auto"
                disableSwap
              />
              <Slider max={10000}
                getAriaLabel={() => 'Minimum distance shift'}
                valueLabelDisplay="auto"
                disableSwap
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  //#endregion

  const currencies = {
    USD: "$",
    ILS: "₪"
  };

  //#region events
  const
    minPriceOnChange = (e: Event, value: any) => setMinPrice(value),
    maxPriceOnChange = (e: Event, value: any) => setMaxPrice(value),
    onAddToCartButtonClick = (_id: number) => updateCart(_id),
    colorSelectOnChange = (e: SelectChangeEvent) => setColor(e.target.value),
    conditionSelectOnChange = (e: SelectChangeEvent) => setCondition(e.target.value);

  //#endregion


  return (
    <>

      <TopBar />

      <Container>
        <Grid container spacing={2}>
          <ProductCard _id={1} title='IPhone 5' currencySymbol={currencies["USD"]} price={100} shippingPrice={10} onAddToCartButtonClick={onAddToCartButtonClick} />
          <ProductCard _id={2} title='IPhone 5' currencySymbol={currencies["USD"]} price={100} shippingPrice={10} onAddToCartButtonClick={onAddToCartButtonClick} />

        </Grid>
      </Container>






      <br />

      <FormControl fullWidth>
        <InputLabel id="color-label">Color</InputLabel>
        <Select labelId="color-label" label="Color" onChange={colorSelectOnChange} value={color} >
          <MenuItem value={"Black"}>Black</MenuItem>
          <MenuItem value={"Gray"}>Gray</MenuItem>
          <MenuItem value={"Red"}>Red</MenuItem>
          <MenuItem value={"Transparent"}>Transparent</MenuItem>
          <MenuItem value={"White"}>White</MenuItem>
          <MenuItem value={"White"}>Yellow</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="condition-label">Condition</InputLabel>
        <Select labelId="condition-label" label="Condition" onChange={conditionSelectOnChange} value={condition}>
          <MenuItem value={"New"}>New</MenuItem>
          <MenuItem value={"Used"}>Used</MenuItem>
        </Select>
      </FormControl>

      <Slider getAriaLabel={() => 'Minimum distance'} value={minPrice} onChange={minPriceOnChange}
        valueLabelDisplay="auto" disableSwap />

      <Slider getAriaLabel={() => 'Minimum distance shift'} value={maxPrice}
        onChange={maxPriceOnChange} valueLabelDisplay="auto" disableSwap />



      {/*
        <Box >
        <CssBaseline />
        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }} >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }} >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders" >
          <Drawer container={container} variant="temporary" open={mobileOpen} onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose} ModalProps={{ keepMounted: true }} sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }} >
            {drawer}
          </Drawer>
          <Drawer variant="permanent" sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }} open >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
          <Toolbar />

        </Box>
      </Box> */}
    </>
  )
}

