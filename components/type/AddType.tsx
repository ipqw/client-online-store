import { Button, TextField } from "@mui/material"
import { observer } from "mobx-react"
import styled from "styled-components"
import cross from '../../img/58253.png'
import { useState } from "react";
import { store } from "../../store"
import { dataStore } from "../../store/data";

export const AddType = observer(() => {
    const [name, setName] = useState('')
    const changeName = (e: any) => {
        setName(e.target.value)
    }
    const OnSumbit = (event: any) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        fetch(`${store.host}api/type`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            dataStore.getTypes()
            store.setIsVisibleAddType('none')
        }) 
        .catch(res => console.error(res))
    }
    return(
        <Wrapper style={{display: store.isVisibleAddType}}>
            <AddBlock>
                <CloseButton onClick={() => store.setIsVisibleAddType('none')}>
                    <CloseImage src={cross.src} alt="" />
                </CloseButton>
                <Form onSubmit={OnSumbit}>
                    <AddText>Название типа: </AddText>
                    <TextField required onChange={changeName} name="name"/>
                    <Button type={'submit'}>Отправить</Button>
                </Form>
            </AddBlock>
        </Wrapper>
    )
})


const Form = styled.form`
    display: flex;
    flex-direction: column;
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
    position: fixed;
    z-index: 1;
    width: 40vw;
    height: 80vh;
    background-color: #f7f7f7;
`


const Wrapper = styled.div`
    position: fixed;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
`