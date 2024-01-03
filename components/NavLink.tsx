import Link from "next/link"
import styled from "styled-components";

interface IProps{
    href: string;
    children?: string;
}

export const NavLink = ({href, children}: IProps) => {
    return(
        <StyledLink href={href}>
            {children}
        </StyledLink>
    )
}

const StyledLink = styled.a`
    text-align: center;
    font-size: 20px;
    margin-right: 20px;
    text-decoration: none;
`