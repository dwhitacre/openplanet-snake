class Apple {
    vec2 position;

    Apple() {
        this.Respawn();
    }

    void Respawn() {
        position = vec2(Math::Rand(0, (Draw::GetWidth() - 1) / S_Snake_GridSize), Math::Rand(0, (Draw::GetHeight() - 1)) / S_Snake_GridSize);
    }
}