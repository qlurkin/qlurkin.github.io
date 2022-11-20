namespace solid {
    class PaypalPaymentProcessor : PaymentProcessor {
        private String email;

        public PaypalPaymentProcessor(String email) {
            this.email = email;
        }

        public void Pay(Order order) {
            Console.WriteLine("Processing Paypal Payement");
            Console.WriteLine("Verifying Email Address: {0}", email);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}