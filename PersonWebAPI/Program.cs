using System.Diagnostics;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using PersonWebAPI;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddSingleton<IMongoClient>(new MongoClient(connectionString));

builder.Services.AddCors();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors(corsPolicyBuilder => corsPolicyBuilder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.MapGet("/", async () =>
{
    var html = await File.ReadAllTextAsync("index.html");
    return Results.Content(html, "text/html");
});

app.MapGet("/api/persons", async (IMongoClient client) =>
{
    var db = client.GetDatabase("persons");
    var collection = db.GetCollection<Person>("persons");
    var persons =  await collection.Find("{}").ToListAsync();
    
    #if DEBUG
    Debug.WriteLine(string.Join(", ", persons));
    #endif
    
    return persons;
});

app.MapPost("/api/persons", async (IMongoClient client, Person person) =>
{
    var db = client.GetDatabase("persons");
    var collection = db.GetCollection<Person>("persons");
    await collection.InsertOneAsync(person);
});

app.MapDelete("/api/persons/{id}", async (IMongoClient client, string id) =>
{
    var db = client.GetDatabase("persons");
    var collection = db.GetCollection<Person>("persons");
    var result = await collection.DeleteOneAsync(x => x.Id == id);
    return Results.Ok(result);
});

app.MapPut("/api/persons/", async (IMongoClient client, Person person) =>
{
    if (string.IsNullOrEmpty(person.Id)) 
        return Results.NotFound();
    
    var db = client.GetDatabase("persons");
    var collection = db.GetCollection<Person>("persons");
    var result = await collection.ReplaceOneAsync(x => x.Id == person.Id, person);
    return Results.Ok(result);
});

await app.RunAsync();