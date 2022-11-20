namespace solid {
    class CreditPaymentProcessor : PaymentProcessor {
        public void Pay(Order order, String security_code) {
            Console.WriteLine("Processing Credit Payement");
            Console.WriteLine("Verifying Security Code: {0}", security_code);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}