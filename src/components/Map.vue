<template>
  <div>
    <div ref="map" style="height: 400px; width: 100%;"></div>
  </div>
</template>

<script>
import userDaten from './testusers.json';
import axios from 'axios';

export default {
  data() {
    return {
      map: null,
      geocoder: null,
      testusers: [],
      users: [],
      uncodierteUser: [],
    };
  },

  methods: {
    addUser() {
      // Lade Testdaten
      this.testusers = userDaten;

      // Füge den aktuellen Benutzer dem Benutzerarray hinzu
      this.users = [...this.testusers]; // hier können dann mittels axios daten von felix in users gespeichert und an db übergeben werden

      this.testusers = [];
    },


    async insertData() {
      // API-Aufruf zum Einfügen von Daten
      try {
        await axios.post('http://localhost:3000/api/insert', this.users);

        console.log('Daten erfolgreich eingefügt');
      } catch (error) {
        console.error('Fehler beim Einfügen von Daten:', error);
      }

      // Leere das Benutzerarray
      this.users = [];
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
        this.uncodierteUser = antwort.data.filter(user => user.Lng === 0 || user.Lat === 0);

        console.log("Daten erfolgreich ausgelesen: ", this.uncodierteUser);

      } catch (error) {
        console.error('Fehler beim Auslesen der Daten:', error);
      }
    },
  },

  mounted() {

    // Füge Testbenutzer hinzu
    //this.addUser();

    // Füge Daten in Db ein
    // this.insertData();

    //this.getData()

    this.getDataWithoutGeocoding()
  },
};
</script>
