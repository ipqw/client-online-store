//@ts-nocheck
import { observer } from "mobx-react"
import Head from "next/head"
import { ReactNode } from "react"
import styled from "styled-components"
import { Footer } from "./Footer"
import { Header } from "./Header"

interface IProps {
    children: ReactNode
}

export const Page = observer(({children}: IProps | any) => {
    return(
        <PageWrapper>
            <Head>
                <title>Online store</title>
            </Head>
            <Header />
            <Wrapper>
                {children}
            </Wrapper>
            <Footer />
        </PageWrapper>
    )
})
const PageWrapper = styled.div`
    
`
const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`