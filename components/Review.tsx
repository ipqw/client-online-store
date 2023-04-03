import styled from "styled-components"
import { IReview } from "../types"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

export const Review = (el: IReview) => {
    const [date, setDate] = useState('')
    useEffect(() => {
        const current = new window.Date(el.updatedAt);
        setDate((current.toLocaleDateString()))
    }, [])
    return(
        <Wrapper>
            <UserDiv>
                <User>{el.author}</User>
                <Date>{date}</Date>       
            </UserDiv>
            <Rate>
                <Rating value={el.rate} disabled />
            </Rate>
            <Text><Weight>Комментарий:</Weight> {el.text}</Text>
        </Wrapper>
    )
}
const Weight = styled.span`
    font-weight: 600;
`
const Rate = styled.p`
    margin: 0 15px;
    font-weight: 400;
`

const UserDiv = styled.div`
    display: flex;
    margin: 5px 20px;
`

const Text = styled.p`
    font-size: 18px;
    font-weight: 300;
    margin: 10px 20px;
`

const Wrapper = styled.div`
    width: 100%;
    margin: 30px 0;
`
const Date = styled.p`
    font-weight: 400;
    margin: 0;
    font-size: 18px;
`
const User = styled.p`
    margin: 0;
    margin-right: 15px;
    font-size: 18px;
    font-weight: 600;
`