export class Nodo {
  dato: string | null | Nodo;
  liga: Nodo | null;
  swich: number;
  constructor(dato: string | null) {
    this.dato = dato;
    this.liga = null;
    this.swich = 0;
  }

  retornaDato() {
    return this.dato;
  }

  retornaLiga() {
    return this.liga;
  }

  retornaSwich() {
    return this.swich;
  }

  asignaLiga(valor: Nodo) {
    this.liga = valor;
  }

  asignaDato(datoAsignar: string | Nodo) {
    this.dato = datoAsignar;
  }

  asignaSwich(valor: number) {
    this.swich = valor;
  }
}

class Pila {
  elementos: Array<any> = [];

  push = (elemento: any) => {
    return this.elementos.push(elemento);
  };
  pop = () => {
    return this.elementos.pop();
  };
  isempty = () => {
    //   return this.elementos.length == 0;

    if (this.elementos.length == 0) {
      return true;
    } else {
      return false;
    }
  };
  empty = () => {
    this.elementos.length = 0;
  };
  size = () => {
    return this.elementos.length;
  };
}

/**
 * Punto 1.
 * Convierte una string en una representacion de un arbol como lista generalizada
 * @param s
 * @returns Primer Nodo
 */
export function strEnLista(s: string) {
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

/**
 * Punto 2.
 * Imprime la estructura de un arbol en forma de string
 * @param nodo
 * @param band
 * @returns string
 */
export function imprimeListaNodo(nodo: Nodo, band: number) {
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

/**
 * Calcula la altura de un nodo
 * @param nodo
 * @returns altura
 */
export function alturaArbol(nodo: Nodo) {
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


/**
 * Punto 4
 * @param nodo 
 * @returns 
 */
export function gradoArbol(nodo:Nodo) {
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


/**
 * Punto 5 .
 * Determinar e imprimir el numero de hojas del arbol con algoritmo no recursivo
 * @param nodo
 * @returns numeroHojas
 */
 export function numeroDeHojas(nodo: Nodo) {
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


/**
 *  Punto 6 .
 *
 *  Utilizo este algoritmo en calcular el grado del dato que se introduce por pantalla.
 *
 * Se debe pasar siempre el primer nodo del arbol
 * @param nodo
 * @param dato
 * @returns grado
 */
export function gradoDatoEntrado(nodo: Nodo, dato: string) {
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





/**
 *  Punto 7.
 * Determinar e imprimir el nivel en el cual se halla el registro de un dato entrado por pantalla.
 * @param nodo
 * @param dato
 * @returns nivel
 */
export function nivelDato(nodo: Nodo, dato: string) {
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

/**
 * Punto 8.
 * Se debe pasar siempre el primer nodo del arbol ,
 * y un dato a buscar sus ancestros
 * @param nodo
 * @param dato
 * @returns
 */
export function ancestros(nodo: Nodo, dato: string) {
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

