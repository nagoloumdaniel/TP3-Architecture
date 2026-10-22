# Revue technique

Revue réalisée sur le parcours Dev après implémentation.

## Points positifs

- Les neuf tests du dossier sont verts et les valeurs de caractérisation sont inchangées.
- `ReportService` ne crée aucune dépendance technique et ne contient plus de branchement sur le format.
- L’ajout de Markdown se fait par enregistrement d’un formatter, sans modifier le service.

## Points à surveiller

- `SmtpMailer` est encore un simulateur avec une outbox ; un adaptateur SMTP réel devra être ajouté séparément.
- La validation d’adresse est centralisée et plus stricte, mais elle reste volontairement simple : une validation métier complète pourrait être confiée au fournisseur d’e-mail.

## Checklist de l’énoncé

- [x] Tests de caractérisation conservés et complétés.
- [x] Aucun `new` d’infrastructure dans le domaine ou l’application.
- [x] Aucun `if` / `switch` sur le format dans `ReportService`.
- [x] L’offre gratuite n’est plus une sous-classe qui lève des exceptions.
- [x] Aucun mot de passe dans le code.
