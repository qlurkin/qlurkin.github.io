namespace solid {
    interface PaymentProcessor {
        void Auth_sms(string code);
        void Pay(Order order);
    }
}