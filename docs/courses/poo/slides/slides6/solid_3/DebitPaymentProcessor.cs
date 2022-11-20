namespace solid {
    class DebitPaymentProcessor : PaymentProcessor {
        public void Pay(Order order, String security_code) {
            Console.WriteLine("Processing Debit Payement");
            Console.WriteLine("Verifying Security Code: {0}", security_code);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}