# Answers

## Qu'est ce que du code sale ?
Les noms de variable
```ts
const dfghjkl = []
```

Les boucles infinis

```js
while (true) {
    // Code qui s'exécute en boucle indéfiniment
}
```




La duplication de code, qui peut entraîner une maintenance plus difficile et des erreurs potentielles. Par exemple :
```ts
function addition(a: number, b: number) {
return a + b;
}


function soustraction(a: number, b: number) {
return a - b;
}

function multiplication(a: number, b: number) {
return a * b;
}

// Duplication de code pour la division
function division(a: number, b: number) {
return a / b;
}
```

Dans cet exemple, la fonction "division" contient du code dupliqué qui pourrait être extrait dans une fonction générique pour améliorer la lisibilité et la maintenabilité du code.

Le code inconscient qui peut causer des bugs ou des erreurs difficilement détectables. Par exemple :
```ts
let a: any = "hello";
console.log(a.toUpperCase());
```
Dans cet exemple, la variable "a" est de type "any", ce qui signifie qu'elle peut être de n'importe quel type. Cependant, la méthode "toUpperCase()" n'est pas disponible sur tous les types, ce qui peut causer une erreur à l'exécution. Il est préférable d'utiliser des types plus spécifiques pour éviter ce type d'erreur.

Le manque de documentation, qui peut rendre le code difficile à comprendre pour les autres développeurs. Par exemple :
```ts
// Fonction qui calcule la racine carrée d'un nombre
function racineCarree(n: number) {
return Math.sqrt(n);
}
```
Dans cet exemple, la fonction n'a pas de documentation décrivant son comportement, ses paramètres et son retour, ce qui peut rendre difficile la compréhension de son utilisation. Il est préférable de documenter les fonctions à l'aide de commentaires ou de JSDoc pour faciliter leur utilisation par d'autres

La complexité excessive qui peut rendre le code difficile à comprendre et à maintenir. Par exemple :
```ts
function trierListe(liste: number[]) {
for (let i = 0; i < liste.length; i++) {
for (let j = i + 1; j < liste.length; j++) {
if (liste[i] > liste[j]) {
const temp = liste[i];
liste[i] = liste[j];
liste[j] = temp;
}
}
}
return liste;
}
```
Dans cet exemple, la fonction utilise un algorithme de tri à bulles pour trier une liste de nombres, mais l'implémentation est complexe et difficile à comprendre pour les autres développeurs. Il est préférable d'utiliser des algorithmes de tri plus simples et plus faciles à comprendre, ou de documenter le code pour faciliter la compréhension.

Le manque de scalabilité, qui peut rendre le code difficile à maintenir à mesure que l'application se développe. Par exemple :
```ts

interface Utilisateur {
nom: string;
age: number;
email: string;
}

function envoyerEmailUtilisateur(utilisateur: Utilisateur, message: string) {
// Envoi de l'email à l'utilisateur
}

// Appel de la fonction pour un utilisateur spécifique
const utilisateur1: Utilisateur = { nom: "John Doe", age: 30, email: "john.doe@example.com" };
envoyerEmailUtilisateur(utilisateur1, "Bonjour John !");

// Appel de la fonction pour un autre utilisateur
const utilisateur2: Utilisateur = { nom: "Jane Doe", age: 25, email: "jane.doe@example.com" };
envoyerEmailUtilisateur(utilisateur2, "Bonjour Jane !");
```
Dans cet exemple, la fonction "envoyerEmailUtilisateur" est spécifique à un seul utilisateur à la fois, ce qui peut rendre le code difficile à maintenir si l'application doit envoyer des emails à de nombreux utilisateurs. Il est préférable de créer des fonctions génériques qui peuvent être utilisées pour traiter des ensembles de données, comme une liste d'utilisateurs, pour améliorer la scalabilité du code.

En résumé, pour éviter le code sale en TypeScript, il est important de suivre les bonnes pratiques de développement telles que l'extraction de code dupliqué, l'utilisation de types spécifiques, la documentation du code, la simplification de la complexité et la conception de code évolutif et scalable.


## Qu'est ce que du code propre ?
Des noms de variables significatifs qui décrivent leur utilisation :
```ts
const scores: number[] = [10, 20, 30, 40];
const sommeDesScores = scores.reduce((acc, score) => acc + score, 0);
```
Dans cet exemple, le tableau de scores est nommé "scores", et la variable contenant la somme des scores est nommée "sommeDesScores". Les noms de variables sont significatifs et facilitent la compréhension du code.

L'utilisation de fonctions fléchées pour une syntaxe concise et facile à lire :
```ts
const utilisateurs: string[] = ["Alice", "Bob", "Charlie"];

// Utilisation d'une fonction fléchée pour la méthode map
const utilisateursEnMajuscules = utilisateurs.map((utilisateur) => utilisateur.toUpperCase());
```
Dans cet exemple, la méthode map est utilisée avec une fonction fléchée pour convertir chaque nom d'utilisateur en majuscules. La syntaxe concise et facile à lire facilite la compréhension du code.

L'utilisation d'une indentation claire pour faciliter la compréhension de la structure du code :
```ts
function calculerSomme(a: number, b: number) {
const resultat = a + b;
return resultat;
}
```
Dans cet exemple, la fonction "calculerSomme" est indentée de manière claire pour montrer sa structure. Cela facilite la compréhension du code pour les autres développeurs.

L'utilisation de commentaires et de documentation pour faciliter la compréhension du code :
```ts
/**
* Fonction qui calcule la somme de deux nombres
* @param a Le premier nombre
* @param b Le deuxième nombre
* @returns La somme des deux nombres
  */
  function calculerSomme(a: number, b: number) {
  const resultat = a + b;
  return resultat;
  }
  ```
  Dans cet exemple, la fonction "calculerSomme" est documentée à l'aide de commentaires et de JSDoc pour décrire son comportement, ses paramètres et son retour. Cela facilite la compréhension du code pour les autres développeurs.

