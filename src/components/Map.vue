<template>
  <div>
    <div ref="map" style="height: 400px; width: 100%;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      geocoder: null,
      users: [],
      heatmapData: [],
      heatmapLayer: [],
    };
  },

  methods: {
    initMap() {
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
            featureType: 'administrative.locality', // Gemeinden
            elementType: 'labels',
            stylers: [
              { visibility: 'on' } // Setze die Sichtbarkeit von Gemeinden auf "an"
            ]
          },
        ]
      });

      // Initialisiere den Geocoder
      this.geocoder = new window.google.maps.Geocoder();

      // Fügt ein leeres Heatmap-Layer zur Karte hinzu
      this.heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
        data: this.heatmapData,
        map: this.map,
      });
    },

    async geocodeAddresses(format, data) {

      await this.loadUserData();

      // Geht durch jede Adresse im Array und wandelt diese in Längen- & Breitengrade um
      this.users.forEach((location) => {
        const { Address, Hostname } = location;

        this.geocoder.geocode({ address: Address }, (results, status) => {
          if (status === "OK") {
            console.log(results[0].geometry.location);

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

      this.heatmapLayer.setData(this.heatmapData, data);
    },

    // Asynchrone Methode zum auslesen und speichern der benötigten daten aus dem Json-File von Felix,
    //    muss asynchron sein, damit die geocodeAddresses Methode erst nach dem auslesen ausgeführt wird
    //        sonst ist das Array mit den gespeicherten Userdaten zum Zeitpunkt des Geocoden leer
    async loadUserData() {
      return new Promise((resolve) => {
        import("../data/fehlerliste.json").then((data) => {
          this.users = data.default.map(item => ({
            Hostname: item.Hostname.replace(/"/g, ''),
            Address: item.Address.replace(/"/g, '')
          }));

          this.heatmapData = data.default.map(item => ({
            Description: item.Description.replace(/"/g, ''),
            Priority: item.Priority.replace(/"/g, '')
          }));

          console.log(this.users);

          console.log(this.heatmapData)

          resolve();
        });
      });
    },
  },

  mounted() {
    this.initMap();
    // Ruft die Methode mit Testadressen auf
    this.geocodeAddresses();

  },
};
</script>