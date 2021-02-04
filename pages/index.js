import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Quiz - Superman</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 3 }}
          variants={{ 
            show: {opacity:1,y: '0'},
            hidden: { opacity: 0, y: '200%'},
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>The legend of zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 2.5 }}
          variants={{ 
            show: {opacity:1, y: '0'},
            hidden: { opacity: 0, y:'140%'},
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Regras</h1>

            <p>Cada acerto vale um ponto</p>
            <p>São um total de 10 questões</p>
            <p>Somente uma questão é a certa.</p>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 1, duration: 2.0 }}
          variants={{ 
            show: {opacity:1, y: '0'},
            hidden: { opacity: 0, y:'120%'},
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h2>Leia atentamente</h2>

            <p>Caso a opção selecionada não habilite o botao para passar, selecione outra alternativa e retorne para a alternativa desejada.</p>
          </Widget.Content>
        </Widget>
        <Footer 
          as={motion.footer}
          transition={{ delay: 1.5,duration: 1.5 }}
          variants={{ 
            show: {opacity:1, y: '0'},
            hidden: { opacity: 0, y: '100%'},
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/luizlima-code" />
    </QuizBackground>
  );
}