namespace solid {
    class CreditPaymentProcessor : PaymentProcessor {
        private String security_code;

        CreditPaymentProcessor(string security_code) {
            this.security_code = security_code;
        }

        public void Auth_sms(string code) {
            throw new System.Exception("Credit card payments don't support SMS code authorization");
        }

        public void Pay(Order order) {
            Console.WriteLine("Processing Credit Payment");
            Console.WriteLine("Verifying Security Code: {0}", security_code);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}