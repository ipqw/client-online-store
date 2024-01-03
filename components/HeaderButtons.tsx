//@ts-nocheck
import { observer } from "mobx-react";
import { useEffect, useState } from 'react'
import styled from "styled-components";
import Button from '@mui/material/Button';
import { store } from "../store";
import { useRouter } from "next/router";

export const HeaderButtons = observer(() => {
    let isAdmin = store.role === 'ADMIN' ? 'block' : 'none'
    const router = useRouter()
    const leaveAccount = () => {
        localStorage.setItem('token', '')
        localStorage.setItem('id', '')
        store.setIsAuth(false)
        store.setRole('USER')
    }
    const redirectAdmin = () => {
        router.replace('/admin')
    }
    return(
        <>
            <Button onClick={() => router.replace('/cart')} style={{marginRight: '10px'}} variant='contained' color='info'>Корзина</Button>
            <Button style={{marginRight: '10px', display: isAdmin}} color='success' variant='contained' onClick={redirectAdmin}>Админ панель</Button>
            {store.isAuth ? <Button onClick={leaveAccount}>Выйти из аккаунта</Button> : <Button variant='outlined' href='/login'>Войти в аккаунт</Button>}
        </>
    )
})
const Wrapper = styled.div`
    
`