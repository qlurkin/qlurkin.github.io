namespace solid {
    class DebitPaymentProcessor : PaymentProcessor {
        private String security_code;
        private Authorizer authorizer;

        public DebitPaymentProcessor(string security_code, Authorizer authorizer) {
            this.authorizer = authorizer;
            this.security_code = security_code;
        }
        
        public void Pay(Order order) {
            if(!authorizer.Authorized) {
                throw new System.Exception("Not authorized");
            }
            Console.WriteLine("Processing Debit Payment");
            Console.WriteLine("Verifying Security Code: {0}", security_code);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}