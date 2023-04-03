import { Button, TextField, Input } from "@mui/material"
import jwtDecode from "jwt-decode"
import { observer } from "mobx-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Page } from "../components/Page"
import { store } from "../store"
import { dataStore } from "../store/data"
import { LinkText, RegMessage, RegText } from "./registration"

const Login = observer(() => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        store.checkAuth()
        if(store.isAuth){
            router.push('/')
        }
    }, [store.isAuth])
    const [message, setMessage] = useState('')
    
    interface Token{
        role: string,
        id: number,
        email: string
    }
    const changeEmail = (e: any) => {
        setEmail(e.target.value)
    }
    const changePassword = (e: any) => {
        setPassword(e.target.value)
    }
    const handleReg = async (e: any) => {
        e.preventDefault()
        fetch(`${store.host}api/user/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
        })  
        .then(res => res.json())
        .then(res => {            
            if(res.message == 'Указан неверный пароль'){
                setMessage(res.message)
            }
            if(res.message == 'Пользователь не найден'){
                setMessage(res.message)
            }
            if(res.token){
                setMessage('')
                store.setIsAuth(true)
                localStorage.setItem('id', res.userId)
                localStorage.setItem('token', res.token)
                const decodedToken: Token = jwtDecode(res.token)
                store.setRole(decodedToken.role)
            }
        })
        .catch(res => setMessage('Что-то пошло не так...'))
    }
    return(
        <Page>
            <Wrapper>
                <LogDiv>
                    <LogBlock onSubmit={handleReg} name="form">
                        <RegText>Электронная почта:</RegText>
                        <TextField value={email} onChange={changeEmail} name='email'/>
                        <RegText>Пароль:</RegText>
                        <TextField value={password} onChange={changePassword} name="password" type={'password'}/>
                        <RegMessage>{message}</RegMessage>
                        <Button variant="contained" color="primary" type={'submit'}>Войти</Button>
                        <LinkText>Вы еще не зарегестрированы? <Link href={'/registration'}>Зарегестрироваться</Link></LinkText>
                    </LogBlock>
                </LogDiv>
            </Wrapper>
        </Page>
    )
})

const LogBlock = styled.form`
    margin: 20px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
`
const LogDiv = styled.div`
    margin-top: 80px;
    width: 500px;
    height: 500px;
    background-color: #ffffff;
`


export default Login
