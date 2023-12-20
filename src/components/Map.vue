<template>
  <div>
    <div ref="map" style="height: 400px; width: 100%;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapMethods} from './ausgelagerte Methoden/mapMethods';
import {databaseMethods} from './ausgelagerte Methoden/databaseMethods';


export default {
  data() {
    return {
      map: null,
      geocoder: null,
      testusers: [],
      newUsers: [],
      uncodierteUser: [],
      geocodedAddresses:[],
    };
  },

  methods: {

    async initMap() {
      this.map = new window.google.maps.Map(this.$refs.map, {
        center: { lat: 47.0808, lng: 10.3256 }, // Setze die Startposition der Karte aufs Paznauntal
        zoom: 10,
        styles: [
          {
            featureType: 'all',
            elementType: 'labels',
            stylers: [
              { visibility: 'off' } // Setze die Sichtbarkeit aller Beschriftungen auf "aus"
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              { visibility: 'on' } // Setze die Sichtbarkeit von Straßenbeschriftungen auf "an"
            ]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels',
            stylers: [
              { visibility: 'on' } // Setze die Sichtbarkeit von Gemeinden auf "an"
            ]
          },
        ]
      });

      // Initialisiere den Geocoder
      this.geocoder = new window.google.maps.Geocoder();
    },

    async geocodeAddressesIfNotDone(format, data) {

      await databaseMethods.getDataWithoutGeocoding();

      // Geht durch jede Adresse im Array und wandelt diese in Längen- & Breitengrade um
      Map.uncodierteUser.forEach((location) => {
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

      /*for (let hostNumber = 0; hostNumber === this.geocodedAddresses.length; hostNumber++){
        console.log(hostNumber);
        await databaseMethods.updateUserLngLat(this.geocodedAddresses[hostNumber]);
      }*/


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
