import { Button } from "@mui/material"
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Page } from "../../components/Page"
import { store } from "../../store"
import { MainTitle } from "../cart"
import { BrandAdmin } from "../../components/brand/BrandAdmin"
import { AddBrand } from "../../components/brand/AddBrand"
import { dataStore } from "../../store/data"

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
        dataStore.getBrands()
    }, [store.role])
    const addType = () => {
        store.setIsVisibleAddBrand('flex')
    }

    const brands = dataStore.brands || []
    return(
        <div style={{display: visible}}>
            <AddBrand />
            <Page>
                <Wrapper>
                    <MainTitle>Бренды</MainTitle>
                    <Button variant='outlined' onClick={addType}>Добавить бренд</Button>
                    <table>
                        <tbody>
                            <Brands>
                                <TableDiv>ID</TableDiv>
                                <TableDiv>Бренд</TableDiv>
                                <TableDiv>Создано</TableDiv>
                                <TableDiv>Обновлено</TableDiv>
                                <TableDiv>Управление</TableDiv>
                            </Brands>
                            {brands.map((el: any) => {
                                return <BrandAdmin id={el.id} key={el.id} createdAt={el.createdAt} updatedAt={el.updatedAt} name={el.name}/>
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
const Brands = styled.tr`
    display: flex;
    height: 50px;
    margin: 0;
    align-items: center;
`

export default type