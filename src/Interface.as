void DrawSnake(Snake@ snake) {
    nvg::FillColor(S_Snake_SnakeColor);

    for (uint i = 0; i < snake.segments.Length; i++) {
        auto segment = snake.segments[i];
        nvg::BeginPath();
        nvg::Rect(segment.position.x * S_Snake_GridSize, segment.position.y * S_Snake_GridSize, S_Snake_GridSize, S_Snake_GridSize);
        nvg::Fill();
    }
}

void DrawApple(Apple@ apple) {
    nvg::FillColor(S_Snake_AppleColor);

    nvg::BeginPath();
    nvg::Rect(apple.position.x * S_Snake_GridSize, apple.position.y * S_Snake_GridSize, S_Snake_GridSize, S_Snake_GridSize);
    nvg::Fill();
}