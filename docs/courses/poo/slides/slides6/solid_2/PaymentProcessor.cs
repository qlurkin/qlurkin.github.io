namespace solid {
    class PaymentProcessor {
        public void Pay_credit(Order order, String security_code) {
            Console.WriteLine("Processing Credit Payement");
            Console.WriteLine("Verifying Security Code: {0}", security_code);
            order.Status = Order.OrderStatus.Paid;
        }

        public void Pay_debit(Order order, String security_code) {
            Console.WriteLine("Processing Debit Payement");
            Console.WriteLine("Verifying Security Code: {0}", security_code);
            order.Status = Order.OrderStatus.Paid;
        }
    }
}