//@ts-nocheck
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { store } from '../store'
import { HeaderButtons } from './HeaderButtons'
import { HeaderMenu } from './HeaderMenu'



export const Header = observer(() => {
    let isAdmin = store.role === 'ADMIN' ? 'block' : 'none'
    const router = useRouter()
    const redirectAdmin = () => {
        router.replace('/admin')
    }
    const [windowSize, setWindowSize] = useState<number[]>([1920, 1080]);
    const handleWindowResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
    };
    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    return(
        <Wrapper>
            <Logo className='logo clickable' onClick={() => router.push('/')}>Store</Logo>
            <Panel style={{width: windowSize[0] < 580 ? 81 : store.role == 'ADMIN' ? 460 : 280}}>
                {windowSize[0] < 580 ? <HeaderMenu /> : <HeaderButtons />}
            </Panel>
        </Wrapper>
    )
})

const Wrapper = styled.div`
    z-index: 10000;
    position: sticky;
    top: 0px;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    margin: 0;
    background-color: #ffffff;
`
const Block = styled.div`
    display: none;
    width: 280px;
    @media screen and (min-width: 1100px){
        display: block;
    }
`
const Logo = styled.a`
    text-decoration: none;
    color: black;
    font-size: 40px;
    font-weight: 400;
`
const Panel = styled.div`
    display: flex;
    width: 81px;
    justify-content: space-between;
    align-items: center;
    
`