namespace solid {
    class Order {
        class OrderItem {
            private Item item;
            private int quantity;

            public Item Item { get { return item; }}

            public int Quantity { get { return quantity; } }

            public OrderItem(Item item, int quantity) {
                this.item = item;
                this.quantity = quantity;
            }
        }

        public enum OrderStatus {
            Open,
            Paid
        }

        private List<OrderItem> items;
        private OrderStatus status;

        public OrderStatus Status {
            get { return status; }
            set { status = value; }
        }

        public Order() {
            items = new List<OrderItem>();
            status = OrderStatus.Open;
        }

        public void Add_item(Item item, int quantity) {
            items.Add(new OrderItem(item, quantity));
        }

        public double Total_price() {
            double total = 0;
            foreach(OrderItem oi in items) {
                total += oi.Item.Price * oi.Quantity;
            }
            return total;
        }
    }
}