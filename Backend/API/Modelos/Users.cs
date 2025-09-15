using Google.Cloud.Firestore;

namespace API.Modelos
{
    [FirestoreData]
    public class Users
    {
        [FirestoreProperty]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Email { get; set; }

        [FirestoreProperty]
        public string Nombre { get; set; }

        [FirestoreProperty]
        public DateTime FechaRegistro { get; set; }

        [FirestoreProperty]
        public string PasswordHash { get; set; } = string.Empty;
    }
}
