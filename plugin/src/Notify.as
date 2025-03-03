void NotifyInfo(const string &in msg) {
    UI::ShowNotification(Meta::ExecutingPlugin().Name, msg);
    LogInfo("Notified: " + msg);
}

void NotifySuccess(const string &in msg) {
    UI::ShowNotification(Meta::ExecutingPlugin().Name, msg, vec4(.4, .7, .1, .3), 10000);
    LogInfo("Notified: " + msg);
}

void NotifyWarning(const string &in msg) {
    LogWarning(msg);
    UI::ShowNotification(Meta::ExecutingPlugin().Name + ": Warning", msg, vec4(.9, .6, .2, .3), 15000);
}

void NotifyError(const string &in msg) {
    LogError(msg);
    UI::ShowNotification(Meta::ExecutingPlugin().Name + ": Error", msg, vec4(.9, .3, .1, .3), 15000);
}
