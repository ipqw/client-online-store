import { makeAutoObservable, toJS } from "mobx";
import { store } from ".";
import { IObject, IParam, IRandom, IReview } from "../types";
class Storage {
    constructor(){
        makeAutoObservable(this)
    }
    _devices: any = {}
    _brands = []
    get brands() {
        return this._brands
    }
    setBrands = (data: any) => {
        this._brands = data
    }
    getBrands = () => {
        fetch(`${store.host}api/brand`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => this.setBrands(res))
        .catch(res => console.error('Server is not working'))
    }
    _types = []
    get types() {
        return this._types
    }
    setTypes = (data: any) => {
        this._types = data        
    }
    getTypes = () => {
        fetch(`${store.host}api/type`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => this.setTypes(res))
        .catch(res => console.error('Server is not working'))
    }
    
    setDevices(data: Object){
        this._devices = data;
    }
    get devices(){
        return this._devices ? this._devices?.rows : []
    }
    getDevices = () => {
        fetch(`${store.host}api/device?limit=${this.limit}`)
        .then(res => res.json())
        .then(res => this.setDevices(res))
        .catch(res => console.error('Server is not working'))
    }
    _limit = 10
    addLimit(){
        this._limit += 10
    }
    get limit(){
        return this._limit 
    }
    getTypeById = (id: number) => {        
        return this.types.find((el: {id: number}) => el.id == id)
    }
    getBrandById = (id: number) => {
        return this.brands.find((el: {id: number}) => el.id == id)
    }
    _params: IParam[] = []
    get params(){
        return this._params
    }
    clearParams = () => {
        this._params = []
    }
    addParams = ({title, description, index}: IParam) => {
        this._params.push({title, description, index})
    }
    changeParam = (index: number, description: string, title: string) => {
        this.params[index] = {title, description, index}
    }

    _device: IObject = {brandId: 0, id: 0, createdAt: '', img: '', info: [], name: '', price: 0, rating: 0, ratings: [], typeId: 0, updatedAt: ''}
    get device(){
        return this._device
    }
    setDevice = (el: IObject) => {
        this._device = el
    }
    getDevice = (id: number) => {
        fetch(`${store.host}api/device/${id}`)
        .then(res => res.json())
        .then(res => this.setDevice(res))
        .catch(res => console.error('Server is not working'))
    }

    _cart = {id: 0, basket_devices: [], userId: 0}
    get cart(){
        return this._cart
    }

    setCart = (el: any) => {
        this._cart = el
    }
    getCart = () => {
        fetch(`${store.host}api/basket/${localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(res => this.setCart(res))
        .catch(res => console.error('Server is not working'))
    }
    isInCart = (id: number) => {
        return store.isAuth ? this.cart.basket_devices.find((el: any) => el.deviceId == id) ? true : false : false
    }
    _reviews: IReview[] = [{userId: 0, createdAt: '', deviceId: 0, rate: 0, id: 0, text: '', updatedAt: '', author: ''}]
    get reviews(){
        return this._reviews
    }
    setReviews = (el: any) => {
        this._reviews = el
    }
    getReviews = (deviceId = 1) => {
        fetch(`${store.host}api/rating/${deviceId}`,{
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => this.setReviews(res))
        .catch(res => console.error('Server is not working'))
    }
    getUserId = () => {
        return localStorage.getItem('id')
    }
}
export const dataStore = new Storage()