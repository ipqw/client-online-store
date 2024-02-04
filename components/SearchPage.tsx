import { observer } from "mobx-react";
import styled from "styled-components";
import { useEffect } from 'react'
import { store } from "../store";
import { DeviceCard } from "./DeviceCard";
import { FilterDevices } from "./FilterDevices";
import { dataStore } from "../store/data";
import { filterStore } from "../store/filter";

export const SearchPage = observer(() => {
    const devices = dataStore.devices || []    
    const filteredDevices: object[] = devices.filter((el: any) => el.price > filterStore.minPrice && el.price < filterStore.maxPrice)
    const filteredBrand: object[] = filterStore.currentBrand ? filteredDevices.filter((el: any) => el.brandId === filterStore.currentBrand) : filteredDevices  
    const filteredType: object[] = filterStore.currentType ? filteredBrand.filter((el: any) => el.typeId === filterStore.currentType) : filteredBrand  
    return (
        <Wrapper>
            <FilterDevices />
            <DeviceWrapper>
                {filteredType.map((el: any) => {                
                    return <DeviceCard brandId={el.brandId} typeId={el.typeId} id={el.id} name={el.name} createdAt={el.createdAt} url={el.url} price={el.price} rating={el.rating} key={el.id} />   
                })}
            </DeviceWrapper>
            
        </Wrapper>
    )
})

const DeviceWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Wrapper = styled.div`
    display: flex;
    margin: 0;
`