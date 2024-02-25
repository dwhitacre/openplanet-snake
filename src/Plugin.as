string PluginDisplayIcon = "\\$0f0" + Icons::Apple + "\\$z";
string PluginDisplayName = PluginDisplayIcon + " " + Meta::ExecutingPlugin().Name;
string PluginDisplayVersion = "\\$0f0 v" + Meta::ExecutingPlugin().Version + "\\$z";
string PluginDisplayNameAndVersion = PluginDisplayName + " " + PluginDisplayVersion;
