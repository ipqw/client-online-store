export interface IParam{
    title?: string,
    description?: string,
    index: number
}

export interface IReview{
    createdAt: string,
    deviceId: number,
    id: number,
    author: string,
    text: string,
    rate: number,
    updatedAt: string,
    userId: number
}

export interface IObject {
    brandId: number,
    id: number,
    createdAt: string,
    img: string,
    info: object[],
    name: string,
    price: number,
    rating: number,
    ratings: IReview[],
    typeId: number,
    updatedAt: string
}

export interface IRandom{
    userId: number | null
}