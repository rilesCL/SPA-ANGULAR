import { SimpleBaseService } from "./common/baseserver";

// IMPORTANT : IF YOU NEED TO MODIFY baseserver.ts or bigquery.ts you MUST TEST OTHER SERVICE AND ALIGN ALL OF THEM

class MyAPI extends SimpleBaseService {
    // Effectue la request, typiquement la seule place a modifier.
    async execute() {
        switch (this.req.method) {
            case "GET":
                //await this.execute_get();
                await this.execute_get();
                break;
            case "POST":
                await this.execute_post();
                break;
            case "PUT":
                await this.execute_put();
                break;
            case "DELETE":
                await this.execute_delete();
                break;
            default:
                throw ({ error: 400, msg: "Méthode non supportée" });
        }
    }


    async execute_get() {
        const reponse = { msg: "ok" };

        this.send_success(this.res, reponse);

    }

    async execute_post() {

        // 75% de chance de retourner une erreur
        if (Math.random() < 0.75) {
            throw ({ error: 400, msg: "Erreur aléatoire " + Math.random() });
        }

        throw ({ error: 400, msg: "Méthode non implémentée" });
        this.send_success(this.res, { msg: "ok" });
    }

    async execute_put() {
        throw ({ error: 400, msg: "Méthode non implémentée" });
    }

    async execute_delete() {
        throw ({ error: 400, msg: "Méthode non implémentée" });
    }
}

export const myapiservice = (req, res) => {
    const myService = new MyAPI(req, res, "GET");
    myService.perform_execute();
}
