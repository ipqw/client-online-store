import { Button } from "@mui/material";
import { observer } from "mobx-react";
import styled from "styled-components";
import { store } from "../store";
import { FC } from 'react'
import { useRouter } from "next/router";
import { dataStore } from "../store/data";

interface IProps{
    id: number;
    name: string;
    url: string;
    price: number;
    rating: number;
    createdAt: string;
    typeId: number;
    brandId: number;
}

export const DeviceCard: FC<IProps> = observer(({id, name, url, price, typeId}) => {
    const router = useRouter()
    const type = dataStore.types.find((el: any) => el.id == typeId) || {name: ''}    
    return(
        <Wrapper>
            <ImgBlock>
                <Image src={url}/>
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