import { Button } from "@mui/material"
import styled from "styled-components"
import { store } from "../../store"
import { dataStore } from "../../store/data"
import { useEffect, useState } from "react"

export const BrandAdmin = (props: {id: number, createdAt: string, updatedAt: string, name: string}) => {
    const id = props.id
    const deleteType = async () => {
        await fetch(`${store.host}api/brand`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({id})
        })
        .catch(err => console.error(err))
        await fetch(`${store.host}api/brand`)
        .then(res => res.json())
        .then(res => dataStore.setBrands(res))
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
                <DeviceText>{id}</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <DeviceText>{props.name}</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <DeviceText>{createdAt}</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <DeviceText>{updatedAt}</DeviceText>
            </DeviceDiv>
            <DeviceDiv>
                <Button onClick={deleteType}>Удалить</Button>
            </DeviceDiv>
        </Wrapper>
    )
}
const Wrapper = styled.tr`
    display: flex;
    height: 200px;
    margin-bottom: 5px;
`

const DeviceText = styled.p`
    word-wrap: break-word;
`
const DeviceDiv = styled.td`
    padding: 0 10px;
    width: 100px;
    border: 1px solid black;
`