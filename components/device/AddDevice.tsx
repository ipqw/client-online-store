//@ts-nocheck
import { observer } from "mobx-react"
import styled from "styled-components"
import cross from '../../img/58253.png'
import { store } from "../../store"
import { useState } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { dataStore } from "../../store/data";
import { Param } from "./param";

export const AddDevice = observer(() => {
    const visible = store.isVisibleAddDevice ? 'visible' : 'hidden'
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [type, setType] = useState('')
    const [file, setFile] = useState('')

    const addFile = (e: any) => {
        setFile(e.target.files[0])
    }
    const changeName = (e: any) => {
        setName(e.target.value)
    }
    const changePrice = (e: any) => {
        setPrice(e.target.value)
    }
    const changeBrand = (e: any) => {
        setBrand(e.target.value)
    }
    const changeType = (e: any) => {
        setType(e.target.value)
    }
    const closeWindow = () => {
        store.setIsVisibleAddDevice(false)
        dataStore.clearParams()
    }
    const OnSumbit = (event: any) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('img', file)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('brandId', brand)   
        formData.append('typeId', type)
        formData.append('info', JSON.stringify(dataStore.params))
        fetch(`${store.host}api/device`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            dataStore.getDevices()
            store.setIsVisibleAddDevice(false)
        })
        .then(res => dataStore.clearParams())
        .catch(res => console.error(res))
    }
    return(
        <Wrapper style={{visibility: visible}}>
            <AddBlock>
                <CloseButton onClick={closeWindow}>
                    <CloseImage src={cross.src} alt="" />
                </CloseButton>
                <Form>
                    <AddText>Название товара: </AddText>
                    <TextField onChange={changeName} name="name"/>
                    <AddText>Стоимость товара: </AddText>
                    <TextField type={'number'} onChange={changePrice} value={price} name="price"/>
                    <AddText>Бренд товара: </AddText>
                    <Select
                        value={brand}
                        onChange={changeBrand}
                    >
                        {dataStore.brands.map((el: any) => {
                            return(
                                <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                            )
                        })}
                    </Select>
                    <AddText>Тип товара: </AddText>
                    <Select
                        value={type}
                        onChange={changeType}
                    >
                        {dataStore.types.map((el: any) => {
                            return(
                                <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                            )
                        })}
                    </Select>
                    <TextField style={{margin: '20px 0'}} onChange={addFile} type={'file'} />
                    {dataStore.params.map((el) => {
                        return <Param index={el.index} key={el.index}/>
                    })}
                    <Button style={{alignSelf: 'flex-start'}} onClick={() => {dataStore.addParams({index: dataStore.params.length, description: '', title: ''})}}>Добавить свойство</Button>
                    <Button onClick={OnSumbit}>Отправить</Button>
                </Form>
            </AddBlock>
        </Wrapper>
    )
})

const Form = styled.div`
    display: flex;
    flex-direction: column;
`

const SendButton = styled.button`
`

const AddInput = styled.input`
    
`

const CloseImage = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0;
    top: 0;
`

const CloseButton = styled.a`
    
`

const AddText = styled.p`
    
`

const AddBlock = styled.div`
    padding: 15px 25px;
    position: sticky;
    z-index: 1;
    width: 40vw;
    background-color: #f7f7f7;
`

const Wrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
`