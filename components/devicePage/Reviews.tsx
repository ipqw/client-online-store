import { Button } from "@mui/material"
import Link from "next/link"
import styled from "styled-components"
import { Review } from "../Review"

export const Reviews = ({ratings, id}: {ratings: any, id: number}) => {    
    return(
        <Wrapper>
            <TopDiv>
                <Button href={`/${id}/review`}>Добавить отзыв</Button>
            </TopDiv>
            {
                ratings.map((el: any) => {
                    return <Review key={el.id} createdAt={el.createdAt} deviceId={el.deviceId} id={el.id} rate={el.rate} text={el.text} author={el.author} userId={el.userId} updatedAt={el.updatedAt}/>
                })
            }
        </Wrapper>
    )
}
const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 20px 17px;
`

const Title = styled.h1`

`

const Wrapper = styled.div`
    width: 100%;
`