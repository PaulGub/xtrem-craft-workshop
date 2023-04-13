# Code review fonctionnel

## 1
    Il y a un Enum currency qui permet de déclarer 3 types de monnaies (dollar, euro et won).

## 2
    Il y a une classe Bank qui permet d'ajouter des taux d'échanges pour les types de monnaies contenues dans Currency ainsi que de convertir un montant d'une monnaie contre une autre en fonction du taux d'échange.

## 3
    Il y a une classe MonnaieCalculator qui permet d'ajouter, de multiplier ou de diviser des montants de n'importe quelle monnaie (ce qui n'est pas fonctionnel puisque l'on peut faire des opérations entre les monnaies entre elles alors qu'il faudrait pouvoir les faire uniquement sur une même monnaie. Il faudrait convertir la monnaie initialement).

## 4
    Il y a une classe MissingExchangeRateError qui retourne un message d'erreur si le taux d'échange pour deux monnaies entrées en paramètres n'existe pas.
