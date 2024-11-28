/**
 * @file aide.ts
 * 
 * Ce fichier ne doit pas être modifié.
 * 
 * Ceci fut produit par ChatGPT ceci permet d'avoir un contenu pour notre page d'aide qui apparaitra sensé. 
 * Les prochains TPs pourrait changer la structure de l'application. Ici ce fichier d'aide est pour créer 
 * un contenu pour le TP-1 et peut représenté une implémentation qui sera différente par la suite. Vous 
 * devez intégrer cette structure dans une page qui affiche l'aide. Pour le vecteur `vues` dans cette 
 * structure vous devez utiliser un accordéons BootStrap pour y mettre le contenu de chaque section. 
 */

export const aide = `{
  "application": {
    "nom": "Application de Capture du Temps",
    "description": "Une application Web développée avec Angular permettant de capturer et de gérer le temps passé sur des projets, avec plusieurs fonctionnalités comme la saisie du temps, un widget de capture rapide, la gestion des catégories de temps, et des rapports personnalisés.",
    "vues": [
      {
        "nom": "Vue de Saisie du Temps",
        "fonctionnalite": "Permet à l'utilisateur d'enregistrer le temps passé sur un projet ou une tâche spécifique.",
        "composants": {
          "selectionProjet": "Menu déroulant pour choisir le projet ou la tâche.",
          "heureDebut": "Champ pour saisir l'heure de début du travail.",
          "heureFin": "Champ pour saisir l'heure de fin du travail.",
          "dureeTotale": "Calcul automatique de la durée totale ou saisie manuelle.",
          "notes": "Champ optionnel pour ajouter des commentaires sur l'activité."
        },
        "fonctionnement": [
          "Sélectionnez un projet ou une tâche à partir du menu déroulant.",
          "Entrez l'heure de début et de fin, ou laissez la durée se calculer automatiquement.",
          "Ajoutez des notes si nécessaire.",
          "Cliquez sur le bouton 'Enregistrer' pour sauvegarder les informations."
        ]
      },
      {
        "nom": "Vue Widget",
        "fonctionnalite": "Une petite fenêtre flottante pour capturer le temps en temps réel, pratique pour les tâches chronométrées.",
        "composants": {
          "boutonDemarrageArret": "Bouton pour commencer et arrêter l'enregistrement du temps.",
          "compteurTemps": "Affiche en temps réel la durée écoulée depuis le début de la session.",
          "selecteurProjet": "Sélecteur rapide pour indiquer sur quel projet ou tâche vous travaillez."
        },
        "fonctionnement": [
          "Ouvrez le Widget à partir du coin de l'application.",
          "Cliquez sur 'Démarrer' pour commencer à chronométrer le temps.",
          "Utilisez le sélecteur pour indiquer sur quel projet ou tâche vous travaillez.",
          "Cliquez sur 'Arrêter' une fois terminé. Le temps est automatiquement sauvegardé."
        ]
      },
      {
        "nom": "Gestion des Catégories de Temps",
        "fonctionnalite": "Permet à l'utilisateur de définir et de gérer les catégories de temps.",
        "composants": {
          "listeCategories": "Affiche les catégories actuelles avec options de modification et suppression.",
          "ajoutCategorie": "Champ pour créer une nouvelle catégorie.",
          "actionsCategorie": "Boutons pour modifier ou supprimer les catégories existantes."
        },
        "fonctionnement": [
          "Entrez le nom de la nouvelle catégorie et cliquez sur 'Ajouter'.",
          "Utilisez les boutons de modification ou de suppression à côté de chaque catégorie pour gérer les entrées.",
          "Les catégories peuvent être associées à des enregistrements de temps."
        ]
      },
      {
        "nom": "Pages de Rapports",
        "fonctionnalite": "Fournit des rapports détaillés du temps capturé, organisés par projet, tâche ou catégorie.",
        "typesRapports": [
          "Rapport par Projet",
          "Rapport par Tâche",
          "Rapport par Catégorie de Temps"
        ],
        "composants": {
          "filtresDate": "Permet de choisir une plage de dates pour filtrer les rapports.",
          "filtresProjetCategorie": "Affiner les résultats par projet ou catégorie.",
          "exportation": "Les rapports peuvent être exportés en PDF ou Excel."
        },
        "fonctionnement": [
          "Accédez à la page de rapports via le menu principal.",
          "Sélectionnez le type de rapport souhaité.",
          "Utilisez les filtres pour restreindre les données.",
          "Consultez le rapport et exportez-le si nécessaire."
        ]
      }
    ]
  }
}
`;
