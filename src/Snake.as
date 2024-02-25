class SnakeSegment {
    vec2 position;
    SnakeSegment(vec2 pos) {
        position = pos;
    }
}

class Snake {
    array<SnakeSegment@> segments = {};
    vec2 direction;
    vec2 lastMoveDirection;
    bool nextDirectionSet;
    bool alive;

    Snake() {
        direction = vec2(1, 0);
        nextDirectionSet = false;
        alive = true;
        S_Snake_LastScore = 0;
        
        for (uint i = 0; i < 4; i++) {
            segments.InsertLast(SnakeSegment(vec2(10 - i, 5)));
        }
    }

    void Move() {
        if (!alive) return;

        vec2 nextPos = segments[0].position + direction;
        nextDirectionSet = false;

        // check for collision
        if (nextPos.x < 0 || nextPos.x * S_Snake_GridSize >= Draw::GetWidth() || nextPos.y < 0 || nextPos.y * S_Snake_GridSize >= Draw::GetHeight() || CheckSelfCollision(nextPos)) {
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
        if (!nextDirectionSet && newDir * -1 != direction) { // Prevent the snake from reversing
            direction = newDir;
            nextDirectionSet = true;
        }
    }

    void Grow() {
        segments.InsertLast(SnakeSegment(segments[segments.Length - 1].position));
        S_Snake_LastScore += S_Snake_ScorePerApple;
    }
}
