class Apple {
    vec2 position;

    Apple() {
        this.Respawn();
    }

    void Respawn() {
        position = vec2(Math::Rand(0, (Draw::GetWidth() - 1) / g_gridSize), Math::Rand(0, (Draw::GetHeight() - 1)) / g_gridSize);
    }
}