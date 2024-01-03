//@ts-nocheck
import { observer } from "mobx-react";
import styled from "styled-components";
import { store } from "../store";
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { dataStore } from "../store/data";

interface IProps{
    id: number;
    name: string;
    img: string;
    price: number;
    rating: number;
    createdAt: string;
    typeId: number;
    brandId: number;
}

export const DeviceCard = observer(({id, name, img, price, rating, brandId, typeId, createdAt}: IProps) => {
    const router = useRouter()
    const [isAddToCart, setIsAddToCart] = useState(dataStore.isInCart(id))
    const type = dataStore.types.find((el: any) => el.id == typeId) || {name: ''}    
    useEffect(() => {
        dataStore.getCart()
        
    }, [])
    const cart: any = dataStore.cart

    const addToCart = () => {
        if(store.isAuth){
            const formData = new FormData()
            formData.append('deviceId', id.toString())
            formData.append('basketId', cart.id)
            fetch(`${store.host}api/basketdevice`, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(res => setIsAddToCart(true))
            dataStore.getCart()
        }
        
    }
    return(
        <Wrapper>
            <ImgBlock>
                <Image src={`${store.host}${img}`}/>
            </ImgBlock>
            <Desc>
                <About>
                    <Type>{type.name}</Type>
                    <Name className="clickable" onClick={() => router.push(`${id}`)}>{name}</Name>
                    <Price>₽{price}</Price>
                </About>
            </Desc>
        </Wrapper>
    )
})

const Type = styled.p`
    opacity: 50%;
    margin: 0;
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
    justify-content: space-evenly;
    width: 150px;
    height: 200px;
    @media screen and (min-width: 768px){
        width: 200px;
        height: 200px;
    }
    @media screen and (min-width: 1100px){
        width: 250px;
        height: 200px;
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
    font-size: 26px;
    margin: 0;
    :hover{
        color: #575757;
    }
`
const Price = styled.p`
    font-weight: 600;
    margin: 0;
`
const Rating = styled.p`
    
`