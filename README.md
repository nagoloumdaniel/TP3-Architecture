# TP3 - Refactoring SOLID de ShopLite

Refactoring du rapport mensuel des ventes de ShopLite, réalisé selon le parcours Dev de l’énoncé du TP3.

## Objectifs réalisés

- conserver le comportement initial grâce aux tests de caractérisation ;
- isoler le calcul métier dans `domain/salesStats.js` ;
- extraire les formats CSV, HTML et JSON derrière un registre extensible ;
- injecter le dépôt de commandes, le mailer, le logger et la politique d’offre ;
- déplacer la composition des objets dans `tp3/main.js` ;
- remplacer l’héritage problématique de l’offre gratuite par une politique injectée ;
- ajouter un huitième test avec le rapport CSV d’octobre 2026 ;
- ajouter un format Markdown sans modifier `application/ReportService.js` ;
- supprimer le mot de passe SMTP codé en dur ;
- documenter le diagnostic SOLID et la revue technique.

## Structure

```text
seance3-solid/
├── package.json
└── tp3/
    ├── application/ReportService.js
    ├── domain/EmailAddress.js
    ├── domain/policies.js
    ├── domain/salesStats.js
    ├── formatters/
    ├── infrastructure/
    ├── main.js
    ├── orders.json
    ├── ReportService.caracterisation.test.js
    └── demo.js
```

## Exécuter le projet

Depuis `seance3-solid` :

```powershell
npm test
npm run demo
```

Ou depuis la racine du dépôt :

```powershell
node --test seance3-solid/tp3/*.test.js
node seance3-solid/tp3/demo.js
```

Les tests couvrent les sorties CSV, HTML et JSON, le mois vide, le format inconnu, l’envoi d’e-mail, la validation d’adresse, le rapport d’octobre et l’extension Markdown. Les valeurs attendues du code initial sont conservées.

## Extension d’un format

Un formatter doit exposer `format(stats)`. Il suffit ensuite de l’enregistrer dans `FormatterRegistry` lors de la composition :

```js
registry.register('md', new MarkdownFormatter());
```

`ReportService` ne connaît pas les formats et ne contient aucun `if` ou `switch` sur leur nom.

## Configuration SMTP

Le mailer de démonstration simule l’envoi avec une `outbox`. L’hôte et le port peuvent être configurés par `SMTP_HOST` et `SMTP_PORT`. Aucun mot de passe n’est stocké dans le dépôt.

## Documents du parcours Dev

- [VIOLATIONS.md](VIOLATIONS.md) — diagnostic des violations SOLID du code initial ;
- [DIAGRAMMES.md](DIAGRAMMES.md) — architecture avant/après ;
- [REVUE.md](REVUE.md) — revue technique et vérifications effectuées.

