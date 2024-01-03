import { Button } from "@mui/material"
import { toJS } from "mobx"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { store } from "../../store"
import { dataStore } from "../../store/data"

interface IProps {
    name: string,
    key: number, 
    id: number,
    price: number,
    rating: number,
    img: string,
    createdAt: string,
    updatedAt: string,
    typeId: number,
    brandId: number,
}


export const DeviceAdmin = observer((props: IProps) => {
    const type = dataStore.getTypeById(props.typeId) || {name: ''}
    const brand = dataStore.getBrandById(props.brandId) || {name: ''}
    const deleteDevice = async () => {
        await fetch(`${store.host}api/device`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({id: props.id})
        })
        .catch(err => console.error(err))
        await fetch(`${store.host}api/device?limit=${dataStore.limit}`)
        .then(res => res.json())
        .then(res => dataStore.setDevices(res))
        .catch(err => console.error(err))
    }
    const [updatedAt, setUpdatedAt] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    useEffect(() => {
        const update = new window.Date(props.updatedAt);
        setUpdatedAt((update.toLocaleString()))
        const create = new window.Date(props.createdAt);
        setCreatedAt((create.toLocaleString()))
    }, [])
    return(
        <Wrapper>
            <DeviceDiv>
                <DeviceText>{props.id}</DeviceText>
            </DeviceDiv>
            <DeviceDivImage>
                <ImgBlock>
                    <Image src={`${store.host}${props.img}`}></Image>   
                </ImgBlock>
            </DeviceDivImage>
            <DeviceDiv>
                <DeviceText>{props.name}</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <DeviceText>{props.price} р.</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <DeviceText>{brand.name}</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <DeviceText>{type.name}</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <DeviceText>{props.rating}</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <DeviceText>{createdAt}</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <DeviceText>{updatedAt}</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <Button onClick={deleteDevice}>Удалить</Button>
            </DeviceDiv>
        </Wrapper>
    )
})

const ImgBlock = styled.div`
    display: flex;
    width: 250px;
    height: 200px;
    justify-content: space-around;
`

const DeviceText = styled.p`
    word-wrap: break-word;
`
const DeviceDivImage = styled.td`
    width: 250px;
    height: 199px;
    border: 1px solid black;
    overflow: hidden;
    padding: 0;
`
const DeviceDiv = styled.td`
    padding: 0 10px;
    width: 100px;
    border: 1px solid black;
`
const Wrapper = styled.tr`
    display: flex;
    height: 200px;
    margin-bottom: 5px;
`
const Image = styled.img`
    max-width: 250px;
    max-height: 200px;
    margin: 0;
    padding: 0;
`