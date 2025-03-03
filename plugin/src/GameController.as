class GameController {
    bool running;
    Snake@ snake;
    Apple@ apple;
    Grid@ grid;

    GameController() {
        running = false;
        @apple = @Apple();
        @snake = @Snake();
        @grid = @Grid();
    }

    void StartGame() {
        if (running) return;
        LogTrace("Game started");
        running = true;
        apple.Respawn(grid);
        snake.Respawn(grid);
    }

    void StopGame() {
        if (!running) return;
        LogTrace("Game stopped");
        running = false;
        if (S_Snake_LastScore > S_Snake_HighScore) {
            S_Snake_HighScore = S_Snake_LastScore;
            NotifySuccess("New high score! " + Text::Format("%d", S_Snake_HighScore));
        } else {
            NotifyInfo("You died! Score: " + Text::Format("%d", S_Snake_LastScore));
        }
    }

    void Update() {
        if (!running) return;

        LogTrace("Snake position: " + Text::Format("%f", snake.segments[0].position.x) + "," + Text::Format("%f", snake.segments[0].position.y));
        LogTrace("Apple position: " + Text::Format("%f", apple.position.x) + "," + Text::Format("%f", apple.position.y));
        
        snake.Move(grid);

        if (snake.segments[0].position == apple.position) {
            snake.Grow();
            apple.Respawn(grid);
            LogTrace("Got apple! Score: " + Text::Format("%d", S_Snake_LastScore));
        }

        if (!snake.alive) {
            StopGame();
        }
    }

    void Draw() {
        if (S_Display_HideWithIFace && !UI::IsGameUIVisible()) return;
        if (S_Display_HideWithOverlay && !UI::IsOverlayShown()) return;
        if (!S_Display_Visible) return;

        if (!running) return;

        apple.Render(grid);
        snake.Render(grid);
        grid.Render();
    }

    void HandleInput(VirtualKey key) {
        if (!running) {
            if (key == S_Snake_StartGameKey) StartGame();
            return;
        }

        if (key == S_Snake_LeftKey) snake.ChangeDirection(vec2(-1, 0));
        else if (key == S_Snake_RightKey) snake.ChangeDirection(vec2(1, 0));
        else if (key == S_Snake_UpKey) snake.ChangeDirection(vec2(0, -1));
        else if (key == S_Snake_DownKey) snake.ChangeDirection(vec2(0, 1));
    }
}