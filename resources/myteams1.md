This is a Microsoft teams-like communication tool written entirely in C, this is a CLI tool that's separated between a client and a server binary.

This tool supports individual users logging in and out, private messages between users, there is a saving system so that everything gets saved by itself when the server gets shut down and loaded back when it turns back on, and there is also a safety mechanism that prevents corrupted save files from being loaded.

## Usage

### Server
```bash
./myteams_server [port]
```

### Client
```bash
./myteams_cli [ip] [port]
```

## Demo