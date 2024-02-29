class Apple {
    vec2 position;

    Apple() {}

    void Respawn(Grid@ grid) {
        position = grid.GetRandomCell();
    }

    void Render(Grid@ grid) {
        if (S_Snake_AppleColorRainbow) S_Snake_AppleColor = Rainbow(S_Snake_AppleColor);
        nvg::FillColor(S_Snake_AppleColor);

        vec2 coords = grid.GetCellCoords(position);

        nvg::BeginPath();
        nvg::Rect(coords.x, coords.y, grid.GetCellWidth(), grid.GetCellHeight());
        nvg::Fill();
    }
}