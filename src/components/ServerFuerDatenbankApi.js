// API-Service wurde geschrieben
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



// Nach längerem googlen wurde erkannt dass ein Server benötigt wird und man dafür express verwenden kann
/*const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());

// Konfiguration für die MySQL-Datenbankverbindung
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Mawe6184!',
    database: 'userdatenbankdiplomarbeit'
};

// Verbindung zur Datenbank
const connection = mysql.createConnection(dbConfig);

/!*connection.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden zur Datenbank:', err);
        throw err;
    }

    console.log('Erfolgreich zur Datenbank verbunden');
});*!/


// Middleware, um JSON-Anfragen zu verarbeiten
app.use(express.json());

// Einfügen von Daten
app.post('/api/insert', (req, res) => {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).send('Ungültiges Datenformat. Erwarte ein Array von Benutzern.');
    }

    // Konvertiere das Array von Benutzern in ein Array von Arrays für die SQL-Abfrage
    const userValues = users.map(user => [
        user.Hostname,
        user.Error,
        user.Priority,
        user.Address,
        user.Lng,
        user.Lat
    ]);

    // SQL-Abfrage zum Einfügen
    connection.query(
        'INSERT INTO users (Hostname, Error, Priority, Address, Lng, Lat) VALUES ?',
        [userValues],
        (error, results) => {
            if (error) {
                console.error('Fehler beim Einfügen von Daten:', error);
                return res.status(500).send('Internal Server Error');
            }

            res.status(201).send('Daten erfolgreich eingefügt');
        }
    );

    /!*connection.end((endError) => {
        if (endError) {
            console.error('Fehler beim Schließen der Verbindung:', endError);
        }
    });*!/
});

// Abrufen von Daten
app.get('/api/get', (req, res) => {
    // Führe die SQL-Abfrage zum Abrufen von Daten aus
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Fehler beim Abrufen von Daten:', error);
            return res.status(500).send('Internal Server Error');
        }

        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});*/



// Server gab immer folgenden fehler aus:
// Fehler beim Einfügen von Daten: Error:
//   ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client



// Durch googlen wurde herausgefunden dass mysql cors nicht richtig unterstützt (teilweise), es kann umgangen werden durch das verwenden von mysql2
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Mawe6184!',
    database: 'userdatenbankdiplomarbeit'
};

const pool = mysql.createPool(dbConfig);

// Middleware, um JSON-Anfragen zu verarbeiten
app.use(express.json());

app.post('/api/insert', (req, res) => {
    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).send('Ungültiges Datenformat. Erwarte ein Array von Benutzern.');
    }

    const userValues = users.map(user => [
        user.HostID,
        user.Hostname,
        user.Error,
        user.Priority,
        user.Address,
        user.Lng,
        user.Lat
    ]);

    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Fehler beim Verbinden zur Datenbank:', error);
            return res.status(500).send('Interner Serverfehler');
        }

        connection.query(
            'INSERT INTO users (HostID, Hostname, Error, Priority, Address, Lng, Lat) VALUES ?',
            [userValues],
            (error, results) => {
                //freigeben der Verbindung
                connection.release();
                if (error) {
                    console.error('Fehler beim Einfügen von Daten:', error);
                    return res.status(500).send('Interner Serverfehler');
                }

                res.status(201).send('Daten erfolgreich eingefügt');
            }
        );
    });
});

app.get('/api/get', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Fehler beim Abrufen von Daten:', error);
            return res.status(500).send('Interner Serverfehler');
        }

        res.json(results);
    });
});


app.put('/api/update/:hostDaten', (req, res) => {
    const hostDaten = req.params.hostDaten;
    const { HostID, Lng, Lat } = req.body;

    if (!Lng || !Lat) {
        return res.status(400).send('Lng und Lat müssen angegeben werden.');
    }

    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Fehler beim Verbinden zur Datenbank:', error);
            return res.status(500).send('Interner Serverfehler');
        }

        connection.query(
            'UPDATE users SET Lng = ?, Lat = ? WHERE HostID = ?',
            [Lng, Lat, HostID],
            (error, results) => {
                // Freigeben der Verbindung
                connection.release();
                if (error) {
                    console.error('Fehler beim Aktualisieren von Daten:', error);
                    return res.status(500).send('Interner Serverfehler');
                }

                if (results.affectedRows === 0) {
                    return res.status(404).send('Benutzer nicht gefunden');
                }

                res.status(200).send('Daten erfolgreich aktualisiert');
            }
        );
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
