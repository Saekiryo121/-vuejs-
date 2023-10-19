Vue.createApp({
  data: function () {
    return {
      selectedSort: "up",
      selectSort: "id",
      searchKeyword: "",
      products: [],
    };
  },
  methods: {
    sortTable: function () {
      if (this.selectedSort === "up") {
        this.products.sort(function (a, b) {
          return a.id - b.id;
        });
      } else if (this.selectedSort === "down") {
        this.products.sort(function (a, b) {
          return b.id - a.id;
        });
      }
    },
    sortTables: function () {
      if (this.selectedSort === "id") {
        this.products.sort(function (a, b) {
          return a.id - b.id;
        });
      } else if (this.selectedSort === "name") {
        this.products.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      } else if (this.selectedSort === "company") {
        this.products.sort(function (a, b) {
          return a.company.localeCompare(b.company);
        });
      } else if (this.selectedSort === "division") {
        this.products.sort(function (a, b) {
          return a.division.localeCompare(b.division);
        });
      } else if (this.selectedSort === "title") {
        this.products.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
      }
    },
    search: function () {
      let keyword = this.searchKeyword.toLowerCase();
      if (keyword === "") {
        this.products = this.products;
      } else {
        this.products = this.products.filter(function (product) {
          return (
            product.name.toLowerCase().includes(keyword) ||
            product.company.toLowerCase().includes(keyword) ||
            product.division.toLowerCase().includes(keyword) ||
            product.title.toLowerCase().includes(keyword)
          );
        });
      }
    },
  },
  created: async function () {
    let res = await fetch("./package.json");
    let items = await res.json();
    this.products = items;
  },
}).mount("#app");
