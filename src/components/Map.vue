<template>
  <div>
    <div ref="map" style="height: 400px; width: 100%;"></div>
  </div>
</template>

<script>
import ApiService from './ApiHeatmapDatenbank';
import userDaten from './fehlerliste.json';

export default {
  data() {
    return {
      map: null,
      geocoder: null,
      users: [],
      geocodedAddresses: [],
      geocodedUsers: [],
      heatmapData: [],
    };
  },

  methods: {
    /*async insertUserData() {
      console.log(this.users)
      try {
        for (const user of this.users) {
          await ApiService.insertDaten(user);
        }
        console.log('Benutzerdaten erfolgreich in die Datenbank eingefügt');
      } catch (error) {
        console.error('Fehler beim Einfügen von Benutzerdaten in die Datenbank:', error);
      }
    },*/

    // Aufruf der insertDaten-Methode für jeden Benutzer im Array
    async insertDaten() {
      try {
        const results = await Promise.all(this.users.map(user => ApiService.insertDaten(user)));
        console.log('Einfügen erfolgreich für alle Benutzer:', results);
      } catch (error) {
        console.error('Fehler beim Einfügen von Daten:', error);
      }
    }
  },

  mounted() {
    this.users = userDaten;
    console.log(this.users);
    this.insertDaten();
  },
};
</script>