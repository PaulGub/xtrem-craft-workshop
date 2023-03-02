# Code review technique

## Bank
Dans Convert, la condition n'est pas optimisée.
Problèmes d'indendation du code. Le code est globalement peu lisible.

## Monney Calculator

Il est possible de faire des opérations de type + * / sur des montants de monnaie. 
Le paramètre currency est inutilisé pour l'instant. Il devrait permettre de vérifier qu'on opère sur la même monnaie mais il ne le fais pas. 
La classe ne contient que des méthodes statics.

