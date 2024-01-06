import { observer } from "mobx-react";
import styled from "styled-components";
import { Page } from "../../components/Page";
import { dataStore } from "../../store/data"
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { toJS } from "mobx";
import SendIcon from '@mui/icons-material/Send';
import { Button, Input, Rating, TextField } from "@mui/material";
import { store } from "../../store";

const Review = observer(() => {
    const router = useRouter()
    const object = dataStore.device
    const type = dataStore.getTypeById(object?.typeId) || {name: ''}
    const brand = dataStore.getBrandById(object?.brandId) || {name: ''}    
    const id: number = parseInt(router.query.deviceId as string) || 0;
    const [userId, setUserId] = useState<string | null>('0')
    useEffect(() => {
        if(!dataStore.reviews[0]?.id){
            dataStore.getDevice(id)
            dataStore.getTypes()
            dataStore.getBrands()
            dataStore.getCart()
            dataStore.getReviews(id)
            setUserId(dataStore.getUserId())
        }
    }, [id, dataStore.reviews])

    const [isCreated, setIsCreated] = useState<boolean>(true)

    const reviewObject = dataStore.reviews?.find(el => el.userId == Number(userId))
    const [rating, setRating] = useState<number | null>(5)
    const [author, setAuthor] = useState<string | null>('')
    const [review, setReview] = useState<string | null>('')
    const [isEmpty, setIsEmpty] = useState<boolean>(false)

    useEffect(() => {
        if(reviewObject){
            setRating(reviewObject.rate)
            setAuthor(reviewObject.author)
            setReview(reviewObject.text)
            setIsCreated(false)
        }
        else{
            setIsCreated(true)
        }
        store.checkAuth()
    }, [reviewObject])

    const updateReview = () => {
        if(rating && author && review && reviewObject){
            fetch(`${store.host}api/rating/update`, {
                method: 'POST', 
                mode: 'cors',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    rate: rating,
                    userId,
                    author,
                    deviceId: id,
                    text: review,
                    id: reviewObject.id
                }),
            })
            .then(res => res.json())
            .then(res => router.back())
        }
        else{
            setIsEmpty(true)
        }
    }
    
    const createReview = () => {
        if(rating && author && review){
            fetch(`${store.host}api/rating`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    rate: rating,
                    userId,
                    author,
                    deviceId: id,
                    text: review,
                }),
            })
            .then(res => res.json())
            .then(res => router.back())
        }
        else{
            setIsEmpty(true)
        }
    }
    return(
        <Page>
            <Block>
                <Title>Мой отзыв о {type?.name} {brand?.name} {object?.name}</Title>
                <Wrapper>
                    <div>
                        <Text>Автор</Text>
                        <TextField value={author} onChange={(e) => {setAuthor(e.target.value); setIsEmpty(false)}}/>
                    </div>
                    <div>
                        <Text>Оценка</Text>
                        <Rating value={rating} onChange={(event, newValue) => {setRating(newValue); setIsEmpty(false)}}/>
                    </div>
                    <div style={{marginBottom: 40}}>
                        <Text>Отзыв</Text>
                        <TextField value={review} onChange={(e) => {setReview(e.target.value); setIsEmpty(false)}} multiline fullWidth/>
                    </div>
                    <AuthText>{store.isAuth ? '' : 'Войдите в аккаунт чтобы добавить отзыв!'}{isEmpty && store.isAuth ? 'Заполните пустые поля!' : ''}</AuthText>
                    <SendBlock>
                        <Button disabled={store.isAuth && !isEmpty ? false : true} onClick={() => {isCreated ? createReview() : updateReview()}} fullWidth endIcon={<SendIcon />}>{isCreated ? 'Опубликовать' : 'Изменить'}</Button>
                    </SendBlock>
                </Wrapper>
            </Block>
        </Page>
    )
})
const AuthText = styled.p`
    text-align: center;
`
const Text = styled.p`
    font-size: 20px;
    font-weight: 500;
`
const SendBlock = styled.div`
    display: flex;
    height: 75px;
`

const Title = styled.p`
    margin-top: 100px;  
    text-align: left;
    font-size: 24px;
    font-weight: 600;
`
const Wrapper = styled.div`
    background-color: white;
    width: 500px;
    height: 500px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
`
const Block = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`


export default Review