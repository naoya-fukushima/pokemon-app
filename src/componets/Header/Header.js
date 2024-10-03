import React, { useState } from "react";
import "./Header.css";
import Drawer from "@mui/material/Drawer";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <>
      <nav>
        <Button
          Button
          onClick={() => setDrawerOpened(true)}
          className="humbergerMenu"
        >
          <MenuIcon className="humbergerIcon" />
        </Button>
        <Drawer
          anchor={"left"}
          open={drawerOpened}
          onClose={() => setDrawerOpened(false)}
        >
          <DrawerMenu />
        </Drawer>
        <div className="title">ポケモン図鑑</div>
      </nav>
      ;
    </>
  );
}
