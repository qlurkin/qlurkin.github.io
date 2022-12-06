namespace solid {
    class DebitPaymentProcessor : PaymentProcessor {
        private String security_code;
        private bool verified;

        DebitPaymentProcessor(string security_code) {
            this.security_code = security_code;
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
            Console.WriteLine("Processing Debit Payment");
            Console.WriteLine("Verifying Security Code: {0}", security_code);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}