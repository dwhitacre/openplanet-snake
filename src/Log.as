void LogTrace(const string &in msg) {
    if (S_Advanced_DevLog) {
        trace(msg);
    }
}

void LogInfo(const string &in msg) {
    trace(msg);
}

void LogWarning(const string &in msg) {
    warn(msg);
}

void LogError(const string &in msg) {
    error(msg);
}
