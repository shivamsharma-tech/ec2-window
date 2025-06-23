import React from 'react'
import { BrandingWatermark, CurrencyRupee, Difference, ListAlt, LiveHelp, LocalGroceryStore, LocalShipping, Loyalty, Notifications, People, PersonOutline, PriorityHigh, Security, ViewCarousel } from '@mui/icons-material';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/MoveToInbox';


export default function Slidebar({state,onClose}) {

    const Mylink = styled(Link)({
      textDecoration:"none",
      color:"gray"
    })

    const list = (anchor) => (
        <Box
          sx={{ width: 300 }}
          role="presentation"
        >
          <List sx={{ height: "100%", width: "300px" }}>
            <Typography variant='h4' my={3} textAlign={'center'}>Welcome users</Typography>
            {[
              { icon: <InboxIcon />, text: "Dashboard" },
              { icon: <Difference />, text: "Categories",route:"/category" },
              { icon: <BrandingWatermark />, text: "Brands" },
              { icon: <LocalGroceryStore />, text: "Product List",route:"/product" },
              { icon: <ListAlt />, text: "Orders" },
              { icon: <People />, text: "Users" },
              { icon: <PersonOutline />, text: "Customers" },
              { icon: <Notifications />, text: "Notification" },
              { icon: <LiveHelp />, text: "FAQs" },
              { icon: <Security />, text: "Role Permission" },
              { icon: <CurrencyRupee />, text: "Recharge offer" },
              { icon: <LocalShipping />, text: "Shipping" },
              { icon: <Loyalty />, text: "Coupon" },
              { icon: <PriorityHigh />, text: "Information" },
              { icon: <ViewCarousel />, text: "Banner" },
            ].map((text, index) => (
              <Mylink to={text.route}>
              <ListItem key={text} color='black' disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText primary={text.text}/>
                </ListItemButton>
              </ListItem>
              </Mylink>
            ))}
          </List>
        </Box>
      )

    return (
        <Drawer
        // anchor={anchor}
        open={state}
        onClose={onclose}
        onMouseMove={(e) => {
          if (e.pageY < 65 && e.pageX < 298) {
            setState(true)
          }
        }
        }
      >
        {list()}
      </Drawer>
  )
}
