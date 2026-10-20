$csharpCode = @"
using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;

public class MecanIQServer {
    private static TcpListener listener;
    private static string rootDirectory;
    private static readonly Dictionary<string, string> mimeTypes = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
        { ".html", "text/html; charset=utf-8" },
        { ".js", "application/javascript; charset=utf-8" },
        { ".mjs", "application/javascript; charset=utf-8" },
        { ".css", "text/css; charset=utf-8" },
        { ".json", "application/json; charset=utf-8" },
        { ".webmanifest", "application/manifest+json; charset=utf-8" },
        { ".svg", "image/svg+xml" },
        { ".png", "image/png" },
        { ".jpg", "image/jpeg" },
        { ".jpeg", "image/jpeg" },
        { ".ico", "image/x-icon" }
    };

    public static void Start(int port, string root) {
        rootDirectory = Path.GetFullPath(root);
        listener = new TcpListener(IPAddress.Any, port);
        listener.Start();
        Console.WriteLine("Serveur MecanIQ C# actif sur http://localhost:" + port + "/ et http://127.0.0.1:" + port + "/");

        Task.Run(async () => {
            while (true) {
                try {
                    TcpClient client = await listener.AcceptTcpClientAsync();
                    Task t = ProcessClientAsync(client);
                } catch {
                    break;
                }
            }
        });
    }

    private static async Task ProcessClientAsync(TcpClient client) {
        using (client) {
            try {
                using (NetworkStream stream = client.GetStream()) {
                    byte[] buffer = new byte[4096];
                    int bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);
                    if (bytesRead == 0) return;

                    string requestText = Encoding.ASCII.GetString(buffer, 0, bytesRead);
                    string[] lines = requestText.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None);
                    if (lines.Length == 0) return;

                    string[] requestParts = lines[0].Split(' ');
                    if (requestParts.Length < 2) return;

                    string urlPath = requestParts[1].Split('?')[0];
                    if (urlPath == "/" || string.IsNullOrEmpty(urlPath)) {
                        urlPath = "/index.html";
                    }

                    string relPath = urlPath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
                    string filePath = Path.Combine(rootDirectory, relPath);

                    if (File.Exists(filePath)) {
                        string ext = Path.GetExtension(filePath);
                        string mime = mimeTypes.ContainsKey(ext) ? mimeTypes[ext] : "application/octet-stream";
                        byte[] fileBytes = File.ReadAllBytes(filePath);

                        string headers = "HTTP/1.1 200 OK\r\n" +
                                         "Content-Type: " + mime + "\r\n" +
                                         "Content-Length: " + fileBytes.Length + "\r\n" +
                                         "Connection: close\r\n" +
                                         "Access-Control-Allow-Origin: *\r\n" +
                                         "Service-Worker-Allowed: /\r\n\r\n";

                        byte[] headerBytes = Encoding.ASCII.GetBytes(headers);
                        await stream.WriteAsync(headerBytes, 0, headerBytes.Length);
                        await stream.WriteAsync(fileBytes, 0, fileBytes.Length);
                        await stream.FlushAsync();
                    } else {
                        byte[] notFound = Encoding.UTF8.GetBytes("404 Not Found");
                        string headers = "HTTP/1.1 404 Not Found\r\n" +
                                         "Content-Type: text/plain; charset=utf-8\r\n" +
                                         "Content-Length: " + notFound.Length + "\r\n" +
                                         "Connection: close\r\n\r\n";
                        byte[] headerBytes = Encoding.ASCII.GetBytes(headers);
                        await stream.WriteAsync(headerBytes, 0, headerBytes.Length);
                        await stream.WriteAsync(notFound, 0, notFound.Length);
                        await stream.FlushAsync();
                    }
                }
            } catch {
                // Ignore transient network aborts
            }
        }
    }
}
"@

Add-Type -TypeDefinition $csharpCode -Language CSharp
[MecanIQServer]::Start(8080, $PSScriptRoot)

# Keep the main process alive
while ($true) {
    Start-Sleep -Seconds 3600
}
