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
    };
  },

  methods: {
    addUser() {
      // Füge den aktuellen Benutzer dem Benutzerarray hinzu
      this.users = [...this.testusers];
      // Setze das Formular zurück
      this.testusers = [];
    },

    async insertDaten() {
      // API-Aufruf zum Einfügen von Daten
      try {
        await axios.post('http://localhost:3000/api/insert', this.users);

        console.log('Daten erfolgreich eingefügt');
      } catch (error) {
        console.error('Fehler beim Einfügen von Daten:', error);
      }

      // Leere das Benutzerarray
      this.users = [];
    }
  },

  mounted() {
    //console.log("Daten der User: ", userDaten);
    this.users = userDaten;
    console.log("Daten in testusers: ", this.users)
    //this.addUser();
    console.log("Daten in users: ", this.users);
    this.insertDaten();
  },
};
</script>