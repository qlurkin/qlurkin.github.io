namespace solid {
    class NotRobotAuthorizer : Authorizer {
        private bool authorized;

        public NotRobotAuthorizer() {
            authorized = false;
        }

        public void Turing_test() {
            Console.WriteLine("Are you a Robot ? Naaaa...");
            authorized = true;
        }

        public bool Authorized {
            get { return authorized; }
        }
    }
}