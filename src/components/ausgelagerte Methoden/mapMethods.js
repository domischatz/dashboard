export const mapMethods = {
        async geocodeAddresses(format, data) {

            await this.getDataWithoutGeocoding();

            // Geht durch jede Adresse im Array und wandelt diese in Längen- & Breitengrade um
            this.uncodierteUser.forEach((location) => {
                const { Address, Hostname } = location;

                this.geocoder.geocode({ address: Address }, (results, status) => {
                    if (status === "OK") {
                        const geocodedLocation = results[0].geometry.location;

                        // Extrahiere die Koordinaten, da sonst nur Eigenschaften von geocodierten daten gespeichert werden
                        const { lat, lng } = geocodedLocation.toJSON();

                        // Fügt geocodierte Position zum Array hinzu
                        this.geocodedAddresses.push({
                            lng,
                            lat,
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
        },

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
};