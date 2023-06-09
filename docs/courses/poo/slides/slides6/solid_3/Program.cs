namespace solid {
    class Program {
        public static void Main() {
            Order order = new Order();

            order.Add_item(new Item("Keyboard", 50), 1);
            order.Add_item(new Item("SSD", 150), 1);
            order.Add_item(new Item("USB Cable", 2), 5);

            Console.WriteLine(order.Total_price());
            new PaypalPaymentProcessor().Pay(order, "lur@ecam.be");
            Console.WriteLine(order.Status);
        }
    }
}