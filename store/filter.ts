import { makeAutoObservable } from "mobx";

class Storage {
    constructor(){
        makeAutoObservable(this)
    }
    _minPrice: number = 0
    get minPrice(){
        return this._minPrice
    }
    setMinPrice = (value: number) => {
        value ? this._minPrice = value : this._minPrice = 0
    }
    _maxPrice: number = Number.MAX_VALUE
    get maxPrice(){
        return this._maxPrice
    }
    setMaxPrice = (value: number) => {
        value ? this._maxPrice = value : this._maxPrice = Number.MAX_VALUE
    }
    _currentBrand = ''
    get currentBrand(){
        return this._currentBrand
    }
    setCurrentBrand = (el: any) => {
        this._currentBrand = el        
    }
    _currentType = ''
    get currentType(){
        return this._currentType
    }
    setCurrentType = (el: any) => {
        this._currentType = el
    }
}
export const filterStore = new Storage()