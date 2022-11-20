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

        public OrderStatus Status { get { return status; } }

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

        public void Pay(String payment_type, String security_code) {
            if(payment_type == "debit") {
                Console.WriteLine("Processing Debit Payement");
                Console.WriteLine("Verifying Security Code: {0}", security_code);
                status = OrderStatus.Paid;
            }
            else if(payment_type == "credit") {
                Console.WriteLine("Processing Credit Payement");
                Console.WriteLine("Verifying Security Code: {0}", security_code);
                status = OrderStatus.Paid;
            }
            else {
                throw new Exception(String.Format("Unknown Payement Type: {0}", payment_type));
            }
        }
    }
}