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
          <span>Codigo original en el archivo main.ts</span>
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
    code: `
    function strEnLista(s: string) {
        if (s.length == 2) {
          return;
        }
      
        let pila = new Pila();
      
        let primero = new Nodo(null);
        let ultimo = primero;
      
        primero.asignaDato(s[1]);
      
        let i = 3;
      
        while (i < s.length - 2) {
          let x = new Nodo(null);
          ultimo.asignaLiga(x);
          ultimo = x;
          if (s[i + 1] == "(") {
            ultimo.asignaSwich(1);
            pila.push(ultimo);
            x = new Nodo(s[i]);
            ultimo.asignaDato(x);
            ultimo = x;
            i = i + 2;
          } else {
            ultimo.asignaDato(s[i]);
            if (s[i + 1] == ")") {
              i = i + 1;
      
              while (i < s.length && s[i] == ")" && !pila.isempty()) {
                // console.log(pila.size())
                ultimo = pila.pop();
                i = i + 1;
              }
              if (s[i] == ",") {
                i = i + 1;
              }
            } else {
              i = i + 2;
            }
          }
        }
      
        return primero;
      }
    `,
    function: (dato) => {},
  },
  {
    id: 2,
    input: false,
    answer: imprimeListaNodo(arbol, 0),
    code: `
    function imprimeListaNodo(nodo: Nodo, band: number) {
        if (nodo == null) {
          console.log("lista vacia");
          return "";
        }
        let stringRes = "";
        let primero = null;
      
        if (band == 0) {
          console.log("(");
          console.log(nodo.retornaDato());
          stringRes += "(" + nodo.retornaDato();
          if (nodo.retornaLiga() == null) {
            console.log(")");
            stringRes += ")";
            return stringRes;
          }
          console.log("(");
          stringRes += "(";
      
          primero = nodo;
        }
        let p = nodo.retornaLiga();
        while (p != null) {
          if (p.retornaSwich() == 0) {
            console.log(p.retornaDato());
            stringRes += p.retornaDato();
          } else {
            // pila.push(p.retornaLiga())
            let q = p.retornaDato();
            //@ts-ignore
            console.log(q?.retornaDato());
            console.log("(");
            //@ts-ignore
            stringRes += q?.retornaDato() + "(";
      
            //@ts-ignore
            stringRes += imprimeListaNodo(p.retornaDato(), 1);
          }
      
          if (p.retornaLiga() != null) {
            console.log(",");
            stringRes += ",";
          }
          p = p.retornaLiga();
        }
      
        console.log(")");
        stringRes += ")";
      
        if (primero == nodo) {
          console.log(")");
          stringRes += ")";
        }
        return stringRes;
      }
    `,
    function: (dato) => {},
  },
  {
    id: 3,
    input: false,
    answer: alturaArbol(arbol),
    code: `
    function alturaArbol(nodo: Nodo) {
        let h = 1;
        if (nodo == null) {
          return 0;
        }
        if (nodo.retornaLiga() == null) {
          return 1;
        }
        let p: Nodo | null = nodo;
        while (p != null) {
          if (p.retornaSwich() == 1) {
            let g = alturaArbol(p.retornaDato() as Nodo);
            if (g > h) {
              h = g;
            }
          }
          p = p.retornaLiga();
        }
      
        return h + 1;
      }
    `,
    function: (dato) => {},
  },
  {
    id: 4,
    input: false,
    answer: gradoArbol(arbol),
    code: `
    function gradoArbol(nodo:Nodo) {
        let n = 0;
        let pila = new Pila();
        let p = nodo;
        let grado = 0;
        p = p.retornaLiga() as Nodo;
        while (p != null) {
          if (p.retornaSwich() == 0) {
            p = p.retornaLiga() as Nodo
          } else {
            let q = p.retornaDato() as Nodo ;
            p = q?.retornaLiga()as Nodo ; 
            while (p != null) {
              n = n + 1;
              p = p.retornaLiga() as Nodo;
            }
            if (n >= grado) {
              grado = n;
              n = 0;
            }
            //@ts-ignore
            if(p && p.retornaLiga()){
            //@ts-ignore
              pila.push(p.retornaLiga());
              
            }
            //@ts-ignore
            p = q.retornaLiga();
          }
          while (p == null && !pila.isempty()) {
            p = pila.pop();
          }
        }
        return grado;
      }
    `,
    function: (dato) => {},
  },
  {
    id: 5,
    input: false,
    answer: numeroDeHojas(arbol),
    code: `
    function numeroDeHojas(nodo: Nodo) {
        let n = 0;
        const pila = new Pila();
        let p: Nodo | null = nodo;
        if (nodo.retornaSwich() == 0 && nodo.retornaLiga() == null) {
          return 1;
        }
        p = p.retornaLiga();
        while (p != null) {
          if (p.retornaSwich() == 0) {
            //Si el switche es 0 significa que es Hoja
            n = n + 1;
            p = p.retornaLiga();
          } else {
            //Si el switch es 1 , avanzamos hacia la siguiente hoja
            let q = p.retornaDato() as Nodo;
            //Apilamos para poder continuar el recorrido
            pila.push(p.retornaLiga());
            //P = Siguiente Hoja
            p = q.retornaLiga();
          }
          while (p == null && !pila.isempty()) {
            p = pila.pop();
          }
        }
        return n;
      }
    `,
    function: (dato) => {},
  },
  {
    id: 6,
    input: true,
    answer: null,
    code: `
    function gradoDatoEntrado(nodo: Nodo, dato: string) {
        let n = 0;
        let pila = new Pila();
        let p: Nodo | null = nodo;
        if (p.retornaDato() == dato[0]) {
          p = p.retornaLiga();
          while (p != null) {
            n = n + 1;
            p = p.retornaLiga();
          }
          return n;
        }
        p = p.retornaLiga();
        while (p != null) {
          if (p.retornaSwich() == 0) {
            if (p.retornaDato() == dato[0]) {
              return 0;
            }
            p = p.retornaLiga();
          } else {
            let q = p.retornaDato() as Nodo;
            if (q.retornaDato() == dato[0]) {
              p = q.retornaLiga();
              while (p != null) {
                n = n + 1;
                p = p.retornaLiga();
              }
              return n;
            } else {
              pila.push(p.retornaLiga());
              p = q.retornaLiga();
            }
          }
          while (p == null && !pila.isempty()) {
            p = pila.pop();
          }
        }
        console.log("El dato no se encuentra en el arbol");
        return 0;
      }
    `,
    function: (dato) => {
      if (dato?.length == 0) return "";
      return gradoDatoEntrado(arbol, dato);
    },
  },
  {
    id: 7,
    input: true,
    answer: null,
    code: `
    function nivelDato(nodo: Nodo, dato: string) {
        let nivel = 1;
        const pila = new Pila();
        let p: Nodo | null = nodo;
        if (nodo.retornaSwich() == 0 && nodo.retornaDato() == dato) {
          return 1;
        }
        p = p.retornaLiga();
        while (p != null) {
          if (p.retornaSwich() == 0) {
            //Verificar si encontre el dato
            if (p.retornaDato() == dato) {
              nivel = nivel + 1;
              return nivel;
            }
            p = p.retornaLiga();
          } else {
            let q = p.retornaDato() as Nodo;
            //Apilamos para poder continuar el recorrido
            //Al apilar estamos aumentando el nivel
            nivel = nivel + 1;
            if (q.retornaDato() == dato) {
              return nivel;
            }
      
            const nodoaApilar = p.retornaLiga();
            if (nodoaApilar && nodoaApilar.retornaDato() == dato) {
              return nivel;
            }
            pila.push(p.retornaLiga());
            p = q.retornaLiga();
          }
          while (p == null && !pila.isempty()) {
            p = pila.pop();
            nivel = nivel - 1;
          }
        }
        throw new Error("El dato no se encuentra en el arbol");
      }
    `,
    function: (dato) => {
      if (dato?.length == 0) return "";
      return nivelDato(arbol, dato);
    },
  },
  {
    id: 8,
    input: true,
    answer: null,
    code: `
    
    function ancestros(nodo: Nodo, dato: string) {
        let pila = new Pila();
        let respuesta = [];
        let p: Nodo | null = nodo;
        let q = null;
        let c = null;
        if (p.retornaDato() == dato[0]) {
          console.log("El dato es la raiz, luego no tiene ancestros");
          return [];
        }
        pila.push(p);
        p = p.retornaLiga();
        while (p != null) {
          if (p.retornaSwich() == 0) {
            if (p.retornaDato() == dato[0]) {
              console.log("Los ancestros son");
              while (!pila.isempty()) {
                c = pila.pop();
                const datoAncestro = c.retornaDato();
                console.log(datoAncestro);
                respuesta.push(datoAncestro);
                if(!pila.isempty()){
                  p=pila.pop()
              }
              }
              return respuesta;
            }
            p = p.retornaLiga();
          } else {
            q = p.retornaDato() as Nodo;
      
            if (q.retornaDato() == dato[0]) {
              console.log("Los ancestros son");
              while (!pila.isempty()) {
                c = pila.pop();
                const datoAncestro = c.retornaDato();
                console.log(datoAncestro);
                respuesta.push(datoAncestro);
                if(!pila.isempty()){
                  p=pila.pop()
              }
              }
              return respuesta;
            } else {
              pila.push(p.retornaLiga());
              pila.push(p.retornaDato());
              p = q.retornaLiga();
            }
          }
          while (p == null && !pila.isempty()) {
            c = pila.pop();
            p = pila.pop();
          }
        }
      
        console.log("Dato no se encuentra en el arbol");
        return [];
      }
    `,
    function: (dato) => {
      if (!dato || dato.length == 0) return "";
      return ancestros(arbol, dato);
    },
  },
];
