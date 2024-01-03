//@ts-nocheck
import styled from "styled-components"

export const Properties = ({info = []}: {info: any}) => {
    return(
        <Wrapper>
            <InfoWrapper>
                {
                    info.map((el: any) => {
                        return(
                            <InfoBox key={el.id}>
                                <InfoTitle>{el?.title}</InfoTitle>
                                <InfoText>{el.description}</InfoText>
                            </InfoBox>
                        )
                    })
                }
            </InfoWrapper>
        </Wrapper>
    )
}

const InfoText = styled.p`
    font-size: 20px;
    font-weight: 200;
`
const InfoTitle = styled.p`
    font-size: 22px;
    padding-right: 10px;
    font-weight: 600;
`
const InfoBox = styled.div`
    display: flex;
    justify-content: space-between;
`
const InfoWrapper = styled.div`
    width: 40%;
`

const Title = styled.h1`
    font-size: 30px;
`

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`