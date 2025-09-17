using Google.Cloud.Firestore;

namespace Proyecto.API.Models
{
    [FirestoreData]
    public class FavoriteCountry
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string UserId { get; set; } = string.Empty;

        [FirestoreProperty]
        public string CountryCode { get; set; } = string.Empty;

        [FirestoreProperty]
        public DateTime FechaAgregado { get; set; } = DateTime.UtcNow;
    }
}
