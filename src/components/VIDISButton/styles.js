import styled from 'styled-components';

export const Root = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    ul {
        margin: 5px 0;
        padding: 0;
        justify-content: center;
        width:380px;
    }

    li {
        list-style-type: none;
    }

    @media only screen and (max-width: 480px) {
        a, div {
            width: 300px;  
        }
    }
`;

export const Button = styled.a`
    width:380px;  
    text-align: center;              
    border-radius: 10px;
    margin: 0.5rem 0;
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
        margin: 0;
        width: 100%;  
    }

    &:hover {
        color: white; 
      }

`;

export const Label = styled.label` 
    font-size: 20px;
    padding: 5px 0;
 `;

 export const FormContainer = styled.div` 
    width:380px;
 `;

 export const Link = styled.a` 
    position: absolute;
    bottom: 10px;
    text-align: right;
 `;