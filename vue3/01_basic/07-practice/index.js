const app = Vue.createApp({
  template: "#my-app",
  data() {
    return {
      books: [
        { id: "00", title: "《算法导论》", publishDate: "2006-9", price: "￥80", count: 1 },
        { id: "01", title: "《unix编程艺术》", publishDate: "2006-2", price: "￥60", count: 1 },
        { id: "02", title: "《编程珠玑》", publishDate: "2008-10", price: "￥40", count: 1 },
        { id: "03", title: "《代码大全》", publishDate: "2006-3", price: "￥120", count: 1 },
      ],
    };
  },
  computed: {},
  methods: {
    add(evt, id) {
      this.books.forEach((book) => {
        if (book.id == id) {
          book.count++;
        }
      });
    },
    sub(evt, id) {
      this.books.forEach((book) => {
        if (book.id == id) {
          book.count--;
        }
      });
    },
    remove(id) {
      console.log(id);
      this.books = this.books.filter((book) => {
        return id != book.id;
      });
      console.log(this.books.length);
    },
    totalPrice(book) {
      return book.price.slice(1) * book.count;
    },
    allPrice() {
      return this.books.reduce(
        function (pre, cur, index, arr) {
          return pre + this.totalPrice(cur);
        }.bind(this),
        0
      );
    },
  },
});
app.mount("#app");
