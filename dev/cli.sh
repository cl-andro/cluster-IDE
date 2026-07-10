export CARGO_NET_GIT_FETCH_WITH_CLI="true"
export VSCODE_CLI_APP_NAME="cluster"
export VSCODE_CLI_BINARY_NAME="cluster-server-insiders"
export VSCODE_CLI_DOWNLOAD_URL="https://github.com/ClusterFamily/cluster-insiders/releases"
export VSCODE_CLI_QUALITY="insider"
export VSCODE_CLI_UPDATE_URL="https://raw.githubusercontent.com/ClusterFamily/versions/refs/heads/master"

cargo build --release --target aarch64-apple-darwin --bin=code

cp target/aarch64-apple-darwin/release/code "../../VSCode-darwin-arm64/Cluster - Insiders.app/Contents/Resources/app/bin/cluster-tunnel-insiders"

"../../VSCode-darwin-arm64/Cluster - Insiders.app/Contents/Resources/app/bin/cluster-insiders" serve-web
