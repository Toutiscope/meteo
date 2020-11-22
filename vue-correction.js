// var apiURL = "js/openweather.json";
var apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=44300,fr&units=metric&lang=fr&appid=482d9c84ad6a948e60a12ad4b71979f1';


/**
 * Actual demo
 */

var demo = new Vue({
  el: "#demo",

  data: {
    response: {},
    display: false // ajout DV : On ajoute une variable display initilaisée à false
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
          // DV : si tu veux transformer les données, tu peux le faire ici 
          self.response = response.data;
          self.display = true // ajout DV : et on passe cette variable à true une fois qu'on a récupérer les données

        })
        .catch(function (error) {
          console.log(error);
          self.response = "Erreur de chargement"; // DV : prévoir un v-if dans le template pour afficher cette erreur, non ?
        });
    },
  },

  mounted() {
    console.log(this);
  },
});