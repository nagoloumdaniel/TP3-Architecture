# Diagnostic SOLID du code initial

| # | Principe | Lignes | Problème | Conséquence concrète |
|---|---|---:|---|---|
| 1 | S | 15–72 | `ReportService` lit les données, calcule, formate, journalise et envoie les e-mails. | Toute évolution d’une responsabilité oblige à modifier et retester une classe volumineuse. |
| 2 | O | 41–55 | Un nouveau format impose d’ajouter un `if` dans `generate`. | Le code testé doit être rouvert à chaque format et le risque de régression augmente. |
| 3 | L | 76–82 | `FreeReportService` refuse des formats et comportements acceptés par son parent. | Un appelant utilisant le type `ReportService` peut obtenir une exception inattendue. |
| 4 | D / DI | 4, 9–12, 16 | Le métier crée directement `fs`, la configuration SMTP et l’outbox. | Les tests dépendent du fichier réel et des détails techniques ; les remplacements sont difficiles. |
| 5 | S / déterminisme | 58–60 | Le service utilise directement `new Date()` et `console.log`. | Les sorties et tests dépendent de l’horloge et polluent la console. |
| 6 | Sécurité | 10 | Un mot de passe SMTP est écrit en clair dans le code. | Le secret peut être commité, partagé et compromis. |
| 7 | Validation | 64 | `includes('@')` est la seule validation d’adresse. | Des adresses manifestement invalides peuvent être acceptées. |

## Corrections

Le calcul, les formats, la lecture, la journalisation et l’envoi sont séparés. Le registre permet l’extension sans modification du service. Les dépendances sont assemblées dans `main.js`, la politique gratuite est injectée et la configuration SMTP vient de l’environnement.
