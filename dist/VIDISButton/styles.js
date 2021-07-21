import styled from 'styled-components';
export const Root = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Button = styled.a`
    min-width: 200px;
    border-radius: 3px;
    margin: 0.5rem 1rem;
    padding: 0 25px;
    background: orange;
    color: white;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;

    p,img {
        display: inline-block;
        padding: 0 10px;
    }
`;