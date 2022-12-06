namespace solid {
    class SMSAuthorizer : Authorizer {
        private bool authorized;

        public SMSAuthorizer() {
            authorized = false;
        }

        public void Verify(string code) {
            Console.WriteLine("Verifying SMS code: {0}", code);
            authorized = true;
        }

        public bool Authorized {
            get { return authorized; }
        }
    }
}