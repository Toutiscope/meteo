// URL to the real API, but limited requests per night
const siteURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const keyAPI =
  ",fr&units=metric&lang=fr&appid=482d9c84ad6a948e60a12ad4b71979f1";

// Alternative local URL for developpment
const jsonFile = "js/openweather";
const jsonExt = ".json";

/**
 * Weather App - Violette Hurel
 */

var demo = new Vue({
  el: "#app",

  data: {
    display: false,
    night: "",
    show_input: false,
    zipcode: 44300,
    // apiURL: siteURL.concat(44300, keyAPI),
    apiURL: jsonFile.concat(44300, jsonExt),
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
          self.display = true;
        })
        .catch(function (error) {
          console.log(error);
          self.response = "Erreur de chargement";
        });
    },

    showInput: function () {
      this.show_input = true;
    },

    getZipcode: function () {
      this.show_input = false;
      // this.apiURL= siteURL.concat(this.zipcode, keyAPI),
      (this.apiURL = jsonFile.concat(this.zipcode, jsonExt)), this.fetchData();

      // Comment l'appeler aussi au chargement de la page ?
      if (
        this.response.dt <= this.response.sys.sunrise &&
        this.response.dt >= this.response.sys.sunset
      ) {
        this.night = true;
        console.log(this.night);
      } else {
        this.night = false;
        console.log(this.night);
      }
    },

    toggleNight() {
      this.night = !this.night;
    },
  },
});
