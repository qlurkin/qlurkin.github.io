namespace solid {
    class PaypalPaymentProcessor : PaymentProcessor {
        private String email;
        private bool verified;

        public PaypalPaymentProcessor(String email) {
            this.email = email;
            verified = false;
        }

        public void Auth_sms(string code) {
            Console.WriteLine("Verifying SMS code: {0}", code);
            verified = true;
        }

        public void Pay(Order order) {
            if(!verified) {
                throw new System.Exception("Not authorized");
            }
            Console.WriteLine("Processing Paypal Payment");
            Console.WriteLine("Verifying Email Address: {0}", email);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}