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
      geocodedAddresses: [],
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


    async geocodeAddressesIfNotDone() {

      this.uncodierteUser = await  databaseMethods.getDataWithoutGeocoding();
      console.log("UCUSER" + JSON.stringify(this.uncodierteUser));

      //const geocodedAddresses = [];

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

            this.geocodedAddresses.push({
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

      console.log("geocodedAddresses: ", this.geocodedAddresses);

      if (this.geocodedAddresses && this.geocodedAddresses instanceof Array /*&& this.geocodedAddresses.length > 0*/) {
        // Rufe updateUserLngLat mit den geocodierten Benutzerdaten auf
        await this.updateUserLngLat();
      }

      // leeren des Arrays uncodierte User
      this.uncodierteUser = [];
    },


    async updateUserLngLat() {
      // Überprüfe, ob Daten vorhanden
      console.log("Parameter geocodedAddresses: ", this.geocodedAddresses);

      if (!this.geocodedAddresses || !Array.isArray(this.geocodedAddresses) /*|| this.geocodedAddresses.length === 0*/) {
        console.log("updateUserLngLat: Keine Daten zum Aktualisieren vorhanden.");
        return;
      }

      try {
        console.log("Parameter geocodedAddresses in try: ", this.geocodedAddresses);
        // API-Aufruf zum Aktualisieren von Benutzerdaten

        const ersteHostID = this.geocodedAddresses[0].HostID;

        console.log(ersteHostID);

        const requestData = this.geocodedAddresses.map(({ HostID, Lng, Lat }) => ({
          HostID,
          Lng,
          Lat,
        }));

        console.log("daten: ", requestData)

          await axios.put(`http://localhost:3000/api/update/${HostID}`, { Lng, Lat });
          console.log(`updateUserLngLat: Daten erfolgreich aktualisiert für HostID: ${HostID}`);

        console.log('updateUserLngLat: Alle Daten erfolgreich aktualisiert');
      } catch (error) {
        console.error('updateUserLngLat: Fehler beim Aktualisieren der Daten:', error);
      }
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
