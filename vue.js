Vue.createApp({
  data: function() {
    return {
      selectedSort: 'up',
      products: []
    };
  },
  created: async function () {
      let res = await fetch('./package.json');
      let items = await res.json();
      this.products = items;
    }
}).mount("#app");
