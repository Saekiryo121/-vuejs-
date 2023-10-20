Vue.createApp({
  data: function () {
    return {
      selectedSort: "up",
      selectSort: "id",
      searchKeyword: "",
      products: [],
      allProducts: [],
      selectedSortKey: "name",
      sortDirection: 1,
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
    customSortFunction(key) {
    if (this.selectedSortKey === key) {
      this.sortDirection *= -1;
    } else {
      this.selectedSortKey = key;
      this.sortDirection = 1;
    }
    this.products.sort((a, b) => {
      let aValue = key === 'id' ? Number(a[key]) : a[key].toLowerCase();
      let bValue = key === 'id' ? Number(b[key]) : b[key].toLowerCase();
      console.log(aValue)
      let sortFactor = this.sortDirection;
      if (key === 'id') {
        return sortFactor * (aValue - bValue);
      }

      return sortFactor * aValue.localeCompare(bValue, 'ja');
    })
  },
    search: function () {
      let keyword = this.searchKeyword.toLowerCase();
      if (keyword === "") {
        this.products = this.allProducts;
      } else {
        this.products = this.allProducts.filter(function (product) {
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
    this.allProducts = items;
  },
}).mount("#app");
