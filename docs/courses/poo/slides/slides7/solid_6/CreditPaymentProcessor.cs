namespace solid {
    class CreditPaymentProcessor : PaymentProcessor {
        private String security_code;

        public CreditPaymentProcessor(string security_code) {
            this.security_code = security_code;
        }

        public void Pay(Order order) {
            Console.WriteLine("Processing Credit Payment");
            Console.WriteLine("Verifying Security Code: {0}", security_code);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}