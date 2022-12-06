namespace solid {
    class PaypalPaymentProcessor : PaymentProcessor {
        private String email;
        private Authorizer authorizer;

        public PaypalPaymentProcessor(String email, Authorizer authorizer) {
            this.authorizer = authorizer;
            this.email = email;
        }

        public void Pay(Order order) {
            if(!authorizer.Authorized) {
                throw new System.Exception("Not authorized");
            }
            Console.WriteLine("Processing Paypal Payment");
            Console.WriteLine("Verifying Email Address: {0}", email);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}