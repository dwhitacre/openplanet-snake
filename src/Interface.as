void DrawSnake(Snake@ snake) {
    nvg::FillColor(S_Snake_SnakeColor);

    for (uint i = 0; i < snake.segments.Length; i++) {
        auto segment = snake.segments[i];
        nvg::BeginPath();
        nvg::Rect(segment.position.x * g_gridSize, segment.position.y * g_gridSize, g_gridSize, g_gridSize);
        nvg::Fill();
    }
}

void DrawApple(Apple@ apple) {
    nvg::FillColor(S_Snake_AppleColor);

    nvg::BeginPath();
    nvg::Rect(apple.position.x * g_gridSize, apple.position.y * g_gridSize, g_gridSize, g_gridSize);
    nvg::Fill();
}