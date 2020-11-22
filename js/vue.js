// https://api-adresse.data.gouv.fr/search/?q=nantes&type=municipality

// URL to the real API, but limited requests per isNight
const siteURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const keyAPI =
  ",fr&units=metric&lang=fr&appid=482d9c84ad6a948e60a12ad4b71979f1";

// Alternative local URL for developpment
const jsonFile = "js/openweather";
const jsonExt = ".json";

let day;

/**
 * Weather App - Violette Hurel
 */

var demo = new Vue({
  el: "#app",

  data: {
    display: false,
    error: false,
    isNight: "",
    show_input: false,
    zipcode: 44300,
    apiURL: siteURL.concat(44300, keyAPI),
    // apiURL: jsonFile.concat(44300, jsonExt),
    response: {},
  },

  created: function () {
    this.fetchData();
  },

  methods: {
    fetchData: function () {
      let self = this;
      axios
        .get(self.apiURL)
        .then(function (response) {
          console.log(response);
          self.response = response.data;
          // self.response = "Erreur de chargement"; // L'afficher sur la page
          self.error = false;
          self.display = true;

          self.week = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
          self.day = new Date(response.data.dt * 1000).getDay();
          self.date = new Date(response.data.dt * 1000).getDate();
          self.month = new Date(response.data.dt * 1000).getMonth();
          self.year = new Date(response.data.dt * 1000).getFullYear();

          self.hours = new Date(response.data.dt * 1000).getHours();
          self.minutes = new Date(response.data.dt * 1000).getMinutes();
        })
        .catch(function (error) {
          console.log(error);
          self.error = true;
        });
    },

    showInput: function () {
      this.show_input = true;
    },

    getZipcode: function () {
      this.show_input = false;
      this.apiURL= siteURL.concat(this.zipcode, keyAPI),
      // this.apiURL = jsonFile.concat(this.zipcode, jsonExt), 
      this.fetchData();

      // Comment l'appeler aussi au chargement de la page ?
      if (
        this.response.dt <= this.response.sys.sunrise &&
        this.response.dt >= this.response.sys.sunset
      ) {
        this.isNight = true;
        console.log(this.isNight);
      } else {
        this.isNight = false;
        console.log(this.isNight);
      }
    },

    toggleNight() {
      this.isNight = !this.isNight;
    },

    refresh() {
      location.reload();
    },
  },
});
