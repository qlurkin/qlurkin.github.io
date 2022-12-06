namespace solid {
    class Item {
        private String name;
        private double price;
        public String Name { get { return name; } }
        public double Price { get { return price; } }

        public Item(String name, double price) {
            this.name = name;
            this.price = price;
        }
    }
}