import { Button } from "@mui/material"
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Page } from "../../components/Page"
import { AddType } from "../../components/type/AddType"
import { TypeAdmin } from "../../components/type/TypeAdmin"
import { store } from "../../store"
import { dataStore } from "../../store/data"
import { MainTitle } from "../cart"

const type = observer(() => {
    const router = useRouter()
    const [visible, setVisible] = useState('none')
    useEffect(() => {
        if(store.role !== 'ADMIN'){
            router.push('/')
        }
        else{
            setVisible('block')
        }
        dataStore.getTypes()
    }, [store.role])
    const addType = () => {
        store.setIsVisibleAddType('flex')
    }
    const types = dataStore.types || []
    return(
        <div style={{display: visible}}>
            <AddType />
            <Page>
                <Wrapper>
                    <MainTitle>Типы</MainTitle>
                    <Button variant='outlined' onClick={addType}>Добавить тип</Button>
                    <table>
                        <tbody>
                            <Types>
                                <TableDiv>ID</TableDiv>
                                <TableDiv>Тип</TableDiv>
                                <TableDiv>Создано</TableDiv>
                                <TableDiv>Обновлено</TableDiv>
                                <TableDiv>Управление</TableDiv>
                            </Types>
                            {types.map((el: any) => {
                                return <TypeAdmin id={el.id} key={el.id} createdAt={el.createdAt} updatedAt={el.updatedAt} name={el.name}/>
                            })}
                        </tbody>
                    </table>
                </Wrapper>
            </Page>
        </div>
    )
})
const TableDiv = styled.td`
    width: 100px;
    height: 50px;
    padding: 0 10px;
    margin: 0;
    border: 0.5px solid black;
    text-align: center;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`
const Types = styled.tr`
    display: flex;
    height: 50px;
    margin: 0;
    align-items: center;
`

export default type