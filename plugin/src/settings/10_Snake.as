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

[Setting category="Snake" name="Snake Color Rainbow"]
bool S_Snake_SnakeColorRainbow = false;

[Setting category="Snake" color name="Apple Color"]
vec4 S_Snake_AppleColor = vec4(1, 0, 0, 1);

[Setting category="Snake" name="Apple Color Rainbow"]
bool S_Snake_AppleColorRainbow = false;

[Setting category="Snake" min=1.f max=100.f name="Game Tick Rate (ms)" description="Lower numbers means faster snake"]
float S_Snake_GameTickRate = 50.f;

[Setting category="Snake" min=10 max=50 name="Grid Size" description="Lower numbers means smaller snake" hidden]
int S_Snake_GridSize = 20;

[Setting category="Snake" name="Show Grid Border"]
bool S_Snake_ShowGridBorder = true;

[Setting category="Snake" name="Show Grid Cells" description="Laggy. Only enable when adjusting the grid settings."]
bool S_Snake_ShowGridCells = false;

[Setting category="Snake" color name="Grid Color"]
vec4 S_Snake_GridColor = vec4(0, 0, 0, .5f);

[Setting category="Snake" min=16 max=320 name="Grid Width"]
int S_Snake_GridSizeX = 16 * 6;

[Setting category="Snake" min=9 max=180 name="Grid Height"]
int S_Snake_GridSizeY = 9 * 6;

[Setting category="Snake" min=0 name="Grid Offset Left"]
int S_Snake_GridOffsetLeft = 0;

[Setting category="Snake" min=1 name="Grid Offset Right"]
int S_Snake_GridOffsetRight = 1;

[Setting category="Snake" min=0 name="Grid Offset Top"]
int S_Snake_GridOffsetTop = 0;

[Setting category="Snake" min=1 name="Grid Offset Bottom"]
int S_Snake_GridOffsetBottom = 1;

[Setting category="Snake" min=1 name="Grid Stroke Width"]
int S_Snake_GridStrokeWidth = 2;