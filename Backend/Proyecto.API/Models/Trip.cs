using Google.Cloud.Firestore;

namespace Proyecto.API.Models
{
    [FirestoreData]
    public class Trip
    {
        [FirestoreDocumentId] // Firestore asigna ID
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string UserId { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Titulo { get; set; } = string.Empty;

        [FirestoreProperty]
        public string PaisDestino { get; set; } = string.Empty;

        [FirestoreProperty]
        public DateTime FechaInicio { get; set; }

        [FirestoreProperty]
        public DateTime FechaFin { get; set; }

        [FirestoreProperty]
        public string Estado { get; set; } = "Planificado"; // "Planificado" o "Completado"

        [FirestoreProperty]
        public string Descripcion { get; set; } = string.Empty;
    }
}

