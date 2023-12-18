import userDaten from "../testusers.json";
import axios from "axios";
import {mapMethods} from './mapMethods';

export const databaseMethods = {
    addUser() {
        // Lade Testdaten
        this.testusers = userDaten;

        // Füge den aktuellen Benutzer dem Benutzerarray hinzu
        this.newUsers = [...this.testusers]; // hier können dann mittels axios daten von felix in users gespeichert und an db übergeben werden

        this.testusers = [];
    },


    async insertData() {
        // API-Aufruf zum Einfügen von Daten
        try {
            await axios.post('http://localhost:3000/api/insert', this.newUsers);

            console.log('Daten erfolgreich eingefügt');
        } catch (error) {
            console.error('Fehler beim Einfügen von Daten:', error);
        }

        // Leere das Benutzerarray
        this.newUsers = [];
    },


    async updateUserLngLat(HostDaten) {
        // API-Aufruf zum Einfügen von Daten
        try {
            await axios.post(`http://localhost:3000/api/update/${HostDaten}`);

            console.log('Daten erfolgreich eingefügt');
        } catch (error) {
            console.error('Fehler beim Einfügen von Daten:', error);
        }

    },


    async getData() {
        //API-Aufruf zum Auslesen der Daten
        try {
            const antwort = await axios.get('http://localhost:3000/api/get');

            this.users = antwort.data;
            console.log("Daten erfolgreich ausgelesen: ", this.users);
            //console.log("API-Response: ", antwort)

            this.users = [];
        } catch (error) {
            console.error('Fehler beim Auslesen der Daten:', error);
        }
    },


    async getDataWithoutGeocoding() {
        //API-Aufruf zum Auslesen der Daten
        try {
            const antwort = await axios.get('http://localhost:3000/api/get');

            // this.uncodierteUser = antwort.data;
            Map.uncodierteUser = antwort.data.filter(user => user.Lng === 0 || user.Lat === 0);

            console.log("Daten erfolgreich ausgelesen: ", Map.uncodierteUser);

        } catch (error) {
            console.error('Fehler beim Auslesen der Daten:', error);
        }
    },
}


