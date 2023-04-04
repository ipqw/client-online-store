import { Button, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material'  
import { observer } from "mobx-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Page } from "../components/Page"
import { store } from "../store"

const Registration = observer(() => {    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfPassword = () => setShowConfPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault()}
    const router = useRouter()
    
    useEffect(() => {
        store.checkAuth()
        if(store.isAuth){
            router.push('/')
        }
    }, [store.isAuth])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const handleEmail = (e: any) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: any) => {
        setPassword(e.target.value)
    }
    const confirmPassword = (e: any) => {
        setConfPassword(e.target.value)
    }
    const handleReg = async (e: any) => {
        e.preventDefault()
        if(password.length > 5){
            if(password === confPassword){
                fetch(`${store.host}api/user/registration`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
                })
                .then(res => res.json())
                .then(res => {
                    if(res.message == 'Некорректный email или пароль'){
                        setMessage(res.message)
                    }
                    if(res.message == 'Пользователь с таким email уже существует'){
                        setMessage(res.message)
                    }
                    if(res.token){
                        setMessage('')
                        store.setIsAuth(true)
                        localStorage.setItem('id', res.userId)
                        localStorage.setItem('token', res.token)
                    }
                })
            }
            else{
                setMessage('Пароли не совпадают')
            }
        }
        else{
            setMessage('Пароль должен быть больше 5 символов')
        }
        
    }
    return(
        <Page>
            <Wrapper>
                <RegDiv>
                    <RegBlock>
                        <RegText>Электронная почта:</RegText>
                        <TextField value={email} onInput={handleEmail} type={'email'}/>
                        <RegText>Пароль:</RegText>
                        <OutlinedInput value={password} onInput={handlePassword} id="outlined-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        } label="Password"/>
                        <RegText>Подтвердите пароль</RegText>
                        <OutlinedInput value={confPassword} onInput={confirmPassword} id="outlined-adornment-password" type={showConfPassword ? 'text' : 'password'} endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                {showConfPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        } label="Password"/>
                        <RegMessage>{message}</RegMessage>
                        <Button variant="outlined" color="primary" onClick={handleReg} type={'button'}>Зарегестрироваться</Button>
                        <LinkText>Вы уже зарегестрированы? <Link href={'/login'}>Войти</Link></LinkText>
                    </RegBlock>
                </RegDiv>
            </Wrapper>
        </Page>
    )
})

export const RegBlock = styled.div`
    margin: 20px;
`

export const RegMessage = styled.p`
    
`

export const LinkText = styled.p`
    
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
`
export const RegDiv = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    width: 500px;
    height: 550px;
    background-color: #ffffff;
`
export const RegText = styled.p`
    font-size: 24px;
    color: black;
`
export const RegInput = styled.input`
    
`
export const RegButton = styled.button`
    margin-top: 15px;
`


export default Registration