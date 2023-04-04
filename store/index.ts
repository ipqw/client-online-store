import { makeAutoObservable } from "mobx";
import jwtDecode from "jwt-decode"

interface Token{
    role: string,
    id: number,
    email: string
}

class Storage {
    constructor(){
        makeAutoObservable(this)
    }
    _isAuth: boolean = false
    setIsAuth(bool: boolean){
        this._isAuth = bool
    }
    get isAuth(){
        return this._isAuth
    }
    _host = 'http://45.67.58.154:5000/'
    get host(){
        return this._host
    }
    checkAuth = async () => {
        const response = await fetch(`${this.host}api/user/auth`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .catch(res => console.error('Server is not working'))
        if(response?.token){
            localStorage.setItem('token', response.token)
            const data: Token = jwtDecode(response.token)
            this.setRole(data.role)
            this.setIsAuth(true)
        }
        else{
            this.setIsAuth(false)
        }
    }
    _role = ''
    get role(){
        return this._role
    }
    setRole(role: string){
        this._role = role
    }
    _isVisibleAddDevice = false
    get isVisibleAddDevice() { 
        return this._isVisibleAddDevice
    }
    setIsVisibleAddDevice(bool: boolean) {
        this._isVisibleAddDevice = bool
    }
    _isVisibleAddType: 'flex' | 'none' = 'none'
    get isVisibleAddType() { 
        return this._isVisibleAddType
    }
    setIsVisibleAddType(bool: 'flex' | 'none') {
        this._isVisibleAddType = bool
    }
    _isVisibleAddBrand: 'flex' | 'none' = 'none'
    get isVisibleAddBrand() { 
        return this._isVisibleAddType
    }
    setIsVisibleAddBrand(bool: 'flex' | 'none') {
        this._isVisibleAddType = bool
    }
}

export const store = new Storage()