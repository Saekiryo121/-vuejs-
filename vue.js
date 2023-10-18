Vue.createApp({
  data: function() {
    return {
      selectedSort: 'up',
      products: []
    };
  },
  methods: {
    sortTable: function () {
      if (this.selectedSort === 'up') {
        this.products.sort((a, b) => a.id - b.id);
      } else if (this.selectedSort === 'down') {
        this.products.sort((a, b) => b.id - a.id);
      }
    }
  },
  created: async function () {
      let res = await fetch('./package.json');
      let items = await res.json();
      this.products = items;
    }
}).mount("#app");
