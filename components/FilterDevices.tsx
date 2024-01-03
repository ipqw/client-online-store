//@ts-nocheck
import { Input, MenuItem, Select } from "@mui/material"
import { observer } from "mobx-react"
import styled from "styled-components"
import { filterStore } from "../store/filter"
import { dataStore } from "../store/data"

export const FilterDevices = observer(() => {
    const brands = [{id: '', name: 'Не выбрано'}, ...dataStore.brands]
    const types = [{id: '', name: 'Не выбрано'}, ...dataStore.types]
    return(
        <Wrapper>
            <Text>Цена</Text>
            <PriceDiv>
                <Input onChange={(el) => filterStore.setMinPrice(Number(el.target.value))} placeholder="От" style={{width: 140}} type="number" />
                <Input onChange={(el) => filterStore.setMaxPrice(Number(el.target.value))} placeholder="До" style={{width: 140}} type="number" />
            </PriceDiv>
            <Text>Бренд</Text>
            <Select
                value={filterStore.currentBrand}
                onChange={(el: any) => {filterStore.setCurrentBrand(el.target.value)}}
            >
                {brands.map((el: any) => {
                    return(
                        <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                    )
                })}
            </Select>
            <Text>Тип</Text>
            <Select
                value={filterStore.currentType}
                onChange={(el: any) => {filterStore.setCurrentType(el.target.value)}}
            >
                {types.map((el: any) => {
                    return(
                        <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                    )
                })}
            </Select>
        </Wrapper>
    )
})

const PriceDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const Wrapper = styled.div`
    position: sticky;
    display: flex;
    flex-direction: column;
    padding: 15px;
    margin-top: 10px;
    top: 60px;
    max-height: 800px;
    border-radius: 10px;
    width: 150px;
    background-color: rgb(256, 256, 256);
    @media screen and (min-width: 768px){
        width: 200px;
    }
    @media screen and (min-width: 1100px){
        width: 300px;
    }
`
const Text = styled.p`
    font-size: calc(16px + 0.6vw);
    font-weight: 600;
    margin: 15px;
    margin-left: 10px;
    @media screen and (min-width: 768px){
        margin: 20px;
    }
    @media screen and (min-width: 1100px){
        margin: 25px;
    }
`