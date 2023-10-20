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
    }
  },
  methods: {
    sortTable: function () {
      if (this.selectedSort === "up") {
        this.products.sort((a, b) => {
          return a.id - b.id;
        });
      } else if (this.selectedSort === "down") {
        this.products.sort((a, b) => {
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
        this.products = this.allProducts.filter((product) => {
          if (this.selectSort === 'id' && product.id.toString().toLowerCase().includes(keyword)) {
            return true;
          } else if (this.selectSort === 'name' && product.name.toLowerCase().includes(keyword)) {
            return true;
          } else if (this.selectSort === 'company' && product.company.toLowerCase().includes(keyword)) {
            return true;
          } else if (this.selectSort === 'division' && product.division.toLowerCase().includes(keyword)) {
            return true;
          } else if (this.selectSort === 'title' && product.title.toLowerCase().includes(keyword)) {
            return true;
          } else {
            return false;
          }
        });
      }
    }
},
  created: async function () {
    let res = await fetch("./package.json");
    let items = await res.json();
    this.products = items;
    this.allProducts = items;
  }
}).mount("#app");
