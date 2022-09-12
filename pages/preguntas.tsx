import type { NextPage } from "next";
import Head from "next/head";
import Prism from "prismjs";
import { useEffect, useState } from "react";
import styles from "../styles/Preguntas.module.css";
import {
  strEnLista,
  imprimeListaNodo,
  Nodo,
  alturaArbol,
  gradoDatoEntrado,
  numeroDeHojas,
  nivelDato,
  ancestros,
  gradoArbol,
} from "../main";
import dynamic from "next/dynamic";
import "prismjs/components/prism-typescript";


const PREGUNTAS = [1, 2, 3, 4, 5, 6, 7, 8];
const cadena = "(a(b(c,d(e)),f,g(h,i(j,k(l)),m,n)))";
const arbol = strEnLista(cadena) as Nodo;


const PreguntasPage: NextPage = () => {
  const [currentQuestion, setQuestion] = useState(1);
  const [currentInput, setInput] = useState("");
  const currentQuestionConfig = PREGUNTAS_CONFIG[currentQuestion - 1];

  return (
    <main className={styles.container}>
      <Head>
        <title>Preguntas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.card} ${styles.header}`}>
        <select
          name=""
          id=""
          onChange={(e) => {
            setQuestion(parseInt(e.target.value));
          }}
        >
          {PREGUNTAS.map((el) => (
            <option value={el} key={el}>
              Pregunta {el}
            </option>
          ))}
        </select>
      </div>
      {currentQuestionConfig.input && (
        <div className={styles.card}>
          <span>Input</span>
          <span>Escriba el dato sin comillas</span>
          <input
            type="text"
            maxLength={1}
            onChange={(e) => {
              setInput(e.target.value ?? "");
            }}
          />
        </div>
      )}
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <h2>Codigo</h2>
          <span>
            Codigo original en el archivo main.ts , el que se observa es el
            codigo transpilado por Webpack
          </span>
          <span>Arbol usado en todos los ejercicios {cadena} </span>
          <CodeBlock fn={currentQuestionConfig.code} />
        </div>
        {(currentQuestionConfig.answer || currentQuestionConfig.input) && (
          <div className={styles.card}>
            <h2>Respuesta</h2>
            <p>
              {currentQuestionConfig.answer
                ? currentQuestionConfig.answer
                : currentQuestionConfig.function(currentInput)}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default dynamic(() => Promise.resolve(PreguntasPage), {
  ssr: false,
});

function CodeBlock({ fn }: { fn: string }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, [fn]);
  return (
    <pre className="language-ts">
      <code>{fn}</code>
    </pre>
  );
}
type PreguntasType = Array<{
  id: number;
  input: boolean;
  answer: any;
  code: string;
  function: (dato: string) => void;
}>;
const PREGUNTAS_CONFIG: PreguntasType = [
  {
    id: 1,
    input: false,
    answer: null,
    code: strEnLista.toString(),
    function: (dato) => {},
  },
  {
    id: 2,
    input: false,
    answer: imprimeListaNodo(arbol, 0),
    code: imprimeListaNodo.toString(),
    function: (dato) => {},
  },
  {
    id: 3,
    input: false,
    answer: alturaArbol(arbol),
    code: alturaArbol.toString(),
    function: (dato) => {},
  },
  {
    id: 4,
    input: false,
    answer: gradoArbol(arbol),
    code: gradoArbol.toString(),
    function: (dato) => {},
  },
  {
    id: 5,
    input: false,
    answer: numeroDeHojas(arbol),
    code: numeroDeHojas.toString(),
    function: (dato) => {},
  },
  {
    id: 6,
    input: true,
    answer: null,
    code: gradoDatoEntrado.toString(),
    function: (dato) => {
      if (dato?.length == 0) return "";
      return gradoDatoEntrado(arbol, dato);
    },
  },
  {
    id: 7,
    input: true,
    answer: null,
    code: nivelDato.toString(),
    function: (dato) => {
      if (dato?.length == 0) return "";
      return nivelDato(arbol, dato);
    },
  },
  {
    id: 8,
    input: true,
    answer: null,
    code: ancestros.toString(),
    function: (dato) => {
      if (!dato ||dato.length == 0) return "";
      return ancestros(arbol, dato);
    },
  },
];
