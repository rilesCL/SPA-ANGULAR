# Rapport de Déploiement

## **1. URL du site Firebase**
- **URL** : https://neymarlaurendeau.web.app/mytime

---

## **2. URL des Fonctions Nuagiques**
- **Nom de la Fonction** : `user-service`
  - **URL** : [text](https://us-central1-ghilas-first.cloudfunctions.net/dbschema?table=user_profiles&clef=kS3i2gPq9vL5nM8x&mode=schema)


---

## **3. Clé Secrète**
- **Clé Secrète** : "kS3i2gPq9vL5nM8x"

export class CONFIGURATION {
    static readonly PROJET = 'ghilas-first';  // Votre projet GCP
    static readonly REGIONLOCATION = 'northamerica-northeast1'; // Région où se trouve votre dataset
    static readonly DATASET = 'tp3_profiles'; // Le dataset qu'on a créé
}

## **4. Autres Informations**
- **Base de Données (DB Schema)** : [Insérez les informations ici]
- **Région de Déploiement** : 'northamerica-northeast1'
- **Nom du Projet Firebase** : neymarlaurendeau.web.app

---


---

**Gestion des erreurs** : Les erreurs sont capturées et traitées par le service Error-Handler.service
