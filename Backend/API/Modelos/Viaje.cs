using Google.Cloud.Firestore;

namespace API.Modelos
{
    [FirestoreData]
    public class Viaje
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string UsuarioId { get; set; }

        [FirestoreProperty]
        public string Titulo { get; set; }

        [FirestoreProperty]
        public string PaisDestino { get; set; }

        [FirestoreProperty]
        public DateTime FechaInicio { get; set; }

        [FirestoreProperty]
        public DateTime FechaFin { get; set; }

        [FirestoreProperty]
        public string Estado { get; set; }

        [FirestoreProperty]
        public string Descripcion { get; set; }
    }
}
