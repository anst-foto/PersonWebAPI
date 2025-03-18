using System;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PersonWebAPI;

public record Person
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonPropertyName("id")]
    public string Id { get; init; }
    
    [BsonElement("last_name")]
    [JsonPropertyName("last_name")]
    public string LastName { get; init; }
    [BsonElement("first_name")]
    [JsonPropertyName("first_name")]
    public string FirstName { get; init; }
    [BsonIgnore]
    [JsonIgnore]
    public string FullName => $"{LastName} {FirstName}";
    
    [BsonElement("date_of_birth")]
    [BsonRepresentation(BsonType.DateTime)]
    [JsonPropertyName("date_of_birth")]
    public DateTime BirthDate { get; init; }
    [BsonIgnore]
    [JsonIgnore]
    public int Age
    {
        get
        {
            var today = DateTime.Today;
            var age = today.Year - BirthDate.Year;
            if (BirthDate.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}