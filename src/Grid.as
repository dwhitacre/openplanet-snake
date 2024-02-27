class Grid {
    Grid() {}

    string ToString() {
        return "Width: " + Text::Format("%d", GetWidth()) + ", " +
            "Height: " + Text::Format("%d", GetHeight()) + ", " +
            "CellWidth: " + Text::Format("%d", GetCellWidth()) + ", " +
            "CellHeight: " + Text::Format("%d", GetCellHeight());
    }

    vec2 GetCoords() {
        return vec2(S_Snake_GridOffsetLeft, S_Snake_GridOffsetTop);
    }

    int GetMaxWidth() {
        return Draw::GetWidth() - S_Snake_GridOffsetRight - GetCoords().x;
    }

    int GetMaxHeight() {
        return Draw::GetHeight() - S_Snake_GridOffsetBottom - GetCoords().y;
    }

    int GetWidth() {
        return GetNumCellsX() * GetCellWidth();
    }

    int GetHeight() {
        return GetNumCellsY() * GetCellHeight();
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

    int GetCellWidth() {
        return GetMaxWidth() / GetNumCellsX();
    }

    int GetCellHeight() {
        return GetMaxHeight() / GetNumCellsY();
    }

    void RenderRect(vec2 coords, int width, int height) {
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
        LogTrace("Grid: " + this.ToString());
        RenderBorder();
        RenderCells();
    }
}