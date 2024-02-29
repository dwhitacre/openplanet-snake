class Grid {
    Grid() {}

    vec2 GetCoords() {
        return vec2(S_Snake_GridOffsetLeft, S_Snake_GridOffsetTop);
    }

    float GetWidth() {
        return Draw::GetWidth() - S_Snake_GridOffsetRight - GetCoords().x;
    }

    float GetHeight() {
        return Draw::GetHeight() - S_Snake_GridOffsetBottom - GetCoords().y;
    }

    int GetStrokeWidth() {
        return S_Snake_GridStrokeWidth; 
    }

    int GetNumCellsX() {
        return S_Snake_GridSizeX;
    }

    int GetNumCellsY() {
        return S_Snake_GridSizeY;
    }

    vec2 GetStartCell() {
        return vec2(10, 5); // min grid size is 16, 9
    }

    vec2 GetRandomCell() {
        return vec2(Math::Rand(0, GetNumCellsX()), Math::Rand(0, GetNumCellsY()));
    }

    vec2 GetCellCoords(vec2 position) {
        return GetCoords() + vec2(
            GetCellWidth() * position.x,
            GetCellHeight() * position.y
        );
    }

    float GetCellWidth() {
        return GetWidth() / GetNumCellsX();
    }

    float GetCellHeight() {
        return GetHeight() / GetNumCellsY();
    }

    void RenderRect(vec2 coords, float width, float height) {
        nvg::StrokeColor(S_Snake_GridColor);
        nvg::StrokeWidth(GetStrokeWidth());
        nvg::BeginPath();

        nvg::Rect(coords.x, coords.y, width, height);
        nvg::Rect(
            coords.x + GetStrokeWidth(),
            coords.y + GetStrokeWidth(),
            width - GetStrokeWidth(),
            height - GetStrokeWidth()
        );
        nvg::Stroke();
    }

    void RenderBorder() {
        if (!S_Snake_ShowGridBorder) return;
        RenderRect(GetCoords(), GetWidth(), GetHeight());
    }

    void RenderCell(vec2 position) {
        RenderRect(GetCellCoords(position), GetCellWidth(), GetCellHeight());
    }

    void RenderCells() {
        if (!S_Snake_ShowGridCells) return;
        for (int x = 0; x < GetNumCellsX(); x++) {
            for (int y = 0; y < GetNumCellsY(); y++) {
                RenderCell(vec2(x, y));
            }
        }
    }

    void Render() {
        RenderBorder();
        RenderCells();
    }
}