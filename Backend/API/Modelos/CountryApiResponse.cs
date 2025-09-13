using System.Text.Json.Serialization;

namespace API.Modelos
{
    public class CountryApiResponse
    {
        [JsonPropertyName("name")]
        public Name Name { get; set; }

        [JsonPropertyName("tld")]
        public string[] Tld { get; set; }

        [JsonPropertyName("cca2")]
        public string Cca2 { get; set; }

        [JsonPropertyName("cioc")]
        public string Cioc { get; set; }

        [JsonPropertyName("independent")]
        public bool Independent { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("unMember")]
        public bool UnMember { get; set; }

        [JsonPropertyName("capital")]
        public string[] Capital { get; set; }

        [JsonPropertyName("altSpellings")]
        public string[] AltSpellings { get; set; }

        [JsonPropertyName("region")]
        public string Region { get; set; }

        [JsonPropertyName("subregion")]
        public string Subregion { get; set; }

        [JsonPropertyName("latlng")]
        public double[] Latlng { get; set; }

        [JsonPropertyName("landlocked")]
        public bool Landlocked { get; set; }

        [JsonPropertyName("borders")]
        public string[] Borders { get; set; }

        [JsonPropertyName("cca3")]
        public string Cca3 { get; set; }

        [JsonPropertyName("flag")]
        public string Flag { get; set; }


        [JsonPropertyName("population")]
        public long Population { get; set; }


        [JsonPropertyName("fifa")]
        public string Fifa { get; set; }

        [JsonPropertyName("car")]
        public Car Car { get; set; }

        [JsonPropertyName("timezones")]
        public string[] Timezones { get; set; }

        [JsonPropertyName("continents")]
        public string[] Continents { get; set; }

        [JsonPropertyName("flags")]
        public Flags Flags { get; set; }

        [JsonPropertyName("coatOfArms")]
        public CoatOfArms CoatOfArms { get; set; }

        [JsonPropertyName("startOfWeek")]
        public string StartOfWeek { get; set; }

        [JsonPropertyName("capitalInfo")]
        public CapitalInfo CapitalInfo { get; set; }

        [JsonPropertyName("postalCode")]
        public PostalCode PostalCode { get; set; }
    }

    public class CapitalInfo
    {
        [JsonPropertyName("latlng")]
        public double[] Latlng { get; set; }
    }

    public class Car
    {
        [JsonPropertyName("signs")]
        public string[] Signs { get; set; }

        [JsonPropertyName("side")]
        public string Side { get; set; }
    }

    public class CoatOfArms
    {
        [JsonPropertyName("png")]
        public Uri Png { get; set; }

        [JsonPropertyName("svg")]
        public Uri Svg { get; set; }
    }


    public class Flags
    {
        [JsonPropertyName("png")]
        public Uri Png { get; set; }

        [JsonPropertyName("svg")]
        public Uri Svg { get; set; }

        [JsonPropertyName("alt")]
        public string Alt { get; set; }
    }


    public class Name
    {
        [JsonPropertyName("common")]
        public string Common { get; set; }

        [JsonPropertyName("official")]
        public string Official { get; set; }

    }


    public class PostalCode
    {
        [JsonPropertyName("format")]
        public string Format { get; set; }

        [JsonPropertyName("regex")]
        public string Regex { get; set; }
    }

}
#pragma warning restore CS8618
#pragma warning restore CS8601
#pragma warning restore CS8603
