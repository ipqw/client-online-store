//@ts-nocheck
import { Button } from "@mui/material";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState} from "react";
import styled from "styled-components";
import { AddDevice } from "../../components/device/AddDevice";
import { DeviceAdmin } from "../../components/device/DeviceAdmin";
import { Page } from "../../components/Page";
import { store } from "../../store";
import { dataStore } from "../../store/data";
import { MainTitle } from "../cart";

const Device = observer(() => {
    useEffect(() => {
        dataStore.getDevices()
        dataStore.getTypes()
        dataStore.getBrands()        
    }, [dataStore.limit])
    const addDevice = () => {
        store.setIsVisibleAddDevice(true)
    }
    const devices = dataStore.devices || []
    const router = useRouter()
    const [visible, setVisible] = useState('none')
    useEffect(() => {
        if(store.role !== 'ADMIN'){
            router.push('/')
        }
        else{
            setVisible('block')
        }
    }, [store.role])
    return(
        <div style={{display: visible}}>
            <AddDevice />
            <Page>
                <Wrapper>
                    <MainTitle style={{textAlign: 'center'}}>Продукты</MainTitle>
                    <Button style={{width: '200px', margin: '0 auto', marginBottom: '20px', zIndex: '0'}} variant='outlined' onClick={addDevice}>Добавить товар</Button>
                    <table>
                        <tbody>
                            <Devices>
                                <TableDiv>ID</TableDiv>
                                <ImageTr>Изображение</ImageTr>
                                <TableDiv>Модель</TableDiv>
                                <TableDiv>Цена</TableDiv>
                                <TableDiv>Бренд</TableDiv>
                                <TableDiv>Тип</TableDiv>
                                <TableDiv>Рейтинг</TableDiv>
                                <TableDiv>Создано</TableDiv>
                                <TableDiv>Обновлено</TableDiv>
                                <TableDiv>Управление</TableDiv>
                            </Devices>
                            {devices.map((el: any) => {
                                return <DeviceAdmin id={el.id} key={el.id} rating={el.rating} img={el.img} createdAt={el.createdAt} updatedAt={el.updatedAt} typeId={el.typeId} brandId={el.brandId} price={el.price} name={el.name}/>
                            })}
                        </tbody>
                    </table>
                </Wrapper>
            </Page>
        </div>
       
    )
})
const TypeBrandDiv = styled.div`
`

const Devices = styled.tr`
    display: flex;
    height: 50px;
    margin: 0;
    align-items: center;
`
const TableDiv = styled.td`
    width: 100px;
    height: 50px;
    padding: 0 10px;
    margin: 0;
    border: 0.5px solid black;
    text-align: center;
`
const ImageTr = styled.td`
    width: 250px;
    height: 50px;
    padding: 0;
    margin: 0;
    border: 0.5px solid black;
    text-align: center;
`
const DevicesText = styled.p`
    font-size: 30px;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
export default Device