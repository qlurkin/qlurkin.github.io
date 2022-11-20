namespace solid {
    interface PaymentProcessor {
        void Pay(Order order, String security_code);
    }
}