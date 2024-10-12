# Life Calendar server side

## How to run

run (dev)
```bash
sqlx migrate run
cargo r
```

run (prod)
```bash
sqlx migrate run
cargo b --release
./target/release/server
```