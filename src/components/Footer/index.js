import styled from 'styled-components';

// src/components/Footer/index.js
const FooterWrapper = styled.footer`
  background-color: #00000070;
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="">
        <img src="http://pngimg.com/uploads/superman/superman_PNG28.png" alt="Logo Alura" />
      </a>
      <p>
        Projeto orgulhosamente criado por {' '}
        <a href="https://www.linkedin.com/in/luiz-henrique-alves-de-lima-1185101b7/">
          <span>Luiz Lima</span>
        </a>
      </p>
    </FooterWrapper>
  );
}