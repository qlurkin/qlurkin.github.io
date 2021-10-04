#include "raylib.h"
#include <iostream>

int main(void)
{
    const int screenWidth = 800;
    const int screenHeight = 450;

    SetConfigFlags(FLAG_MSAA_4X_HINT);

    InitWindow(screenWidth, screenHeight, "SA4L - Shaders");

    Camera camera = { 0 };
    camera.position = (Vector3){ 4.0f, 4.0f, 4.0f };
    camera.target = (Vector3){ 0.0f, 0.0f, 0.0f };
    camera.up = (Vector3){ 0.0f, 1.0f, 0.0f };
    camera.fovy = 45.0f;
    camera.projection = CAMERA_PERSPECTIVE;

    Model model = LoadModelFromMesh(GenMeshCube(1.0, 1.0, 1.0));
    Shader shader = LoadShader("base.vs", "base.fs");

    model.materials[0].shader = shader;

    SetCameraMode(camera, CAMERA_FREE); 

    SetTargetFPS(60);
    
    while (!WindowShouldClose())
    {
        UpdateCamera(&camera);
        
        BeginDrawing();

            ClearBackground(RAYWHITE);

            BeginMode3D(camera);

                DrawModel(model, {0.0f, 0.0f, 0.0f}, 1.0f, WHITE);

                DrawGrid(10, 1.0f);

            EndMode3D();

            DrawFPS(10, 10);

        EndDrawing();
    }

    
    UnloadModel(model);

    CloseWindow();

    return 0;
}