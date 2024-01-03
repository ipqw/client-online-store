//@ts-nocheck
import { observer } from "mobx-react";
import Button from '@mui/material/Button';
import { store } from "../store";
import { useRouter } from "next/router";
import { Menu, MenuItem } from "@mui/material";
import { useState } from 'react'

export const HeaderMenu = observer(() => {
    let isAdmin = store.role === 'ADMIN' ? 'block' : 'none'
    const router = useRouter()
    const leaveAccount = () => {
        localStorage.setItem('token', '')
        localStorage.setItem('id', '')
        store.setIsAuth(false)
        store.setRole('USER')
    }
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return(
        <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Аккаунт
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => router.replace('/cart')}>Корзина</MenuItem>
        {isAdmin ? <MenuItem onClick={() => router.replace('/admin')}>Админ панель</MenuItem> : <></>}
        {store.isAuth ? <MenuItem onClick={leaveAccount}>Выйти из аккаунта</MenuItem> : <MenuItem onClick={() => router.replace('/login')}>Войти в аккаунт</MenuItem>}
      </Menu>
    </div>
    )
})