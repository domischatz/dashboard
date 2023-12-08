/*
import axios from 'axios';

class ApiService {
    constructor() {
        // URL entsprechend dem Server anpassen, jetzt localhost:3306 für MySQL-Datenbank
        this.apiUrl = 'mysql://localhost:3306/userdatenbankdiplomarbeit';
    }

    async getDaten() {
        try {
            const response = await axios.get(`${this.apiUrl}/daten`);
            return response.data;
        } catch (error) {
            console.error('Fehler beim Abrufen von Daten:', error);
            throw error;
        }
    }

    async insertDaten(data) {
        try {
            const response = await axios.post(`${this.apiUrl}/daten`, data);
            return response.data;
        } catch (error) {
            console.error('Fehler beim Einfügen von Daten:', error);
            throw error;
        }
    }
}

export default new ApiService();*/

// ApiService.js

import mysql from 'mysql2/promise';

class ApiService {
    constructor() {
        this.dbConfig = {
            host: 'localhost',
            user: 'root',
            password: 'Mawe6184!',
            database: 'userdatenbankdiplomarbeit',
        };
    }

    async getDaten() {
        try {
            const connection = await mysql.createConnection(this.dbConfig);
            const [rows] = await connection.execute('SELECT * FROM deineTabelle');
            await connection.end();
            return rows;
        } catch (error) {
            console.error('Fehler beim Abrufen von Daten:', error);
            throw error;
        }
    }

    async insertDaten(data) {
        try {
            const connection = await mysql.createConnection(this.dbConfig);
            const [result] = await connection.execute('INSERT INTO users (Hostname, Description, Priority, Unack, Address, Lng, Lat) VALUES (?, ?)', [
                data.Hostname,
                data.Description,
                data.Priority,
                data.Unack,
                data.Address,
                data.Lng,
                data.Lat
            ]);
            await connection.end();
            return result;
        } catch (error) {
            console.error('Fehler beim Einfügen von Daten:', error);
            throw error;
        }
    }
}

export default new ApiService();

