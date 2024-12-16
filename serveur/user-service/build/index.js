"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myapiservice = void 0;
const baseserver_1 = require("./common/baseserver");
const axios_1 = __importDefault(require("axios"));
class MyAPI extends baseserver_1.SimpleBaseService {
    constructor() {
        super(...arguments);
        this.apiUrl = 'https://us-central1-cegep-al.cloudfunctions.net';
    }
    execute() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = this.req.headers.authorization;
                if (!token) {
                    throw { error: 401, msg: "Token manquant" };
                }
                console.log('Token reçu:', token);
                // Vérifier avec l'API secret
                const secretResponse = yield axios_1.default.get(`${this.apiUrl}/secret`, {
                    headers: { Authorization: token }
                });
                console.log('Réponse complète secret:', secretResponse.data); // Ajout de ce log
                // La structure correcte est différente
                const username = secretResponse.data.owner; // Retiré .data.data
                console.log('Username extrait:', username);
                if (this.req.method === 'PATCH') {
                    const { nom, prenom } = this.req.body;
                    yield this.myDB.insertDB('user_profiles', {
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
            }
            catch (error) {
                console.error('Erreur complète:', error);
                throw ({
                    error: 401,
                    msg: `Erreur détaillée: ${error.message} - ${JSON.stringify((_a = error.response) === null || _a === void 0 ? void 0 : _a.data)}`
                });
            }
        });
    }
    getProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.myDB.queryDB({
                table: 'user_profiles',
                where: `userid = '${this.req.username}'`
            });
            console.log('Query results:', results);
            this.send_success(this.res, results[0] || { msg: "Profil non trouvé" });
        });
    }
    updateProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            const { nom, prenom } = this.req.body;
            console.log('Mise à jour profil pour:', this.req.username, { nom, prenom });
            // Tenter d'abord une insertion
            try {
                yield this.myDB.insertDB('user_profiles', {
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
            }
            catch (error) {
                console.error('Erreur mise à jour:', error);
                throw { error: 500, msg: "Erreur lors de la mise à jour du profil" };
            }
        });
    }
    createProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = this.req.body;
            console.log('Création profil:', userData);
            try {
                yield this.myDB.insertDB('user_profiles', {
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
            }
            catch (error) {
                console.error('Erreur création:', error);
                throw { error: 500, msg: "Erreur lors de la création du profil" };
            }
        });
    }
}
const myapiservice = (req, res) => {
    const myService = new MyAPI(req, res, "GET,POST,PATCH");
    myService.perform_execute();
};
exports.myapiservice = myapiservice;
