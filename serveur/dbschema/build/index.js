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
Object.defineProperty(exports, "__esModule", { value: true });
exports.myapiservice = void 0;
const baseserver_1 = require("./common/baseserver");
// IMPORTANT : IF YOU NEED TO MODIFY baseserver.ts or bigquery.ts you MUST TEST OTHER SERVICE AND ALIGN ALL OF THEM
const secret = "fjk245jfmkA";
class MyAPI extends baseserver_1.SimpleBaseService {
    // Effectue la request, typiquement la seule place a modifier.
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.req.query.table == null) {
                throw ({ error: 400, msg: "Table manquante" });
            }
            if (this.req.query.clef == null ||
                this.req.query.clef != secret) {
                throw ({ error: 400, msg: "Clef manquante ou invalide" });
            }
            if (this.req.query.mode == null) {
                throw ({ error: 400, msg: "Mode manquante" });
            }
            const table = this.req.query.table;
            const mode = this.req.query.mode;
            let data;
            if (mode === "schema") {
                data = yield this.myDB.getSchema(table);
            }
            else if (mode === "data") {
                data = yield this.myDB.queryDB({
                    table: table,
                    fields: `*`,
                });
            }
            else {
                throw ({ error: 400, msg: "Mode invalide" });
            }
            this.send_success_raw(this.res, data || data[0]);
        });
    }
}
const myapiservice = (req, res) => {
    const myService = new MyAPI(req, res);
    myService.perform_execute();
};
exports.myapiservice = myapiservice;
