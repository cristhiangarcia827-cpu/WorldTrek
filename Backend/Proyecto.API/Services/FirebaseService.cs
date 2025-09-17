using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Proyecto.API.Models;

namespace Proyecto.API.Services
{
    public class FirebaseService
    {
        private readonly FirestoreDb _firestoreDb;
        private readonly FirebaseAuth _firebaseAuth;

        public FirebaseService()
        {
            try
            {
                string[] possiblePaths =
                {
                    Path.Combine(Directory.GetCurrentDirectory(), "config", "proyecto-clase-f6f5a-firebase-adminsdk-fbsvc-663a9ad560.json"),
                    Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "config", "proyecto-clase-f6f5a-firebase-adminsdk-fbsvc-663a9ad560.json"),
                    "Config/proyecto-clase-f6f5a-firebase-adminsdk-fbsvc-663a9ad560.json"
                };

                string credentialPath = "";
                foreach (string path in possiblePaths)
                {
                    if (File.Exists(path))
                    {
                        credentialPath = path;
                        Console.WriteLine($"Archivo encontrado en: {path}");
                        break;
                    }
                }

                if (string.IsNullOrEmpty(credentialPath))
                {
                    throw new FileNotFoundException("Archivo de credenciales no encontrado");
                }

                Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialPath);

                var credential = GoogleCredential.FromFile(credentialPath);

                // Firebase Admin SDK
                if (FirebaseApp.DefaultInstance == null)
                {
                    FirebaseApp.Create(new AppOptions()
                    {
                        Credential = credential,
                        ProjectId = "proyecto-clase-f6f5a"
                    });
                }

                // Firestore
                _firestoreDb = new FirestoreDbBuilder
                {
                    ProjectId = "proyecto-clase-f6f5a",
                    Credential = credential,
                }.Build();

                _firebaseAuth = FirebaseAuth.DefaultInstance;

                Console.WriteLine("Firebase inicializado correctamente.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inicializando Firebase: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
            }
        }

        // --------------------------
        // Métodos de Trips
        // --------------------------
        public async Task<string> AddTripAsync(Trip trip)
        {
            var docRef = _firestoreDb.Collection("trips").Document();
            trip.Id = docRef.Id;
            await docRef.SetAsync(trip);
            return trip.Id;
        }

        public async Task<List<Trip>> GetTripsAsync(string userId)
        {
            var snapshot = await _firestoreDb.Collection("trips")
                .WhereEqualTo("UserId", userId)
                .GetSnapshotAsync();

            return snapshot.Documents.Select(d => d.ConvertTo<Trip>()).ToList();
        }

        public async Task UpdateTripAsync(string tripId, Trip trip)
        {
            await _firestoreDb.Collection("trips").Document(tripId).SetAsync(trip, SetOptions.Overwrite);
        }

        public async Task DeleteTripAsync(string tripId)
        {
            await _firestoreDb.Collection("trips").Document(tripId).DeleteAsync();
        }

        // --------------------------
        // Métodos de Favorites
        // --------------------------
        public async Task<string> AddFavoriteAsync(FavoriteCountry fav)
        {
            var docRef = _firestoreDb.Collection("favorites").Document();
            fav.Id = docRef.Id;
            await docRef.SetAsync(fav);
            return fav.Id;
        }

        public async Task RemoveFavoriteAsync(string userId, string countryCode)
        {
            var snapshot = await _firestoreDb.Collection("favorites")
                .WhereEqualTo("UserId", userId)
                .WhereEqualTo("CountryCode", countryCode)
                .GetSnapshotAsync();

            foreach (var doc in snapshot.Documents)
            {
                await doc.Reference.DeleteAsync();
            }
        }

        public async Task<List<FavoriteCountry>> GetFavoritesAsync(string userId)
        {
            var snapshot = await _firestoreDb.Collection("favorites")
                .WhereEqualTo("UserId", userId)
                .GetSnapshotAsync();

            return snapshot.Documents.Select(d => d.ConvertTo<FavoriteCountry>()).ToList();
        }
    }
}
