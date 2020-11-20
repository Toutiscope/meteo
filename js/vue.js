// var apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=44300,fr&units=metric&lang=fr&appid=482d9c84ad6a948e60a12ad4b71979f1';

var apiURL = "js/openweather.json";

/**
 * Actual demo
 */

var demo = new Vue({
  el: "#demo",

  data: {
    response: {},
  },

  created: function () {
    this.fetchData();
  },

  methods: {
    fetchData: function () {
      let self = this;
      axios
        .get(apiURL)
        .then(function (response) {
          console.log(response);
          self.response = response.data;
        })
        .catch(function (error) {
          console.log(error);
          self.response = "Erreur de chargement";
        });
    },
  },

  mounted() {
    console.log(this);
  },
});