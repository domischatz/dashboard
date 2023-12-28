<template>
  <div>
    <div ref="map" style="height: 400px; width: 100%;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import {databaseMethods} from './ausgelagerte Methoden/databaseMethods';


export default {
  data() {
    return {
      map: null,
      geocoder: null,
      testusers: [],
      newUsers: [],
      uncodierteUser: [],
    };
  },

  methods: {

    async initMap() {
      this.map = new window.google.maps.Map(this.$refs.map, {
        center: {lat: 47.0808, lng: 10.3256}, // Setze die Startposition der Karte aufs Paznauntal
        zoom: 10,
        styles: [
          {
            featureType: 'all',
            elementType: 'labels',
            stylers: [
              {visibility: 'off'} // Setze die Sichtbarkeit aller Beschriftungen auf "aus"
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              {visibility: 'on'} // Setze die Sichtbarkeit von Straßenbeschriftungen auf "an"
            ]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels',
            stylers: [
              {visibility: 'on'} // Setze die Sichtbarkeit von Gemeinden auf "an"
            ]
          },
        ]
      });

      // Initialisiere den Geocoder
      this.geocoder = new window.google.maps.Geocoder();
    },

    async getDataWithoutGeocoding() {
      //API-Aufruf zum Auslesen der Daten
      try {
        const antwort = await axios.get('http://localhost:3000/api/get');

        // this.uncodierteUser = antwort.data;
        const filteredUsers = JSON.stringify(antwort.data.filter(user => user.Lng === 0 || user.Lat === 0));

        const dataArray = JSON.parse(filteredUsers);

        const HostIds = [];

        const Hostnames = [];

        const Addresses = [];

        for (var i = 0; i < dataArray.length; i++) {
          HostIds.push(dataArray[i].HostID);
          Hostnames.push(dataArray[i].Hostname);
          Addresses.push(dataArray[i].Address);
        }

        const users = [];

        for (var i = 0; i < Math.min(HostIds.length, Hostnames.length, Addresses.length); i++) {
          users.push([HostIds[i], Hostnames[i], Addresses[i]]);
        }

        console.log("users: ", users);

        console.log("Daten erfolgreich ausgelesen: ", this.uncodierteUser);

      } catch (error) {
        console.error('Fehler beim Auslesen der Daten:', error);
      }
    },

    async geocodeAddressesIfNotDone(format, data) {

      await this.getDataWithoutGeocoding();
      const geocodedAddresses = [];

      // Geht durch jede Adresse im Array und wandelt diese in Längen- & Breitengrade um
      this.uncodierteUser.forEach((location) => {
        const { Address, Hostname, HostID } = location;

        this.geocoder.geocode({ address: Address }, (results, status) => {
          if (status === "OK") {
            const geocodedLocation = results[0].geometry.location;

            // Extrahiere die Koordinaten, da sonst nur Eigenschaften von geocodierten Daten gespeichert werden
            const lat = geocodedLocation.lat();
            const lng = geocodedLocation.lng();

            // Fügt geocodierte Position zum Array hinzu

            geocodedAddresses.push({
              HostID,
              Hostname,
              Lng: lng,
              Lat: lat,
            });

            // Setzt Wegpunkt auf Karte
            const marker = new window.google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
              title: Hostname,
            });

            // Erstellt Infofenster
            const infoWindow = new window.google.maps.InfoWindow({
              content: Hostname,
            });

            // Fügt Event-Listener hinzu, um Infofenster zu öffnen, wenn Marker geklickt
            marker.addListener("click", () => {
              infoWindow.open(this.map, marker);
            });
          } else {
            console.error("Geocoding fehlgeschlagen für Adresse '" + Address + "': " + status);
          }
        });
      });

      console.log("geocodedAddresses: ", geocodedAddresses);

      console.log("geocodedAddresses.length: ", geocodedAddresses.length);

      if (geocodedAddresses && geocodedAddresses instanceof Array && geocodedAddresses.length > 0) {

          // Rufe updateUserLngLat mit den geocodierten Benutzerdaten auf
          await databaseMethods.updateUserLngLat(geocodedAddresses);
        }

      //await databaseMethods.updateUserLngLat(geocodedAddresses);

      // leeren des Arrays uncodierte User
      this.uncodierteUser = [];
    },

  },



    async mounted() {
    /*Testen der einzelnen Methoden:
      // Füge Testbenutzer hinzu
      //await databaseMethods.addUser();

      // Füge Daten in Db ein
      // await databaseMethods.insertData();

      //await databaseMethods.getData()

      //await databaseMethods.getDataWithoutGeocoding()
    */

    await this.initMap()
    await this.geocodeAddressesIfNotDone()
  },
};
</script>
