import styled from 'styled-components';

export const Root = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    ul {
        margin: 5px 0;
        padding: 0;
        display: flex;
        justify-content: center;
        width: 400px;
    }

    li {
        margin: 0 5px;
        list-style-type: none;
    }
`;

export const Button = styled.a`
    min-width: 200px;
    border-radius: 10px;
    margin: 0.5rem 1rem;
    padding: 5px 0;
    background: #213e58;
    color: white;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    justify-content: left;
    align-items: center;

    img {
        display: inline-block;
        padding: 0 10px;
        border-right: 1px solid white;
    }

    p {
        display: inline-block;
        padding: 0 10px;
    }
`;

export const Search = styled.input` 
    background: #eee;
    padding:10px;
    border-radius:10px;
    border: 1px solid #213e58;
    width:400px;
 `;

 export const Link = styled.button` 

 `;