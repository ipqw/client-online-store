//@ts-nocheck
import { Button, TextField } from "@mui/material"
import styled from "styled-components"
import { dataStore } from "../../store/data"
import { useState } from "react";

export const Param = ({index}: {index: number}) => {
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')    
    return(
        <Wrapper>
            <Title>
                <TextField onChange={(e: any) => setTitle(e.target.value)} label={`Название ${index+1} параметра`} size={'small'} margin={'normal'}/>
                <TextField onChange={(e: any) => setDesc(e.target.value)} fullWidth={true} multiline={true} label={`Значение ${index+1} параметра`} size={'small'} margin={'normal'}/>
            </Title>
            <Button onClick={() => dataStore.changeParam(index, description, title)}>Сохранить параметр</Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    
`
const Title = styled.div`
    display: flex;
    justify-content: space-between;
`