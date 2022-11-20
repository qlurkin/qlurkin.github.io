namespace solid {
    class PaypalPaymentProcessor : PaymentProcessor {
        public void Pay(Order order, String security_code) {
            Console.WriteLine("Processing Paypal Payement");
            Console.WriteLine("Verifying Email Address: {0}", security_code);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}