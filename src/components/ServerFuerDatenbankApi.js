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


app.put('/api/update/:HostID', (req, res) => {
    const HostID = req.params.HostID;
    const { Lng, Lat } = req.body;
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
