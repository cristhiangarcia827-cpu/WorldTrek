namespace API.Modelos
{
    public class RegisterRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
    }
    public class UpdateUserRequest
    {
        public string? Name { get; set; }
        public string? Password { get; set; }
    }
}
