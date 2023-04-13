### Define Pivot Currency

#### User story (post-it jaune)

```gherkin
As a Foreign Exchange Expert
I want to be able to define a Pivot Currency
So that I can express exchange rates based on it
```

#### Regles métier (post-it bleu)

- Quelque soit le taux de change, on part de la devise pivot
- La devise pivot est obligatoire et immuable
- Le taux de change doit être positif
- Un taux de change = un taux + une devise

#### Examples (post-it vert)

```gherkin
Given une liste de devises prédéfinies contenant les codes de devise suivants : USD, EUR, JPY, GBP
When l'utilisateur sélectionne la devise pivot EUR dans la liste déroulante
Then le système utilise EUR comme devise pivot par défaut pour toutes les conversions de devises ultérieures
```

```gherkin
Given un champ de saisie de code de devise personnalisé
When l'utilisateur entre le code de devise pivot CHF dans le champ de saisie
Then le système utilise CHF comme devise pivot pour toutes les conversions de devises ultérieures
```

```gherkin
Given un taux de change négatif
When l'utilisateur entre le code de devise pivot CHF dans le champ de saisie
Then le système utilise CHF comme devise pivot pour toutes les conversions de devises ultérieures
```

=====================
=====================
=====================
=====================
=====================

### Add an exchange rate

#### User story (post-it jaune)
```gherkin
As a Foreign Exchange Expert
I want to add/update exchange rates by specifying: a multiplier rate and a currency
So they can be used to evaluate client portfolios
```

#### Regles métier (post-it bleu)

- Deux taux de change ne peuvent pas avoir la même devise
- Pas de taux de change avec la devise pivot
- La devise doit être connu de la banque

#### Examples (post-it vert)

```gherkin
Given un taux d'échange entre KRW et USD (USD étant la devise pivot) qui n'existe pas déjà
When j'ajoute ce taux d'échange
Then le taux d'échange entre KRW et USD est ajouté à la liste des taux d'échanges (KRW <> USD)
```

```gherkin
Given un taux d'échange entre KRW et USD (USD étant la devise pivot)
When j'essaie d'ajouter le taux d'échange entre KRW et USD qui existe déjà
Then je recois une erreur indiquant que le taux d'échange existe déjà
```

```gherkin
Given deux devises KRW et USD et un taux d'échange sanchant que le pivot est USD
When j'essaie d'ajouter le taux d'échange
Then Le taux d'échange est ajouté
```

```gherkin
Given J'essaie d'ajouter un taux d'échange entre deux devises sans passer par la devise pivot exemple : EUR vers KRW, la devise pivot étant USD
When J'essaie d'ajouter un taux d'échange entre deux devises sans devise pivot
Then Le système refuse l'ajout. Le système recalcule automatiquement la route EUR vers KRW en passant par la devise pivot si le taux EUR <> USD et KRW <> USD existent, sinon, il indique qu'il faut renseigner ces deux taux d'échanges
```

=====================
=====================
=====================
=====================
=====================

#### User story (post-it jaune)

#### Regles métier (post-it bleu)

#### Examples (post-it vert)
