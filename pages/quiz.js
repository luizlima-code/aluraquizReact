import React from 'react';
import db from '../db.json';
import { motion } from 'framer-motion';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';

function ResultWidget({ results }) {
  return (
    <Widget
      as={motion.section}
      transition={{ delay: 1, duration: 2.0 }}
      variants={{ 
        show: {opacity:1, x: '0'},
        hidden: { opacity: 0, x:'300%'},
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        Tela de Resultado: 
      </Widget.Header>

      <Widget.Content>
        <p>Você acertou {' '}{results.reduce((somatoriaAtual, resultAtual) => {
          const isAcerto = resultAtual === true;
          if (isAcerto) {
            return somatoriaAtual + 1;
          }
          return somatoriaAtual;
        }, 0)} {' '}perguntas!</p>
        <ul>
          {results.map((results, index) => (
            <li key={`result__${results}`}> #0{index +1} Resultado: {results ===  true ? 'Acertou' : 'Errou'} </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  )
}

function LoadingWidget() {
  return (
    <Widget
      as={motion.section}
      transition={{ delay: 0, duration: 2.8 }}
      variants={{ 
        show: {opacity:1, x: '0'},
        hidden: { opacity: 0, x:'320%'},
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <img
        alt="Descrição loading"
        style={{ 
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src='https://i.pinimg.com/originals/6b/28/3d/6b283da99161982c1e53fae486d8d2fb.gif'
        />
      </Widget.Content>
    </Widget>
  )
}

function QuestionWidget( {question, totalQuestions, questionIndex, onSubmit, addResult} ) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          Pergunta
          {` ${questionIndex + 1} `}
          de
          {` ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
      alt="Descrição"
      style={{ 
        width: '100%',
        height: '150px',
        objectFit: 'cover',
      }}
      src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
        {question.description}
        </p>
        <AlternativesForm 
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              setIsQuestionSubmited(true);
              setTimeout(() => {
                addResult(isCorrect);
                setIsQuestionSubmited(false);
                onSubmit();
                setSelectedAlternative(undefined);
              }, 2 * 1200);
        }}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none'}}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p align="center">Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p align="center">Você errou!</p>}
        </AlternativesForm>
      </Widget.Content> 
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'

};

export default function QuizPage() {

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ])
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 4 * 1100);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }

  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmit}
          addResult={addResult}
          />)}
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <div>
           <ResultWidget results={results}/>
          </div>
        )}
      </QuizContainer>
    </QuizBackground>
  );
}