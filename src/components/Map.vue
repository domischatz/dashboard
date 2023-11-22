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
      addresses: [
        { address: "Grubegg 627, Kappl, AT", name: "Anschluss_Name1" },
        { address: "Grubegg 342, Kappl, AT", name: "Anschluss_Name2" },
        { address: "Valzurweg 3, Mathon, AT", name: "Ritsch tschodaa"},
      ],
    };
  },

  methods: {
    initMap() {
      this.map = new window.google.maps.Map(this.$refs.map, {
        center: { lat: 47.0808, lng: 10.3256 }, // Setze die Startposition der Karte aufs Paznauntal
        zoom: 8,
      });

      // Initialisiere den Geocoder
      this.geocoder = new window.google.maps.Geocoder();
    },

    geocodeAddresses() {
      // Geht durch jede Adresse im Array und wandelt diese in Längen- & Breitengrade um
      this.addresses.forEach((location) => {
        const { address, name } = location;

        this.geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK") {
            console.log(results[0].geometry.location);

            // Setzt Wegpunkt auf Karte
            const marker = new window.google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
              title: name,
            });

            // Erstellt Infofenster
            const infoWindow = new window.google.maps.InfoWindow({
              content: name,
            });

            // Fügt Event-Listener hinzu, um Infofenster zu öffnen, wenn Marker geklickt
            marker.addListener("click", () => {
              infoWindow.open(this.map, marker);
            });
          } else {
            console.error("Geocoding fehlgeschlagen für Adresse '" + address + "': " + status);
          }
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