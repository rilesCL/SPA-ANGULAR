import { SimpleBaseService } from "./common/baseserver";
import axios from 'axios';

class MyAPI extends SimpleBaseService {
    private apiUrl = 'https://us-central1-cegep-al.cloudfunctions.net';
    constructor(req: any, res: any, methodes: string = "GET") {  // Ajout du paramètre methodes avec valeur par défaut
        super(req, res, methodes); 
        // Configuration CORS complète
        this.res.header("Access-Control-Allow-Origin", "*");
        this.res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
        this.res.header(
            "Access-Control-Allow-Headers", 
            "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Secret-Key"
        );
    }

    async execute() {
        try {
            const token = this.req.headers.authorization;
            if (!token) {
                throw { error: 401, msg: "Token manquant" };
            }
    
            // Vérifier avec l'API secret
            const secretResponse = await axios.get(`${this.apiUrl}/secret`, {
                headers: { Authorization: token }
            });
            const username = secretResponse.data.owner;
    
            // Traiter selon la méthode
            if (this.req.method === 'GET') {
                console.log('Getting profile for:', username);
                const results = await this.myDB.queryDB({
                    table: 'user_profiles',
                    where: `userid = '${username}'`,
                    fields: 'userid, nom, prenom'  // Spécifier les champs explicitement
                });
                
                console.log('Query results:', results);
                return this.send_success(this.res, {
                    msg: "Profil récupéré",
                    profile: results[0] || null
                });
            }
    
            if (this.req.method === 'PATCH') {
                const { nom, prenom } = this.req.body;
                await this.myDB.insertDB('user_profiles', {
                    userid: username,
                    nom,
                    prenom
                });
    
                this.send_success(this.res, { 
                    msg: "Profil mis à jour",
                    userid: username,
                    nom,
                    prenom
                });
            }
        } catch (error) {
            console.error('Erreur complète:', error);
            throw ({ 
                error: 401, 
                msg: `Erreur détaillée: ${error.message} - ${JSON.stringify(error.response?.data)}` 
            });
        }
    }

    private async getProfile() {
        const results = await this.myDB.queryDB({
            table: 'user_profiles',
            where: `userid = '${this.req.username}'`
        });
        console.log('Query results:', results);

        this.send_success(this.res, results[0] || { msg: "Profil non trouvé" });
    }

    private async updateProfile() {
        const { nom, prenom } = this.req.body;
        console.log('Mise à jour profil pour:', this.req.username, { nom, prenom });

        // Tenter d'abord une insertion
        try {
            await this.myDB.insertDB('user_profiles', {
                userid: this.req.username,
                nom,
                prenom
            });

            this.send_success(this.res, { 
                msg: "Profil créé/mis à jour avec succès",
                userid: this.req.username,
                nom,
                prenom
            });
        } catch (error) {
            console.error('Erreur mise à jour:', error);
            throw { error: 500, msg: "Erreur lors de la mise à jour du profil" };
        }
    }

    private async createProfile() {
        const userData = this.req.body;
        console.log('Création profil:', userData);

        try {
            await this.myDB.insertDB('user_profiles', {
                userid: userData.username,
                nom: userData.nom,
                prenom: userData.prenom,
                email: userData.email,
                adresse: {
                    street_number: userData.adresse.numero,
                    rue: userData.adresse.rue,
                    ville: userData.adresse.ville,
                    province: userData.adresse.province,
                    pays: userData.adresse.pays,
                    code_postal: userData.adresse.codePostal
                }
            });

            this.send_success(this.res, { 
                msg: "Profil créé avec succès",
                userid: userData.username 
            });
        } catch (error) {
            console.error('Erreur création:', error);
            throw { error: 500, msg: "Erreur lors de la création du profil" };
        }
    }
}

export const myapiservice = (req, res) => {
    const myService = new MyAPI(req, res, "GET,POST,PATCH");
    myService.perform_execute();
}