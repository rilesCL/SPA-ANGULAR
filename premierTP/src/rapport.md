# Documentation des Composants et Utilisation des CDK dans le Projet

## Composant Enregistrement

Le composant **Enregistrement** est conçu pour recueillir les informations d'un utilisateur via un formulaire de saisie. Il utilise divers champs et validations pour garantir l'intégrité des données fournies. Les composants et bibliothèques choisis dans cette section facilitent l'expérience utilisateur en offrant un retour d'erreurs immédiat et des contraintes spécifiques pour chaque champ. Voici un résumé de chaque section et des choix techniques associés :

### Champs et Validations

- **Mat-Form-Field et Mat-Input** : Utilisés pour les champs de saisie tels que le nom, prénom, courriel, adresse, ville, etc., avec des validations de saisie spécifiques. Par exemple :
  - **Nom et Prénom** : Acceptent uniquement des lettres et espaces, avec un minimum de deux caractères.
  - **Courriel** : Vérifie que l'entrée correspond au format d'email standard.
  - **Numéro, Rue, Ville, Code Postal** : Utilisent des modèles (`pattern`) pour garantir que l'entrée respecte les contraintes (ex : nombre pour le numéro, code postal canadien, etc.).

- **Mat-Select** : Utilisé pour les sélections de pays, province ou état. Selon le pays sélectionné, le champ de province ou d’état s’ajuste automatiquement, permettant une interface plus dynamique.

- **Mat-Error** : Affiche des messages d'erreur adaptés pour chaque champ en cas de non-respect des validations, offrant ainsi un retour d’information immédiat à l’utilisateur.

### Boutons de Soumission et d'Annulation

Les boutons de soumission et d’annulation sont configurés avec des états activés/désactivés en fonction de la validité du formulaire, garantissant ainsi que les données ne sont envoyées que lorsqu'elles sont valides.

## Composant Page-Not-Found

Le composant **Page-Not-Found** est une page personnalisée qui s'affiche lorsqu'une URL non valide est atteinte, avec des fonctionnalités d’assistance pour améliorer l'expérience utilisateur.

### Fonctionnalités

- **Affichage de l'URL** : Affiche l'URL courante, permettant à l'utilisateur de copier facilement le lien incorrect à des fins de rapport ou pour le coller ailleurs.

- **CDK Copy to Clipboard** : La fonctionnalité `cdkCopyToClipboard` permet aux utilisateurs de copier l’URL en un seul clic, et un message de confirmation (`showCopyMessage`) indique le succès de l’opération.

- **CDK Portal** : Utilisé pour afficher un message de réussite temporaire ("URL copiée!") via un composant portable, ce qui améliore l'UX en informant l'utilisateur du succès de l'action.

### Bouton de Retour

Le bouton de retour à l’accueil aide les utilisateurs à naviguer directement vers la page d’accueil lorsqu’une page non trouvée est atteinte.

## Résumé du Choix des CDK

L'utilisation des composants CDK (`cdkCopyToClipboard`, `cdkPortal`) répond au besoin d’une interface utilisateur plus fluide et interactive. Ces choix sont faits pour :
- **Améliorer l’accessibilité** en fournissant une navigation simplifiée dans des situations d’erreur.
- **Augmenter l’expérience utilisateur** en offrant des options de copie et des retours visuels immédiats.
  
Ces choix rendent l’application plus intuitive et réactive aux besoins des utilisateurs, en particulier dans des situations où l'utilisateur pourrait rencontrer des erreurs de navigation ou des validations de formulaire.

