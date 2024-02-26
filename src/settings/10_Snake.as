[Setting category="Snake" hidden]
int S_Snake_HighScore = 0;

[Setting category="Snake" hidden]
int S_Snake_LastScore = 0;

[Setting category="Snake" hidden]
int S_Snake_ScorePerApple = 10;

[Setting category="Snake" name="Start Game"]
VirtualKey S_Snake_StartGameKey = VirtualKey::F7;

[Setting category="Snake" name="Left Key"]
VirtualKey S_Snake_LeftKey = VirtualKey::Left;

[Setting category="Snake" name="Right Key"]
VirtualKey S_Snake_RightKey = VirtualKey::Right;

[Setting category="Snake" name="Up Key"]
VirtualKey S_Snake_UpKey = VirtualKey::Up;

[Setting category="Snake" name="Down Key"]
VirtualKey S_Snake_DownKey = VirtualKey::Down;

[Setting category="Snake" color name="Snake Color"]
vec4 S_Snake_SnakeColor = vec4(0, 1, 0, 1);

[Setting category="Snake" color name="Apple Color"]
vec4 S_Snake_AppleColor = vec4(1, 0, 0, 1);

[Setting category="Snake" min=1.f max=100.f name="Game Tick Rate (ms)" description="Lower numbers means faster snake"]
float S_Snake_GameTickRate = 50.f;

[Setting category="Snake" min=10 max=50 name="Grid Size" description="Lower numbers means smaller snake"]
int S_Snake_GridSize = 20;

[Setting category="Snake" color name="Border Color"]
vec4 S_Snake_BorderColor = vec4(.9f, .5f, 0, .75f);