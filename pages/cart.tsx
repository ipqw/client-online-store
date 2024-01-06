import { observer } from "mobx-react"
import Link from "next/link"
import { useEffect } from "react"
import styled from "styled-components"
import { CartDevice } from "../components/CartDevice"
import { Page } from "../components/Page"
import { store } from "../store"
import { dataStore } from "../store/data"

const cart = observer(() => { 
    const cart: any = dataStore.cart
    const devices: any = cart.basket_devices || []
    useEffect(() => {
        if(!dataStore.cart?.id || dataStore.cart.userId !== Number(localStorage.getItem('id'))){
            dataStore.getCart()
            store.checkAuth()
        }
    }, [dataStore.cart])
    
    return(
        <Page>
            <MainTitle>Корзина</MainTitle>
            <DevicesDiv>
                {store.isAuth ? null : <MainText>Вы не зашли в аккаунт. <Link href={'/login'}>Войдите</Link></MainText>}
                {store.isAuth ? devices.length ? <p></p> : <MainText>Вы пока еще ничего не добавили в корзину</MainText> : ''}
                {store.isAuth ? devices.map((el: any) => {
                    return <CartDevice key={el.id} id={el.id} deviceId={el.deviceId}/>
                }) : null}
            </DevicesDiv>
        </Page>
    )
})
export const MainTitle = styled.p`
    font-weight: 600;
    font-size: 26px;
`

export const MainText = styled.p`
    font-size: 20px;
    color: black;
    font-weight: 400;
`
const DevicesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export default cart