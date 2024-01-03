//@ts-nocheck
import { Button } from "@mui/material"
import styled from "styled-components"
import { Page } from "../../components/Page"
import { store } from "../../store"
import { useEffect, useState} from 'react'
import { useRouter } from "next/router"
import { dataStore } from "../../store/data"

const Admin = () => {
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
        dataStore.getDevices()
        dataStore.getBrands()
    }, [store.role])
    return(
        <div style={{display: visible}}>
            <Page>
                <AdminWrapper>
                    <Panel>
                        <Button style={{height: '100px'}} variant="outlined" onClick={() => router.push('/admin/device')}>Продукты</Button>
                        <Button style={{height: '100px'}} variant="outlined" onClick={() => router.push('/admin/brand')}>Бренды</Button>
                        <Button style={{height: '100px'}} variant="outlined" onClick={() => router.push('/admin/type')}>Типы</Button>
                    </Panel>
                </AdminWrapper>
            </Page>
        </div>
    )
}

const AdminWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`
const Panel = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 100px;
    background-color: white;
    border-radius: 10px;
    width: 500px;
    height: 350px;
`


export default Admin