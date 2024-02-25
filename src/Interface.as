void DrawSnake(Snake@ snake) {
    nvg::FillColor(vec4(0, 255, 0, 255));

    for (uint i = 0; i < snake.segments.Length; i++) {
        auto segment = snake.segments[i];
        nvg::BeginPath();
        nvg::Rect(segment.position.x * g_gridSize, segment.position.y * g_gridSize, g_gridSize, g_gridSize);
        nvg::Fill();
    }
}

void DrawApple(Apple@ apple) {
    nvg::FillColor(vec4(255, 0, 0, 255));

    nvg::BeginPath();
    nvg::Rect(apple.position.x * g_gridSize, apple.position.y * g_gridSize, g_gridSize, g_gridSize);
    nvg::Fill();
}