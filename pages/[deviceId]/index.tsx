//@ts-nocheck
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect } from 'react'
import { Box, Button, Tab, Tabs } from "@mui/material";
import { dataStore } from "../../store/data";
import { store } from "../../store";
import { IObject } from "../../types";
import { Page } from "../../components/Page";
import { Reviews } from "../../components/devicePage/Reviews";
import { Properties } from "../../components/devicePage/Properties";

const DevicePage = observer(() => {
    const router = useRouter()
    const id = parseInt(router.query.deviceId as string) || 0;
    const object: IObject = dataStore.device
    const [isAddToCart, setIsAddToCart] = useState(false)
    const type: any = dataStore.getTypeById(object?.typeId)
    const brand: any = dataStore.getBrandById(object?.brandId)
    const ratings = object?.ratings || []
    const addToCart = () => {
        if(store.isAuth){
            const formData = new FormData()
            formData.append('deviceId', id.toString())
            formData.append('basketId', dataStore.cart.id.toString())
            fetch(`${store.host}api/basketdevice`, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(res => setIsAddToCart(true))
            .then(res => dataStore.getCart())
        }
    }

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    useEffect(() => {
        dataStore.getDevice(id)
        dataStore.getTypes()
        dataStore.getBrands()
        dataStore.getCart()
        dataStore.getReviews(id)
        setIsAddToCart(dataStore.isInCart(id))
        store.checkAuth()
    }, [id])
    return(
        <Page>
            <Block>
                <Wrapper>
                    <ImgBlock>
                        <Image src={`${store.host}${object?.img}`} />
                    </ImgBlock>
                    <Info>
                        <Title>{`${type?.name} ${brand?.name} ${object?.name}`}</Title>
                        <PriceDiv>
                            <Price>{object?.price} ₽</Price>
                            <Button onClick={isAddToCart ? () => {} : addToCart} style={{padding: 15}} variant="outlined">{isAddToCart ? 'Добавлено' : 'В корзину'}</Button>
                        </PriceDiv>
                    </Info>
                </Wrapper>
                <Desc>
                    <Box>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Характеристики" />
                            <Tab label="Отзывы" />
                        </Tabs>
                    </Box>
                    {value === 0 ? <Properties info={object?.info} /> : null}
                    {value === 1 ? <Reviews id={id} ratings={ratings} /> : null}
                </Desc>
            </Block>
        </Page>
    )
})

const ImgBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (min-width: 720px){
        width: 400px;
        height: 400px;
    }
    @media screen and (min-width: 850px){
        width: 500px;
        height: 500px;
    }
`

const Desc = styled.div`
    width: 300px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 300px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 15px;
    margin-top: 15px;   
    @media screen and (min-width: 435px){
        width: 400px;
    }
    @media screen and (min-width: 535px){
        width: 500px;
    }
    @media screen and (min-width: 635px){
        width: 600px;
    }
    @media screen and (min-width: 720px){
        width: 700px;
    }
    @media screen and (min-width: 850px){
        width: 800px;
    }
    @media screen and (min-width: 1030px){
        width: 1000px;
    }
    @media screen and (min-width: 1240px){
        width: 1200px;
    }
`
const Wrapper = styled.div`
    background-color: white;
    padding: 10px;
    width: 300px;
    height: 600px;
    padding: 10px;
    margin-top: 30px;
    border-radius: 15px;
    display: block;
    justify-content: space-between;
    @media screen and (min-width: 435px){
        width: 400px;
    }
    @media screen and (min-width: 535px){
        width: 500px;
    }
    @media screen and (min-width: 635px){
        width: 600px;
    }
    @media screen and (min-width: 720px){
        display: flex;
        width: 700px;
        height: 400px;
        margin-top: 100px;
    }
    @media screen and (min-width: 850px){
        width: 800px;
        height: 500px
    }
    @media screen and (min-width: 1030px){
        width: 1000px;
    }
    @media screen and (min-width: 1240px){
        width: 1200px;
    }
`

const Price = styled.div`
    padding: 10px;
    font-weight: 500;
    font-size: 30px;
    background-color: #fcfcfc;
    border-radius: 7px;
    display: inline-block;
`

const PriceDiv = styled.div`
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.2);
    min-width: 100px;
    height: 100px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    justify-content: space-between;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 300px;
    @media screen and (min-width: 435px){
        height: 200px;
    }
    @media screen and (min-width: 720px){   
        height: 100%;
        width: 300px;
    }
    @media screen and (min-width: 850px){
        width: 400px;
    }
    @media screen and (min-width: 1030px){
        width: 600px;
    }
`
const Image = styled.img`
    max-width: 300px;
    max-height: 400px;
    display: block;
    margin: 0 auto;
    @media screen and (min-width: 435px){
        max-width: 400px;
    }
    @media screen and (min-width: 850px){
        max-width: 500px;
        max-height: 500px;
    }
`
const Title = styled.p`
    margin: 0;
    font-size: calc(25px + 0.5vw);
    font-weight: 600;
    text-align: center;
    align-self: flex-start;
    @media screen and (min-width: 720px){
        width: 100%;
    }
`

const Block = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`


export default DevicePage