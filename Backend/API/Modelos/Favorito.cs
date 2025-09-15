using Google.Cloud.Firestore;


namespace API.Modelos
{
    [FirestoreData]
    public class Favorito
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string UsuarioId { get; set; }

        [FirestoreProperty]
        public string CodigoPais { get; set; }

        [FirestoreProperty]
        public DateTime FechaAgregado { get; set; }
    }
}
