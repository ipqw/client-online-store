import { Button } from "@mui/material";
import { observer } from "mobx-react";
import styled from "styled-components";
import { store } from "../store";
import { useState, useEffect } from 'react'
import { dataStore } from "../store/data";
import { useRouter } from "next/router";

export const CartDevice = observer(({deviceId, id}: {deviceId: number, id: number}) => {
    const router = useRouter()
    const [object, setObject] = useState({img: '', name: '', price: '', rating: '', url: ''})
    useEffect(() => {
        fetch(`${store.host}api/device/${deviceId}`)
            .then(res => res.json())
            .then(res => setObject(res))
    }, [])
    const removeFromCart = () => {
        fetch(object.url, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({id})
        })
        .then(res => dataStore.getCart())
    }
    
    return(
        <Wrapper>
            <ImgBlock>
                <Image src={object.url}/>
            </ImgBlock>
            <Desc>
                <About>
                    <Name onClick={() => router.replace(`/${deviceId}`)} className="clickable">{object?.name}</Name>
                    <Price>₽{object?.price}</Price>
                    {store.isAuth ? <Button onClick={removeFromCart}>Убрать из корзины</Button> : null}
                </About>
            </Desc>
        </Wrapper>
    )
})

const Type = styled.p`
    opacity: 50%;
`

const ImgBlock = styled.div`
    display: flex;
    width: 150px;
    height: 150px;
    align-items: center;
    justify-content: space-between;
    @media screen and (min-width: 768px){
        width: 200px;
        height: 200px;
    }
    @media screen and (min-width: 1100px){
        width: 250px;
        height: 250px;
    }
`

const About = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 150px;
    height: 200px;
    @media screen and (min-width: 768px){
        width: 200px;
    }
    @media screen and (min-width: 1100px){
        width: 250px;
    }
`

const Desc = styled.div`
    align-items: center;
    display: flex;
    width: 250px;
    justify-content: space-between;
`
const Wrapper = styled.div`
    width: 150px;
    border-radius: 10px;
    height: 450px;
    background-color: #ffffff;
    margin: 10px;
    height: 350px;
    @media screen and (min-width: 768px){
        width: 200px;
        height: 400px;
    }
    @media screen and (min-width: 1100px){
        width: 250px;
        height: 450px;
    }
`
const Image = styled.img`
    max-width: 150px;
    max-height: 150px;
    display: block;
    margin: 0 auto;
    @media screen and (min-width: 768px){
        max-width: 200px;
        max-height: 200px
    }
    @media screen and (min-width: 1100px){
        max-width: 250px;
        max-height: 250px
    }
`
const Name = styled.h1`
    font-weight: 400;
    margin: 0;
    :hover{
        color: #575757;
    }
`
const Price = styled.p`
    font-weight: 600;
    margin: 0;
`