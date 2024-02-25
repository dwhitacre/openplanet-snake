GameController gc;
float g_delta_current = 0.f;

void Main() {
    while (true) {
        try {
            if (gc is null) {
                gc = GameController();
            }
        } catch {
            LogError(getExceptionInfo());
        }
        sleep(60000);
    }
}

void OnKeyPress(bool down, VirtualKey key) {
    if (down && gc !is null) gc.HandleInput(key);
    if (down && key == S_Display_VisibleKey) S_Display_Visible = !S_Display_Visible;
}

void RenderMenu() {
    if (UI::BeginMenu(PluginDisplayName)) {
        if (UI::MenuItem("Play Game") && gc !is null) gc.StartGame();
        if (UI::MenuItem("Stop Game") && gc !is null) gc.StopGame();
        UI::MenuItem("High Score: " + Text::Format("%d", S_Snake_HighScore));
        UI::MenuItem("Last Score: " + Text::Format("%d", S_Snake_LastScore));
        if (UI::MenuItem("Toggle Display", "", S_Display_Visible)) S_Display_Visible = !S_Display_Visible;

        UI::EndMenu();
    }
}

void Render() {
    if (gc is null) return;
    gc.Draw();
}

void Update(float dt) {
    if (gc is null) return;
    g_delta_current += dt;
    // LogTrace("DT: " + Text::Format("%f", dt) + " Cur: " + Text::Format("%f", g_delta_current));
    if (g_delta_current >= S_Snake_GameTickRate) {
        gc.Update();
        g_delta_current = 0.f;
    }
}
