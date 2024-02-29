class SnakeSegment {
    vec2 position;
    SnakeSegment(vec2 pos) {
        position = pos;
    }
}

class Snake {
    array<SnakeSegment@> segments;
    vec2 direction;
    vec2 lastMoveDirection;
    bool alive;

    Snake() {}

    void Respawn(Grid@ grid) {
        segments = {};
        direction = vec2(1, 0);
        lastMoveDirection = direction;
        alive = true;
        S_Snake_LastScore = 0;
        
        for (uint i = 0; i < 4; i++) {
            segments.InsertLast(SnakeSegment(grid.GetStartCell() - vec2(i, 0)));
        }
    }

    void Move(Grid@ grid) {
        if (!alive) return;

        vec2 nextPos = segments[0].position + direction;
        lastMoveDirection = direction;

        // check for collision
        if (nextPos.x < 0 || nextPos.x >= grid.GetNumCellsX() || nextPos.y < 0 || nextPos.y >= grid.GetNumCellsY() || CheckSelfCollision(nextPos)) {
            alive = false;
            return;
        }

        // move the snake by adding a new segment at the front and removing the last segment
        segments.InsertAt(0, SnakeSegment(nextPos));
        segments.RemoveLast();
    }

    bool CheckSelfCollision(vec2 pos) {
        for (uint i = 1; i < segments.Length; i++) {
            if (segments[i].position == pos) {
                return true;
            }
        }
        return false;
    }

    void ChangeDirection(vec2 newDir) {
        LogTrace("Change Direction: " + Text::Format("%f", newDir.x) + "," + Text::Format("%f", newDir.y));
        if (newDir * -1 != lastMoveDirection && newDir * -1 != direction) { // Prevent the snake from reversing
            direction = newDir;
        }
    }

    void Grow() {
        segments.InsertLast(SnakeSegment(segments[segments.Length - 1].position));
        S_Snake_LastScore += S_Snake_ScorePerApple;
    }

    void Render(Grid@ grid) {
        if (S_Snake_SnakeColorRainbow) S_Snake_SnakeColor = Rainbow(S_Snake_SnakeColor);
        nvg::FillColor(S_Snake_SnakeColor);

        for (uint i = 0; i < segments.Length; i++) {
            auto segment = segments[i];

            vec2 coords = grid.GetCellCoords(segment.position);

            nvg::BeginPath();
            nvg::Rect(coords.x, coords.y, grid.GetCellWidth(), grid.GetCellHeight());
            nvg::Fill();
        }
    }
}
