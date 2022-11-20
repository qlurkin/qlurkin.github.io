namespace solid {
    class DebitPaymentProcessor : PaymentProcessor {
        private String security_code;

        DebitPaymentProcessor(string security_code) {
            this.security_code = security_code;
        }
        
        public void Pay(Order order) {
            Console.WriteLine("Processing Debit Payement");
            Console.WriteLine("Verifying Security Code: {0}", security_code);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}